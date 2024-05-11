import React, { useEffect, useState } from "react";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { LEADER_BOARD } from "core/service/api.url.service";
import { services } from "core/service";
import ImageFallback from "components/common/image-fallback";
import { Loading } from "components/common/loading";
import { utils } from "core/helper";

const LeaderboardMain = (props) => {
  const { leaderboardSettingsObj } = props;
  const [leaderboard, setLeaderBoard] = useState([]);
  const [loading, setLoading] = useState(false);

  const leaderboards = async () => {
    setLoading(true);
    try {
      const resp = await services.get(LEADER_BOARD);
      if (resp?.status) {
        setLeaderBoard(resp?.data);
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
      await leaderboards();
    };
    if (isComponentMounted) {
      handleChange();
    }
  }, [isComponentMounted]);

  useEffect(() => {
    setComponentMounted(true);
  }, []);

  return (
    <Container className="pbee_leaderBoard">
      <Row>
        <Col md={12} className="text-center">
          <Tab.Container defaultActiveKey={"weekly"}>
            <Nav>
              <Nav.Item>
                <Nav.Link eventKey={"weekly"}>
                  <div className="pbee_leaderBoard_img_wrap">
                    <img
                      src={leaderboardSettingsObj?.image}
                      alt="leaderboard-img"
                    />
                  </div>
                  {leaderboardSettingsObj?.name}
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <div className="pbee_leaderBoard_information">
              <p>
                {utils.infoicon(16, 16)}
                {leaderboardSettingsObj?.info}
              </p>
            </div>
            <div className="pbee_leaderBoard_img_wrap_banner">
              <ImageFallback
                src={leaderboard?.bannerImage}
                alt="leaderboard-img"
              />
            </div>
            <div className="pbee_leaderBoard_comming_soon_sec">
              <span>{leaderboard?.settleString}</span>
            </div>
            <Tab.Content>
              <Tab.Pane eventKey={"weekly"}>
                <div className="pbee_leaderboard_weekly">
                  <Row className="pbee_leaderboard_weekly_heading_wrap">
                    {leaderboardSettingsObj?.headers?.length > 0 &&
                      leaderboardSettingsObj?.headers?.map((e, i) => {
                        return (
                          <Col key={i} xs={4} md={4}>
                            <div className="pbee_leaderboard_weekly_heading">
                              <p>
                                {e?.value} {e?.comment}
                              </p>
                            </div>
                          </Col>
                        );
                      })}
                  </Row>
                  {!loading && leaderboard?.allLeaderBoard?.length === 0 && (
                    <div className="pearbee_empty_date_wrap">
                      <h5>No Users Found</h5>
                    </div>
                  )}
                  {loading && <Loading variant="light" />}
                  {!loading &&
                    leaderboard?.allLeaderBoard?.length > 0 &&
                    {
                      /* <div className="pbee_leaderboard_weekly_rank_block">
                    <div className="pbee_leaderboard_weekly_yourRank">
                      <Row>
                        <Col className="pbee_leaderboard_email_or_number">
                          <h4>9******116</h4>
                        </Col>
                        <Col className="pbee_leaderboard_coins">
                          <h4>1200</h4>
                        </Col>
                        <Col className="pbee_leaderboard_rank">
                          <h4>8</h4>
                        </Col>
                      </Row>
                      <div className="pbee_leaderboard_rank_top">Your Rank</div>
                    </div>
                  </div>

                  <Row className="pbee_leaderboard_weekly_list">
                    <Col className="pbee_leaderboard_email_or_number">
                      <h4>satel*****7921 @gmail.com</h4>
                    </Col>
                    <Col className="pbee_leaderboard_coins">
                      <h4>2500</h4>
                    </Col>
                    <Col className="pbee_leaderboard_rank">
                      <h4>8</h4>
                    </Col>
                  </Row>

                  <Row className="pbee_leaderboard_weekly_list">
                    <Col className="pbee_leaderboard_email_or_number">
                      <h4>satel*****7921 @gmail.com</h4>
                    </Col>
                    <Col className="pbee_leaderboard_coins">
                      <h4>2500</h4>
                    </Col>
                    <Col className="pbee_leaderboard_rank">
                      <h4>8</h4>
                    </Col>
                  </Row> */
                    }}
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
};

export default LeaderboardMain;
