import { useState, useEffect } from "react";
import Services from "core/service/services";
import { CATEGORY_QUESTION, CATEGORYBYID } from "core/service/api.url.service";
import { Col } from "react-bootstrap";
import QuestionCard from "components/common/question-card";
import { Loading } from "components/common/loading";
import { utils } from "core/helper";

const CategoryQuestionList = (props) => {
  const { category_id } = props;
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(0);
  const [page, setPage] = useState(null);

  const getTotalCatgoryQuestions = async () => {
    try {
      const questionResp = await Services.get(
        `${CATEGORY_QUESTION}${category_id}`
      );
      const { status: questionStatus, result: questionResult } =
        questionResp || {};
      if (questionStatus) {
        const totalPages = questionResult[0] ? questionResult[0].full_count : 0;
        setTotalPosts(totalPages);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchQuestions = async (page) => {
    try {
      const questionResp = await Services.get(
        `${CATEGORY_QUESTION}${category_id}&page=${page}`
      );
      const { status: questionStatus, result: questionResult } =
        questionResp || {};
      if (questionStatus) {
        setVisible((prev) => prev + questionResult.length);
        setPosts((prev) => [...prev, ...questionResult]);
        setError(null);
      }
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

  const [isComponentMounted, setComponentMounted] = useState(false);
  useEffect(() => {
    const handleChange = async () => {
      utils.mixPannelEvent(
        "categoryPage",
        "CATEGORY_PAGE_VIEWED",
        "categoryPage"
      );
      await getTotalCatgoryQuestions();
    };
    if (isComponentMounted) {
      setPage(1);
      handleChange();
    }
  }, [isComponentMounted]);

  useEffect(() => {
    setComponentMounted(true);
  }, []);

  useEffect(() => {
    if(page){
      fetchQuestions(page);
    }
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
      {error && <div>{error}</div>}
      {isLoading && (
        <div className={"loading_wrapper"}>
          <Loading animation="border" variant={"light"} />
        </div>
      )}
      {!isLoading && posts.length === 0 && (
        <div className="pearbee_empty_date_wrap">
          <h5>No Questions Found</h5>
        </div>
      )}
      {!isLoading &&
        posts?.length > 0 &&
        posts.map((ele, ind) => {
          return (
            <Col xs={12} key={ind}>
              <QuestionCard cardFor={"home"} questionDetails={ele} />
            </Col>
          );
        })}
      {totalPosts > 0 && visible < totalPosts && (
        <div className={"loading_wrapper"}>
          <Loading animation="border" variant={"dark"} />
        </div>
      )}
    </div>
  );
};

export default CategoryQuestionList;
