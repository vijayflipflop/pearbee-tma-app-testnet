import { useState, useEffect } from "react";
import Services from "core/service/services";
import {
  GET_PORTFOLIO_LIVE_DETAILS,
  PORTFOLIO_LIVE_QUESTIONS,
} from "core/service/api.url.service";
import { Loading } from "components/common/loading";
import { services } from "core/service";
import { utils } from "core/helper";
import { LIVE_EVENTS, questionStatus } from "core/helper/constant";
import moment from "moment";
import OffCanvasCommon from "components/common/offcanvas";

const LiveEvents = (props) => {
  const { eventType } = props;
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(0);
  const [page, setPage] = useState(null);
  const [questionDetail, setQuestionDetails] = useState(null);
  const [show, setShow] = useState(false);
  const [orders, setOrders] = useState([]);
  const [tradeLoading, setTradeLoading] = useState(false);
  const [isComponentMounted, setComponentMounted] = useState(false);

  const handleShowContent = () => {
    setShow(!show);
  };

  const getAllEvents = async () => {
    try {
      const questionResp = await Services.get(PORTFOLIO_LIVE_QUESTIONS);
      const { status: questionStatus, result: questionResult } =
        questionResp || {};
      if (questionStatus) {
        const totalPages = questionResult[0] ? questionResult[0].full_count : 0;
        console.log("totalPages::", totalPages);
        setTotalPosts(totalPages);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchEvents = async (page) => {
    console.log("fetchEvents-page::", page);
    try {
      const questionResp = await Services.get(
        `${PORTFOLIO_LIVE_QUESTIONS}?page=${page}`
      );
      const { status: questionStatus, result: questionResult } =
        questionResp || {};
      if (questionStatus) {
        setVisible((prev) => prev + questionResult.length);
        setPosts((prev) => [...prev, ...questionResult]);
        setError(null);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnScroll = () => {
    console.log("window.scrollY::", window.scrollY);
    console.log("window.innerHeight::", window.innerHeight);
    console.log(
      "document.documentElement.scrollHeight::",
      document.documentElement.scrollHeight
    );
    if (
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const handleChange = async () => {
      await getAllEvents();
    };
    if (isComponentMounted) {
      setPage(1);
      handleChange();
    }
  }, [isComponentMounted]);

  useEffect(() => {
    setComponentMounted(true);
  }, []);

  useEffect(() => {
    if (page) {
      console.log("page::", page);
      fetchEvents(page);
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

  const handleGetLiveQuestionDetails = async (id) => {
    try {
      setTradeLoading(true);
      const resp = await services.get(GET_PORTFOLIO_LIVE_DETAILS + id);
      if (resp?.status && resp?.result?.length > 0) {
        handleShowContent();
        const liveEventObj = posts.find((e) => e?.id === id);
        if (liveEventObj) {
          setQuestionDetails(liveEventObj);
        }
        setOrders(resp?.result);
        setTradeLoading(false);
      } else {
        utils.showErrMsg("No records");
        setTradeLoading(false);
      }
    } catch (error) {
      throw error.message;
    }
  };

  const getStatmentText = (status) => {
    const formatDate = utils.timeCalculation(questionDetail?.endtime);

    // console.log("typeof status::", typeof status);
    // console.log("status::", status);

    if (eventType === LIVE_EVENTS) {
      if (status === null) {
        // for live event status: null for pending
        return <p className="pearbee_status_ongoing_text">{formatDate}</p>;
      } else {
        return "No";
      }
    } else {
      switch (status) {
        case 1: // upcoming: 1 - Pending,
          return "";
        case 2: // live: 2 - Ongoing,
        case 4: // paused: 4 - Paused,
          return <p className="pearbee_status_ongoing_text">{formatDate}</p>;
        // case 3: // completed: 3 - Settled,
        //   return (
        //     <p className="pearbee_status_bg_settled_text">
        //       Settled with <span>{settledAnwser}</span>
        //     </p>
        //   );
        case 4: // paused: 4 - Paused,
          return (
            <p className="pearbee_status_ongoing_text">
              New Orders are not allowed!
            </p>
          );
        case 5: // cancelled: 5 - Refund,
          return <p className="pearbee_status_ongoing_text">Event Cancelled</p>;
        case 8: // pending: 8 - Pending
          return (
            <p className="pearbee_status_settle_yet">
              Settlement yet to Happen
            </p>
          );
        default:
          return <p>No Settled</p>;
      }
    }
  };

  const getBottomSheetHeadingLabel = (status) => {
    const statusObj = questionStatus.find((e) => {
      if (e.status === status || e.label === status) {
        return e;
      }
    });

    if (eventType === LIVE_EVENTS) {
      if (status === null) {
        return (
          <div className="pearbee_statement_tag pearbee_status_ongoing">
            Ongoing
          </div>
        );
      } else if (status === 1) {
        return (
          <div className="pearbee_statement_tag pearbee_status_pending">
            {statusObj?.displayText}
          </div>
        );
      } else {
        return "No";
      }
    } else {
      switch (status) {
        case 1: // upcoming: 1 - Pending,
          return (
            <div className="pearbee_statement_tag pearbee_status_pending">
              {statusObj?.displayText}
            </div>
          );
        case 2: // live: 2 - Ongoing,
          return (
            <div className="pearbee_statement_tag pearbee_status_ongoing">
              {statusObj?.displayText}
            </div>
          );
        case 3: // completed: 3 - Settled,
          return (
            <div className="pearbee_statement_tag pearbee_status_completed">
              {statusObj?.displayText}
            </div>
          );
        case 4: // paused: 4 - Paused,
          return (
            <div className="pearbee_statement_tag pearbee_status_paused">
              {statusObj?.displayText}
            </div>
          );
        case 5: // cancelled: 5 - Refund,
          return (
            <div className="pearbee_statement_tag pearbee_status_refunded">
              {statusObj?.displayText}
            </div>
          );
        case 8: // pending: 8 - Pending
          return (
            <div className="pearbee_statement_tag pearbee_status_pending">
              {statusObj?.displayText}
            </div>
          );
        default:
          return (
            <div className="pearbee_statement_tag pearbee_status_bg_settled">
              {statusObj?.displayText}
            </div>
          );
      }
    }
  };

  const getWinngsLabel = (status, result, number) => {
    if (status === "Completed" && result === "WON") {
      return <span className={"won"}>{number}</span>;
    } else if (status === "Completed" && result === "LOSS") {
      return <span className={"loss"}>{number}</span>;
    } else {
      return <span className={"processing"}>{number}</span>;
    }
  };

  const getChoiceLabel = (status, result, text) => {
    if (status === "Completed" && result === "WON") {
      return <span className={"won"}>{text}</span>;
    } else if (status === "Completed" && result === "LOSS") {
      return <span className={"loss"}>{text}</span>;
    } else {
      return <span className={"processing"}>{text}</span>;
    }
  };

  return (
    <div className="pearbee_portfolio_live_event_sec">
      <div className="pearbee_portfolio_live_event_body">
        <h1>Trades</h1>
        {/* {isLoading && <Loading variant={"light"} />} */}
        {!isLoading && posts.length === 0 && !error && (
          <div className="pearbee_empty_date_wrap">
            <h5>No Live Events Found</h5>
          </div>
        )}
        {!isLoading && posts.length === 0 && error && (
          <div className="pearbee_empty_date_wrap">
            <h5>No Records Found</h5>
          </div>
        )}
        {!isLoading &&
          posts.length > 0 &&
          posts.map((e, i) => {
            const { date, question, investment, id } = e;
            return (
              <div
                key={i}
                className="pearbee_portfolio_live_event_content"
                onClick={() => handleGetLiveQuestionDetails(id)}
              >
                <div>
                  <p>{moment(date).format("hh:mm A")} </p> &#x2022;{" "}
                  <p>{moment(date).format("D MMM")}</p>
                </div>
                <p>{question}</p>
                <div>
                  <p>Investment {investment || 0}</p>
                  {/* <p>Expected Returns: 200 Coins</p> */}
                </div>
              </div>
            );
          })}
        {totalPosts > 0 && visible < totalPosts && (
          <div className={"loading_wrapper"}>
            <Loading animation="border" variant={"light"} />
          </div>
        )}
      </div>
      <OffCanvasCommon
        show={show}
        onHide={handleShowContent}
        placement="bottom"
        className="portfoli_canvas"
      >
        <div className="empty_border"></div>
        <div className="portfoli_canvas_content_wrap">
          <div className="portfolio_canvas_head_body_content_wrap">
            <div className="portfoli_canvas_content_head">
              <p>{questionDetail?.question}</p>
              {getStatmentText(questionDetail?.status)}
            </div>
            <div className="portfoli_canvas_content_body">
              {/* <div className="portfoli_canvas_content_coins_sec">
              <Row>
                <Col md={12} lg={6}>
                  <div className="portfoli_canvas_content_coins_content">
                    <h2>{questionDetail?.investment || 0} Coins</h2>
                    <p>Investment</p>
                  </div>
                </Col>
                <Col md={12} lg={6}>
                  <div className="portfoli_canvas_content_coins_content">
                    <h2 className="pearbee_coin_returns">- 30 Coins</h2>
                    <p>Returns</p>
                  </div>
                </Col>
              </Row>
            </div> */}
              <div className="portfoli_canvas_orders_sec">
                <h1>Your Orders</h1>
                <div className="portfoli_canvas_orders_height_sec">
                  {tradeLoading && <Loading variant="light" />}
                  {!tradeLoading && orders.length === 0 && (
                    <div className="pearbee_empty_date_wrap">
                      <h5>No Records Found</h5>
                    </div>
                  )}
                  {!tradeLoading &&
                    orders.length > 0 &&
                    orders.map((e, i) => {
                      return (
                        <div
                          key={i}
                          className="portfoli_canvas_orders_content_sec"
                        >
                          <div className="portfoli_canvas_order_head_sec">
                            <p>{moment(e?.created).format("hh:mm A")}</p>
                            {getWinngsLabel(e?.status, e?.result, e?.winnings)}
                          </div>
                          <div className="portfoli_canvas_order_body_sec">
                            <p>Your Choice </p>
                            {getChoiceLabel(e?.status, e?.result, e?.answer)}
                          </div>
                          <div className="portfoli_canvas_order_footer_sec">
                            <ul>
                              <li>
                                Trade Price
                                <span>{e?.trade_price}</span>
                              </li>
                              <li>
                                Quantity
                                <span>{e?.quantity}</span>
                              </li>
                              <li>
                                Investment
                                <span>{e.investment || 0}</span>
                              </li>
                              <li>
                                Current Value
                                <span>{e.win_amount || 0}</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
        {getBottomSheetHeadingLabel(questionDetail?.status)}
        {/* {eventType === CLOSED_EVENTS && getStatus(questionDetail?.status)}
        {eventType === LIVE_EVENTS && (
          <div className="pearbee_statement_tag pearbee_status_ongoing">
            Ongoing
          </div>
        )} */}
      </OffCanvasCommon>
    </div>
  );
};

export default LiveEvents;
