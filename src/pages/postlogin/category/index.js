import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import Services from "core/service/services";
import { CATEGORYBYID, CATEGORY_QUESTION } from "core/service/api.url.service";
// import { Loading } from "components/common/loading";
// import MainCategoryDetail from "components/category";
import Breadcrumb from "components/common/breadcrumb";
// import { utils } from "core/helper";
// import CategoryQuestionList from "components/category/CatgoryQuestionList";
import { services } from "core/service";
import QuestionCard from "components/common/question-card";
import { Loading } from "components/common/loading";
import { utils } from "core/helper";
import { Col } from "react-bootstrap";

const Category = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [visible, setVisible] = useState(0);
  const [page, setPage] = useState(null);
  const [error, setError] = useState(null);

  const categoryBasedQuestions = async () => {
    try {
      const resp = await services.get(`${CATEGORYBYID}${id}`);
      if (resp?.status) {
        setCategory(resp.result);
      }
    } catch (error) {
      throw error.message;
    }
  };

  const [isComponentMounted, setComponentMounted] = useState(false);
  useEffect(() => {
    const handleChange = async () => {
      setPage(1);
      await categoryBasedQuestions();
    };
    if (isComponentMounted) {
      handleChange();
    }
  }, [isComponentMounted]);

  const getTotalCatgoryQuestions = async () => {
    try {
      const questionResp = await services.get(`${CATEGORY_QUESTION}${id}`);
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
    console.log("fetchQuestions-page::", page);
    try {
      const questionResp = await services.get(
        `${CATEGORY_QUESTION}${id}&page=${page}`
      );
      const { status: questionStatus, result: questionResult } =
        questionResp || {};
      if (questionStatus) {
        setVisible((prev) => prev + questionResult.length);
        setPosts((prev) => {
          console.log("prev::",prev);
          return [...prev, ...questionResult];
        });
        setError(null);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnScroll = () => {
    // console.log("window.scrollY::", window.scrollY);
    // console.log("window.innerHeight::", window.innerHeight);
    // console.log(
    //   "document.documentElement.scrollHeight::",
    //   document.documentElement.scrollHeight
    // );
    if (
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 1);
    }
  };

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
      handleChange();
    }
  }, [isComponentMounted]);

  useEffect(() => {
    setComponentMounted(true);
  }, []);

  useEffect(() => {
    if(page){
      console.log("page::", page);
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
  }, [visible, totalPosts]);

  return (
    <div className="page_container">
      {!isLoading && <Breadcrumb category={category} />}
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
            console.log('length ::', posts.length);
            return (
              <Col xs={12} key={ind}>
                <QuestionCard cardFor={"catgory"} questionDetails={ele} />
              </Col>
            );
          })}
        {totalPosts > 0 && visible < totalPosts && (
          <div className={"loading_wrapper"}>
            <Loading animation="border" variant={"dark"} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
