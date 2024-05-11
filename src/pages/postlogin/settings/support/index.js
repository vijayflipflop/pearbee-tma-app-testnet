import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as Routeconst from "pages/routes/routes";
import { utils } from "core/helper";
import telegramLogo from "assets/images/Support-img/telegram-plane 1.png";
import envelopeLogo from "assets/images/Support-img/envelope-regular 1.png";

const Support = () => {
  return (
    <div className="page_container">
      <div className="d-flex align-items-center gap-3 page_header">
        <Link to={Routeconst.SETTING}>{utils.arrowback(27, 18)}</Link>
        <h1>Support</h1>
      </div>

      <Container>
        <Row>
          <Col>
            <div className="reachUs_container">
              <div className="d-flex flex-column gap-4">
                <h1>REACH US</h1>
                <div className="reachUs_card">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <img src={telegramLogo} alt="telegram" />
                    <h2>Telegram</h2>
                  </div>
                  <div className="reachUs_inside">
                    <p>
                      You can Shoot your questions on our Telegram handle.{" "}
                      <a href={"#"}>PearBee</a>
                    </p>
                  </div>
                </div>
                <div className="reachUs_card">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <img src={envelopeLogo} alt="envelope" />
                    <h2>E-mail</h2>
                  </div>
                  <div className="reachUs_inside">
                    <p>
                      You can also email mentioning your phone number to.{" "}
                      <a href={"#"}>pearbeecontact@gmail.com</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Support;
