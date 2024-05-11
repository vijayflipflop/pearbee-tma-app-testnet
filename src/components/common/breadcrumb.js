import React, { Fragment, useEffect, useState } from "react";
import flat from "assets/images/Home-img/flat-coin.png";
import trophyImg from "../../assets/images/trophyicon.png";
import { Container, Navbar, Form } from "react-bootstrap";
import { utils } from "core/helper";
import OffCanvasCommon from "./offcanvas";

const Breadcrumb = (props) => {
  const {
    category,
    questionId,
    title,
    isCoin,
    className,
    fluid,
    winningBreakUp,
    volumeUp,
    enablePortfolioHandle = false,
    handlePortfolioEvent,
    leaderboardSettingsObj,
  } = props;

  const [portfolioCheck, setPortfolioCheck] = useState("public");

  const handleBack = () => {
    window.history.back();
  };

  const handlePortfolio = (event) => {
    const { checked } = event.target;
    const portfolioType = event.target.checked ? "public" : "private";
    setPortfolioCheck(portfolioType);
    handlePortfolioEvent(portfolioType);
  };

  const [winningBreakUpShow, setWinningBreadkupShow] = useState(false);
  const handleWinningBreakupTogg = () => {
    setWinningBreadkupShow(!winningBreakUpShow);
  };

  const handleWinningBreakup = () => {
    utils.mixPannelEvent(
      "click_winnings_breakup_button",
      "CLICKED_WINNINGS_BEARKUP_BUTTON",
      "click_winnings_breakup_button"
    );
    handleWinningBreakupTogg();
  };

  return (
    <Navbar sticky="top" className={className}>
      <Container fluid={fluid}>
        <div className="d-flex align-items-center" style={{ gap: "14px" }}>
          {utils.arrowback(24, 24, handleBack)}
          <h1>{category?.[0]?.name || title}</h1>

          {questionId && (
            <Fragment>
              <span className="text-white">/</span>
              <h1 className="main-header-title">{questionId}</h1>
            </Fragment>
          )}
        </div>
        {enablePortfolioHandle && (
          <div className="portfolio_check_toggle">
            <Form.Check
              type="switch"
              id="switch"
              checked={portfolioCheck === "public" ? true : false}
              onChange={handlePortfolio}
            />
            <Form.Label
              className={
                portfolioCheck === "public"
                  ? "portfolio_check_public"
                  : "portfolio_check_private"
              }
              for="switch"
            >
              {portfolioCheck}
            </Form.Label>
          </div>
        )}

        {isCoin && (
          <div className="header_coins_count">
            <div className="header_coins_lhs">
              <img src={flat} width={32} height={28} alt="camera icon" />
            </div>
            <div className="header_coins_rhs">
              <p>
                <span className="d-block">1</span>coins
              </p>
            </div>
          </div>
        )}

        {winningBreakUp && (
          <div
            onClick={handleWinningBreakup}
            className="leaderboard_winning_breakup"
          >
            <img
              src={trophyImg}
              alt="trophy-img"
              width={32}
              height={32}
              style={{ objectFit: "cover" }}
            />
            <h6>
              Winnings <br /> Breakup
            </h6>
          </div>
        )}

        {/* {volumeUp && (
          <>
            <button>Start</button>
            <div>{utils.volumeUpIcon(24, 23.33)}</div>
          </>
        )} */}
      </Container>

      {/* winnings-breakup */}
      <OffCanvasCommon
        show={winningBreakUpShow}
        onHide={handleWinningBreakupTogg}
        placement="bottom"
        className="winning_breakup_offcanvas"
      >
        <div className="winning_breakup_frame_wrap">
          {/* <iframe
            src={leaderboardSettingsObj?.breakupUrl}
            loading="lazy"
            allowFullScreen
            sandbox="allow-downloads allow-top-navigation allow-storage-access-by-user-activation allow-orientation-lock allow-modals allow-scripts allow-same-origin allow-pointer-lock allow-popups allow-forms"
          /> */}
          <h1 className=" text-black">Coming Soon</h1>
        </div>
      </OffCanvasCommon>
    </Navbar>
  );
};

export default Breadcrumb;
