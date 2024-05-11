import { Loading } from "components/common/loading";
import { utils } from "core/helper";
import { ugcLinks } from "core/helper/constant";
import { services } from "core/service";
import {
  GET_EXPIRED_QUESTIONS,
  GET_PARTICIPATED_QUESTIONS,
  USER_TRADE_QUESTIONS,
} from "core/service/api.url.service";
import moment from "moment";
import { ASK } from "pages/routes/routes";
import React, { useEffect, useState } from "react";
import { Card, Tab, Row, Col, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as Routeconst from "pages/routes/routes";

const UGCScreen = () => {
  const [expired, setExpired] = useState([]);
  const [createdByMe, setCretedByMe] = useState([]);
  const [joined, setJoined] = useState([]);
  const [loading, setLoading] = useState(false);
  const [eventKey, setEventkey] = useState("createdByMe");

  const handleEventkeyChange = (key) => {
    setEventkey(key);
  };

  const loadExpired = async () => {
    try {
      setLoading(true);
      const resp = await services.get(GET_EXPIRED_QUESTIONS);
      if (resp?.status) {
        setExpired(resp?.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      throw error.message;
    }
  };

  const loadCreatedByMe = async () => {
    try {
      const resp = await services.get(USER_TRADE_QUESTIONS);
      if (resp?.status) {
        setCretedByMe(resp?.result);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      throw error.message;
    }
  };

  const loadParticipated = async () => {
    try {
      const resp = await services.get(GET_PARTICIPATED_QUESTIONS);
      if (resp?.status) {
        setJoined(resp?.data);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      throw error.message;
    }
  };

  const [isComponentMounted, setComponentMounted] = useState(false);
  useEffect(() => {
    const handleChange = async () => {
      if (eventKey === "createdByMe") {
        await loadCreatedByMe();
      }
      if (eventKey === "participated") {
        await loadParticipated();
      }
      if (eventKey === "expired") {
        await loadExpired();
      }
    };
    if (isComponentMounted) {
      handleChange();
    }
  }, [isComponentMounted, eventKey]);

  useEffect(() => {
    setComponentMounted(true);
  }, []);

  return (
    <Container>
      <Row>
        <Col md={12}>
          <div className="ugc_container">
            <div className="ugc_input_group">
              <h2>Enter Invite link/code here</h2>
              <div className="ugc_input">
                <input type="text" placeholder="Paste here" />
                <button type="submit">Submit</button>
              </div>
            </div>
            <div className="question_container">
              <p>Have a question in your mind?</p>
              <Link to={ASK}>Create Now {utils.arrowrightugcicon(16, 15)}</Link>
            </div>
            <Tab.Container defaultActiveKey={"created-by-me"}>
              <Nav>
                {ugcLinks.map((e, i) => (
                  <Nav.Item key={i}>
                    <Nav.Link
                      onClick={() => handleEventkeyChange(e.value)}
                      eventKey={e.value}
                    >
                      {e.label}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
              <Tab.Content>
                <Tab.Pane className="ugc_tabs" eventKey={"created-by-me"}>
                  <Row>
                    {!loading && createdByMe.length === 0 && (
                      <div className="pearbee_no_records_wrap">
                        <h5>No Records Found</h5>
                      </div>
                    )}
                    {loading && <Loading variant={"light"} />}
                    {!loading &&
                      createdByMe.length > 0 &&
                      createdByMe.map((e, i) => {
                        return (
                          <Col key={i} lg={6} xl={6} xxl={6}>
                            <Card>
                              <Card.Header>
                                <p>
                                  Scheduled at{" "}
                                  {moment(e?.start_time).format("hh:mm A")}{" "}
                                  {moment(e?.start_time).format("DD/MM")}
                                </p>
                                <span>{utils.supervisoricon(14, 14)}100</span>
                              </Card.Header>
                              <Card.Body>
                                <div className="card_main-heading">
                                  <h2>{e?.question}</h2>
                                  {utils.share(24, 24)}
                                </div>
                                <div className="ugc_leftago">
                                  <p>{e?.name}</p>
                                  <p>{utils.questionExpire(e?.end_time)}</p>
                                </div>
                                <div className="ugc_options">
                                  <ul>
                                    {e.options?.map((optionEle, optionInd) => (
                                      <li key={optionInd}>
                                        {optionEle?.option}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <Card.Footer>
                                  <div>
                                    <p>
                                      {utils.briefcaseicon(14, 14)}Invested{" "}
                                      {e?.investment_amount}
                                    </p>
                                  </div>
                                  <div className="ugc_edit_question">
                                    <span>{utils.plusdarkicon(12, 12)}</span>
                                    <span>
                                      <Link to={`${Routeconst.ASK}/${e?.id}`}>
                                        {utils.editoutlinedicon(12, 12)}Edit
                                      </Link>
                                    </span>
                                  </div>
                                </Card.Footer>
                              </Card.Body>
                            </Card>
                          </Col>
                        );
                      })}
                  </Row>
                </Tab.Pane>
                <Tab.Pane className="ugc_tabs" eventKey={"participated"}>
                  <Row>
                    {!loading && joined.length === 0 && (
                      <div className="pearbee_no_records_wrap">
                        <h5>No Records Found</h5>
                      </div>
                    )}
                    {loading && <Loading variant={"light"} />}
                    {!loading &&
                      joined.length > 0 &&
                      joined.map((e, i) => {
                        return (
                          <Col key={i} lg={6} xl={6} xxl={6}>
                            <Card>
                              <Card.Header>
                                <p>
                                  Scheduled at{" "}
                                  {moment(e?.start_time).format("hh:mm A")}{" "}
                                  {moment(e?.start_time).format("DD/MM")}
                                </p>
                                <span>{utils.supervisoricon(14, 14)}100</span>
                              </Card.Header>
                              <Card.Body>
                                <div className="card_main-heading">
                                  <h2>{e?.question}</h2>
                                  {utils.share(24, 24)}
                                </div>
                                <div className="ugc_leftago">
                                  <p>{e?.name}</p>
                                  <p>{utils.questionExpire(e?.end_time)}</p>
                                </div>
                                <div className="ugc_options">
                                  <ul>
                                    {e.options?.map((optionEle, optionInd) => (
                                      <li key={optionInd}>
                                        {optionEle?.option}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <Card.Footer>
                                  <div>
                                    <p>
                                      {utils.briefcaseicon(14, 14)}Invested{" "}
                                      {e?.investment_amount}
                                    </p>
                                  </div>
                                  <div className="ugc_edit_question">
                                    <span>{utils.plusdarkicon(12, 12)}</span>
                                    <span>
                                      <Link to={`${Routeconst.ASK}/${e?.id}`}>
                                        {utils.editoutlinedicon(12, 12)}Edit
                                      </Link>
                                    </span>
                                  </div>
                                </Card.Footer>
                              </Card.Body>
                            </Card>
                          </Col>
                        );
                      })}
                  </Row>
                </Tab.Pane>
                <Tab.Pane className="ugc_tabs" eventKey={"expired"}>
                  <Row>
                    {!loading && expired.length === 0 && (
                      <div className="pearbee_no_records_wrap">
                        <h5>No Records Found</h5>
                      </div>
                    )}
                    {loading && <Loading variant={"light"} />}
                    {!loading &&
                      expired.length > 0 &&
                      expired.map((e, i) => {
                        return (
                          <Col key={i} lg={6} xl={6} xxl={6}>
                            <Card>
                              <Card.Header>
                                <p>
                                  Scheduled at{" "}
                                  {moment(e?.start_time).format("hh:mm A")}{" "}
                                  {moment(e?.start_time).format("DD/MM")}
                                </p>
                                <span>{utils.supervisoricon(14, 14)}100</span>
                              </Card.Header>
                              <Card.Body>
                                <div className="card_main-heading">
                                  <h2>{e?.question}</h2>
                                  {utils.share(24, 24)}
                                </div>
                                <div className="ugc_leftago">
                                  <p>{e?.name}</p>
                                  <p>{utils.questionExpire(e?.end_time)}</p>
                                </div>
                                <div className="ugc_options">
                                  <ul>
                                    {e.options?.map((optionEle, optionInd) => (
                                      <li key={optionInd}>
                                        {optionEle?.option}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <Card.Footer>
                                  <div>
                                    <p>
                                      {utils.briefcaseicon(14, 14)}Invested{" "}
                                      {e?.investment_amount}
                                    </p>
                                  </div>
                                  <div className="ugc_edit_question">
                                    <span>{utils.plusdarkicon(12, 12)}</span>
                                    <span>
                                      <Link to={`${Routeconst.ASK}/${e?.id}`}>
                                        {utils.editoutlinedicon(12, 12)}Edit
                                      </Link>
                                    </span>
                                  </div>
                                </Card.Footer>
                              </Card.Body>
                            </Card>
                          </Col>
                        );
                      })}
                  </Row>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UGCScreen;
