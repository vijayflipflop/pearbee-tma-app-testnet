import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import moment from "moment";
import { utils } from "core/helper";
import QuestionCard from "components/common/question-card";
import { connect } from "react-redux";

const CategoryQuestionOverviewDetails = (props) => {
  const { questionDetails } = props;
  const [showMore, setShowMore] = useState(false);
  const handleShowMoreLess = () => setShowMore(!showMore);

  const [isCopied, setIsCopied] = useState(false);
  useEffect(() => {
    if (isCopied) {
      utils.showSuccessMsg("copied");
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    }
  }, [isCopied]);

  const handleCopyAddress = (value) => {
    // navigator.clipboard.writeText(value);
    setIsCopied(true);
  };

  return (
    <Container>
      <QuestionCard questionDetails={questionDetails} />
      <div className="pbee_event_overview_sec">
        <div className="pbee_event_overview_header">
          <h1>Event Overview</h1>
          <p>
            {showMore
              ? questionDetails?.description
              : questionDetails?.description?.slice(0, 100) + "..."}{" "}
            &nbsp;
            <span onClick={handleShowMoreLess}>
              {showMore ? "Show less" : "Show more"}
            </span>
          </p>
        </div>
        <div className="pbee_event_overview_timeline">
          <h1>Event Timeline</h1>
          <div className="timeline-box">
            <div className="pbee_timeline_wrap">
              <div className="marker active">
                {moment(questionDetails?.created).isSameOrAfter(
                  questionDetails?.created
                ) && utils.checkTimeline(10, 10, "#0047AB")}
              </div>
              <div className="pbee_timeline_content">
                <h3>Event Started</h3>
                <p>
                  Started{" "}
                  {moment(questionDetails?.created).format(
                    "MMMM Do YYYY, h:mm a"
                  )}
                </p>
              </div>
            </div>
            <div className="pbee_timeline_wrap active">
              <div className="marker active">
                {moment(questionDetails?.created).isSameOrAfter(
                  questionDetails?.end_time
                ) && utils.checkTimeline(10, 10, "#0047AB")}
              </div>
              <div className="pbee_timeline_content">
                <h3>Event Ended</h3>
                <p>
                  Started{" "}
                  {moment(questionDetails?.end_time).format(
                    "MMMM Do YYYY, h:mm a"
                  )}
                </p>
              </div>
            </div>
            <div className="pbee_timeline_wrap">
              <div className="marker active">
                {moment(questionDetails?.created).isSameOrAfter(
                  questionDetails?.settle_time
                ) && utils.checkTimeline(10, 10, "#0047AB")}
              </div>
              <div className="pbee_timeline_content">
                <h3>Settlement Date</h3>
                <p>
                  {moment(questionDetails?.settle_time).format(
                    "MMMM Do YYYY, h:mm a"
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="pbee_timeline_source_truth">
            <p>Source of Truth</p>
            <div className="pbee_timeline_source_truth_link_sec">
              <Row>
                <Col xs={10} md={11}>
                  <a href="#">
                    www.cricbuzz.com/live-cricket-scores/56969/ind-vs-ban-1st-test-india-tour-of-bangladesh-2022
                  </a>
                </Col>
                <Col xs={2} md={1} className="d-flex align-items-center">
                  {/* {isCopied
                    ? utils.copiedIcon(20, 20)
                    : utils.copyIcon(
                        20,
                        20,
                        () =>
                          handleCopyAddress(
                            "www.cricbuzz.com/live-cricket-scores/56969/ind-vs-ban-1st-test-india-tour-of-bangladesh-2022"
                          ),
                        "#fffff"
                      )} */}
                  {utils.copyIcon(25, 25, () =>
                    handleCopyAddress(
                      "www.cricbuzz.com/live-cricket-scores/56969/ind-vs-ban-1st-test-india-tour-of-bangladesh-2022"
                    )
                  )}
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CategoryQuestionOverviewDetails;
