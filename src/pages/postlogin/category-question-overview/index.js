import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  CATEGORYBYID,
  CATEGORY_QUESTION_BY_ID,
} from "core/service/api.url.service";
import { Loading } from "components/common/loading";
import Breadcrumb from "components/common/breadcrumb";
import CategoryQuestionOverviewDetails from "components/category-question-overview";
import { services } from "core/service";
import { utils } from "core/helper";

const CategoryQuestionOverview = () => {
  const { id, questionId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [questionDetails, setQuestionDetails] = useState([]);

  const categoryQuestionDetails = async () => {
    setIsLoading(true);
    try {
      const category = await services.get(`${CATEGORYBYID}${id}`);
      if (category?.status) {
        setCategory(category.result);
        const questions = await services.get(
          `${CATEGORY_QUESTION_BY_ID}${questionId}`
        );
        if (questions?.status) {
          setQuestionDetails(questions?.result?.[0]);
          setIsLoading(false);
        }
      }
    } catch (error) {
      setIsLoading(false);
      throw error.message;
    }
  };

  const [isComponentMounted, setComponentMounted] = useState(false);
  useEffect(() => {
    const handleChange = async () => {
      utils.mixPannelEvent(
        "question_page",
        "QUESTION_PAGE_VIEWED",
        "question_page"
      );
      await categoryQuestionDetails();
    };
    if (isComponentMounted) {
      handleChange();
    }
  }, [isComponentMounted]);

  useEffect(() => {
    setComponentMounted(true);
  }, []);

  return (
    <div className="page_container">
      {isLoading && <Loading isWrap={true} />}
      {!isLoading && (
        <Breadcrumb
          category={category}
          questionName={questionDetails?.question}
          // questionId={questionDetails?.id}
        />
      )}
      {!isLoading && (
        <CategoryQuestionOverviewDetails questionDetails={questionDetails} />
      )}
    </div>
  );
};

export default CategoryQuestionOverview;
