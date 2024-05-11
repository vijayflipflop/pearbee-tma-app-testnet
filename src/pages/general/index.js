import React, { useEffect, useState } from "react";
import CommonHeader from "components/common/breadcrumb";
import GeneralMain from "components/GeneralMain";
import { useParams } from "react-router-dom";
import Services from "core/service/services";
import { CATEGORYBYID, CATEGORY_QUESTION } from "core/service/api.url.service";
import { Loading } from "components/common/loading";

const General = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [questionData, setQuestionData] = useState([]);
  const [category, setCategory] = useState([]);

  const categoryBasedQuestions = async () => {
    setIsLoading(true);
    try {
      const category = await Services.get(`${CATEGORYBYID}${id}`);
      if (category?.status) {
        setCategory(category.result);
        const questions = await Services.get(`${CATEGORY_QUESTION}${id}`);
        if (questions?.status) {
          setQuestionData(questions?.result);
          setIsLoading(false);
        }
      }
    } catch (error) {
      throw error.message;
    }
  };

  const [isComponentMounted, setComponentMounted] = useState(false);
  useEffect(() => {
    const handleChange = async () => {
      await categoryBasedQuestions();
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
      {!isLoading && <CommonHeader category={category} />}
      {!isLoading && <GeneralMain questionData={questionData} />}
    </div>
  );
};

export default General;
