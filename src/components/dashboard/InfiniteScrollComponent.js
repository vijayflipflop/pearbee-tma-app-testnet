// INFINITE SCROLL IN REACT
import { useState, useEffect } from "react";

const InfiniteScrollComponent = () => {
  const BASE_URL = "https://jsonplaceholder.typicode.com/posts";
  const RESULTS_PER_Page = 10;

  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(0);
  const [page, setPage] = useState(1);

  const fetchTotalPosts = async () => {
    try {
      const response = await fetch(`${BASE_URL}`);
      const data = await response.json();
      setTotalPosts(data.length);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}?_page=${page}&_limit=${RESULTS_PER_Page}`
      );
      const data = await response.json();
      setVisible((prev) => prev + data.length);
      setPosts((prev) => [...prev, ...data]);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnScroll = () => {
    if (
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    fetchTotalPosts();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [page]);

  useEffect(() => {
    visible < totalPosts && totalPosts > 0
      ? window.addEventListener("scroll", handleOnScroll)
      : window.removeEventListener("scroll", handleOnScroll);
    return () => {
      window.removeEventListener("scroll", handleOnScroll);
    };
  }, [visible]);

  return (
    <div className="container">
      <h1>Fetching Data in React</h1>
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <h2>{post.id}</h2>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}

      {totalPosts > 0 ? (
        visible < totalPosts ? (
          <div>Loading more data...</div>
        ) : (
          <div>
            <div>Sorry, that's all folks! No more to load.</div>
            <button
              onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }}
            >
              Scroll to Top
            </button>
          </div>
        )
      ) : null}
    </div>
  );
};

export default InfiniteScrollComponent;

// https://medium.com/@itsanuragjoshi/pagination-vs-infinite-scroll-vs-load-more-data-loading-ux-patterns-in-react-cccd261d3984