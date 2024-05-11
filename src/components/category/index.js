import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import QuestionCard from "components/common/question-card";

const MainCategoryDetail = (props) => {
  const { questionData, error, isLoading } = props;

  return (
    <Container>
      <Row>
        <Col sm={12}>
          <Row>
            {!isLoading &&
              questionData?.length > 0 &&
              questionData.map((ele, ind) => {
                return (
                  <Col xs={12} key={ind}>
                    <QuestionCard
                      cardFor={"catgory"}
                      categoryAnsButton={"categoryAnsButton"}
                      questionDetails={ele}
                    />
                  </Col>
                );
              })}
            {!isLoading && questionData.length === 0 && error && (
              <div className="pearbee_empty_date_wrap">
                <h5>No Records Found</h5>
              </div>
            )}
            {!isLoading && questionData?.length === 0 && !error && (
              <div className="pearbee_empty_date_wrap">
                <h5>No Records Found</h5>
              </div>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default MainCategoryDetail;
