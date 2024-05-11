import { Card, Col, Row, Tab } from "react-bootstrap";
import { utils } from "core/helper";
import Progress from "components/common/progress";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { CATEGORIES } from "pages/routes/routes";

const Questions = (props) => {
  const { questionData } = props;

  return (
    <Col sm={12}>
      <Row>
        {questionData.map((ele, ind) => {
          const {
            id: questionId,
            category_id,
            question,
            end_time,
            hint,
            participants,
            options,
            total_bet_amount,
          } = ele;
          const expire = utils.timeCalculation(end_time);
          return (
            <Col xs={12} key={ind}>
              <Link to={`${CATEGORIES}/${category_id}/${questionId}`}>
                <Card className="pbee_question_card">
                  <div className="pbee_question_card_header">
                    <Row>
                      <Col md={4}>
                        <div className="pbee_question_card_category_img">
                          <img width={20} height={20} src={ele?.category_icon} />
                          {ele?.category_name}
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="pbee_question_card_expire">
                          <p>
                            {utils.scheduleicon(20, 20, "#fff")} {expire}
                          </p>
                        </div>
                      </Col>
                      <Col md={4}>
                        <p className="text-end d-flex align-items-center justify-content-end gap-1">
                          {utils.visibleicon(20, 20, "#000")} {participants}
                        </p>
                      </Col>
                    </Row>
                  </div>
                  <Card.Body>
                    <div className="pbee_question_card_body">
                      <p>{question}</p>
                      <div className="pbee_question_hint">
                        {utils.lightbulb()}
                        <p>{hint}</p>
                      </div>
                      <div className="pbee_question_sec" key={ind}>
                        {options.map((ele, ind) => {
                          const { option } = ele;
                          return (
                            <Fragment key={ind}>
                              <Progress
                                onClick={null}
                                variant={"transparent"}
                                label={option}
                                now={0}
                                className="text-dark"
                              />
                            </Fragment>
                          );
                        })}
                      </div>
                      <div className="pbee_question_card_footer">
                        <p>Total Investment : </p>
                        <span>{utils.coinIcon(20, 20)}{total_bet_amount}</span>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </Col>
  );
};

export default Questions;
