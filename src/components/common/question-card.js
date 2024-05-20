import React, { Fragment, useEffect, useState } from "react";
import { Card, Offcanvas, Button } from "react-bootstrap";
import { Form, Image } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import EventOverviewOffcanvas from "./EventOverviewOffcanvas";
import { utils } from "core/helper";
import ImageFallback from "components/common/image-fallback";
import OffCanvasCommon from "components/common/offcanvas";
import Progress from "components/common/progress";
import { services } from "core/service";
import {
  CATEGORY_QUESTION_BY_ID,
  CONFIRM_BED,
} from "core/service/api.url.service";
import vectorBarImg from "assets/images/Vector 2491.png";
import editicon from "assets/images/pencil_edit.png";
import bulbIcon from "assets/images/color_bulb.png";
import {
  reloadApiAfterBetAction,
  reloadWalletAction,
} from "core/redux/account/account.action";
import * as Routeconst from "pages/routes/routes";
import {
  useTonAddress,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
// import TonWeb from "tonweb";
import { Buffer } from "buffer";
import { getHttpEndpoint } from "@orbs-network/ton-access";
// import axios from "axios";
import ModalCommon from "./modal";
import { SubmitLoading } from "./loading";
// import TonClient from "ton";

window.Buffer = window.Buffer || Buffer;
const TonWeb = require("tonweb");
// const BN = require("bn.js");

const QuestionCard = (props) => {
  const {
    questionDetails,
    cardFor = "questionDetail",
    categoryAnsButton,
    reloadWalletAction,
    reloadApiAfterBetAction,
  } = props;
  // console.log("cardFor::", cardFor);
  // const walletBalance = useSelector((state) => state.account?.wallet);
  const reloadWallet = useSelector((state) => state.account?.reloadWallet);
  const reloadApi = useSelector((state) => state.account?.reloadWallet);
  const [show, setShow] = useState(false);
  // const rawAddress = useTonAddress(false);
  // console.log("rawAddress::", rawAddress);
  const toncenterTestpoint = "https://testnet.toncenter.com";
  // const tonCenterMainPoint = "https://toncenter.com";

  const wallet = useTonWallet();
  const [tonConnectUI, setOptions] = useTonConnectUI();
  console.log("wallet::", wallet);
  const [qty, setQty] = useState(1);
  const [successShow, setSuccessShow] = useState(false);
  const [errorShow, setErrorShow] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [respMsg, setRespMessage] = useState("");
  const [investment, setInvestment] = useState(questionDetails?.minimum);
  const [getUptoVal, setGetUptoVal] = useState(0);
  const [eventDetails, setEventDetails] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [commission, setCommission] = useState(0);
  const [optionsState, setOptionsState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editQuantity, setEditQuantity] = useState(false);
  const [balance, setBalance] = useState(0);
  const [mounted, setIsMounted] = useState(false);
  const [quantityVal, setQuanityVal] = useState("");

  useEffect(() => {
    if (eventDetails !== null && qty > 0) {
      handleCommissionAndGetUpTp();
    }
  }, [selectedIndex, eventDetails, qty]);

  const handleQuestionDetails = async (questionId) => {
    try {
      const resp = await services.get(CATEGORY_QUESTION_BY_ID + questionId);
      if (resp?.status) {
        setEventDetails(resp?.result?.[0]);
        return resp?.result?.[0];
      }
    } catch (err) {
      throw err.message;
    }
  };

  const handleBetToggleShow = async (option, idx) => {
    const questionResp = await handleQuestionDetails(questionDetails?.id);
    if (questionResp) {
      utils.mixPannelEvent(
        "click_question_page_answer_button",
        "CLICKED_QUESTION_PAGE_ANS_BUTTON",
        "click_question_page_answer_button"
      );
      setShow(true);
      setSelectedOption(option?.id);
      setSelectedIndex(idx);
    }
  };

  const handleCommissionAndGetUpTp = () => {
    setInvestment(qty * eventDetails?.minimum);
    let getCommission = calculateCommission(selectedIndex, qty);
    setCommission(getCommission);
    let getUptoVal = expectedReturncode(selectedIndex, qty);
    setGetUptoVal(getUptoVal);
    const options = [];
    eventDetails?.options?.map(
      (ele, ind) =>
        (options[ind] = {
          ...ele,
          percent: optionPercentage(ele, ind, qty),
        })
    );
    setOptionsState(options);
  };

  const handleChangeQuantity = (e) => {
    const { value } = e.target;
    setQty(value);
    setQuanityVal(value);
  };

  const handleBetToggleHide = () => {
    setShow(false);
    setLoading(false);
    setQty(1);
    setSelectedOption("");
  };

  function optionPercentage(option, index, sliderQty) {
    let betTotal = option?.bet_amount;
    let userInput = index == selectedIndex ? yourInvestCalc(sliderQty) : 0;
    let total = betTotal + userInput;
    let percentVal =
      (total / (eventDetails?.total_bet_amount + yourInvestCalc(sliderQty))) *
      100;
    return percentVal?.toFixed(2);
  }

  const handleSuccessShow = () => setSuccessShow(!successShow);
  const handleErrorToggle = () => setErrorShow(!errorShow);

  // useEffect(() => {
  //   if (successShow) {
  //     setTimeout(() => {
  //       handleSuccessShow(false);
  //     }, 2000);
  //   }
  // }, [successShow]);

  const handleConfirmBet = async (txHash_1) => {
    try {
      console.log("wallet::", wallet);
      if (wallet === null) {
        console.log("wallet not connected");
        return;
      }
      const payload = {
        questionId: eventDetails?.id,
        answerId: selectedOption,
        quantity: qty,
        maximum: eventDetails?.maximum,
        minimum: eventDetails?.minimum,
        roomId: null,
        hash: txHash_1,
      };
      const resp = await services.post(CONFIRM_BED, payload);
      if (resp?.status) {
        handleBetToggleHide();
        handleSuccessShow();
        setRespMessage(resp?.message);
        setLoading(false);
        reloadWalletAction(!reloadWallet);
        reloadApiAfterBetAction(true);
      } else {
        // handleBetToggleHide();
        // handleSuccessShow();
        // handleBetToggleHide();
        // handleErrorToggle();
        // setRespMessage(resp?.message);
        utils.showErrMsg(resp?.message);
        setLoading(false);
        // reloadApiAfterBetAction(true);
      }
    } catch (err) {
      setLoading(false);
      throw err.message;
    }
  };

  // const ConvertIntoTon = (inrAmount) => {
  //   const exchangeRate = 0.3745; // example exchange rate INR to TON
  //   const tonAmount = inrAmount / exchangeRate;
  //   console.log("tonAmount::", tonAmount);
  //   return String(tonAmount);
  // };

  const handleConfirmBetTon = async () => {
    setLoading(true);
    try {
      let convertNanotons = investment * 1e9;
      console.log("convertNanotons::", convertNanotons);
      const transaction = {
        messages: [
          {
            address: process.env.REACT_APP_TON_WALLET_ADDRESS, // destination address
            amount: String(2000000), //Toncoin in nanotons
          },
        ],
      };
      console.log("toncenterTestpoint::", toncenterTestpoint);
      const tonweb = new TonWeb(
        new TonWeb.HttpProvider(`${toncenterTestpoint}/api/v2/jsonRPC`, {
          apiKey: process.env.REACT_APP_TONCENTER_API_KEY_TEST,
        })
      );

      console.log("tonweb::", tonweb);
      const address = wallet.account.address;
      handleProcessTransaction(tonweb, transaction, address);
    } catch (err) {
      console.log("err::", err.message);
      setLoading(false);
    }
  };

  const handleProcessTransaction = async (tonweb, transaction, address) => {
    // let transactionBoc;
    try {
      let transactionBoc = await tonConnectUI.sendTransaction(transaction);
      console.log("transactionBoc::", transactionBoc);
      setTimeout(async () => {
        let tx = (await tonweb.getTransactions(address, 1))[0];
        console.log("tx::", tx);
        if (tx) {
          let hash = tx.transaction_id.hash;
          console.log("hash::", hash);
          handleConfirmBet(hash);
        }
      }, 10000);
    } catch (err) {
      console.log("er::", err);
      console.log("err.message", err.message);
    }
  };

  const OffcanvasHeader = () => {
    return (
      <Fragment>
        <ImageFallback src={vectorBarImg} />
        <div className="pbee_event_overview_offcanvas_header_wrap">
          <p>{questionDetails?.question}</p>
          <div className="pbee_event_overview_offcanvas_header_desc">
            <Image src={bulbIcon} alt="bulb-icon" />
            <p>{questionDetails?.hint}</p>
          </div>
        </div>
      </Fragment>
    );
  };

  const SuccessOffcanvasHeader = () => {
    return (
      <Offcanvas.Header>
        <Image src={vectorBarImg} fluid />
        <Offcanvas.Title>{respMsg}</Offcanvas.Title>
      </Offcanvas.Header>
    );
  };

  function yourInvestCalc(sliderQty) {
    let investmentCal = eventDetails?.minimum * sliderQty;
    return investmentCal;
  }

  const calculateCommission = (optionInd, sliderQty) => {
    const commissionPer = eventDetails?.commission;
    const commission =
      ((expectedReturncode(optionInd, sliderQty) - yourInvestCalc(sliderQty)) /
        100) *
      commissionPer;
    return commission.toFixed(2);
  };

  function expectedReturncode(optionInd, sliderQty) {
    //input
    const optionObj = eventDetails?.options[optionInd];
    let totalSelectQty = Number(optionObj.bet_qty) + Number(sliderQty);
    let userAmount = yourInvestCalc(sliderQty);
    let totalLossAmount =
      eventDetails?.total_bet_amount != 0
        ? eventDetails?.total_bet_amount - optionObj.bet_amount
        : 0;
    let creatorCommission = eventDetails?.ugc_creater_commission
      ? eventDetails?.ugc_creater_commission
      : 0;
    let benefitAmount =
      totalLossAmount *
      (1 - (eventDetails?.commission + creatorCommission) / 100);
    let potentialAmount =
      (sliderQty / totalSelectQty) * benefitAmount + userAmount;
    return potentialAmount.toFixed(2);
  }

  const getOptionValue = (ind) => {
    return optionsState.length > 0 ? optionsState[ind].percent : 0;
  };

  const handleCardClick = () => {
    if (cardFor === "home") {
      utils.mixPannelEvent(
        "click_home_page_question_details",
        "CLICKED_HOME_PAGE_QUESTION_DETAILS ",
        "click_home_page_question_details"
      );
    }
    if (categoryAnsButton === "catgory") {
      utils.mixPannelEvent(
        "click_category_page_answer_button",
        "CLICKED_CATEGORY_PAGE_ANS_BUTTONN ",
        "click_category_page_answer_button"
      );
    }
  };

  const handleClickCardFor = () => {
    if (cardFor === "catgory") {
      utils.mixPannelEvent(
        "clickQuestionDetailevent",
        "CLICKED_CATEGORY_QUESTION_CARD",
        "clickQuestionDetailevent"
      );
    }
    if (cardFor === "questionDetail") {
      utils.mixPannelEvent(
        "clickevetnscreenQuestion",
        "CLICKED_EVENT_SCREEN_QUESTION",
        "clickevetnscreenQuestion"
      );
    }
  };

  const handleEditQuantity = () => {
    setEditQuantity(!editQuantity);
    setQuanityVal(1);
  };

  const handleEditQuantityChange = (eve) => {
    // // console.log("questionDetails::", questionDetails);
    const { value } = eve.target;
    const regex = /^[1-9\b]+$/;
    // console.log("questionDetails?.max_qty::", questionDetails?.max_qty);
    // eve.preventDefault();
    if (questionDetails?.max_qty >= Number(value)) {
      if (value === "" || regex.test(value)) {
        setQuanityVal(value);
        handleChangeQuantity(eve);
      }
    } else {
      // utils.showErrMsg("Maximum quantity is exceed");
      console.log("Maximum quantity is exceed");
      return false;
    }

    // const regex = /^[0-9\b]+$/;
    // if (value === "" || regex.test(value)) {
    //   setQuanityVal(value);
    // }
  };

  // const loadBalance = async () => {
  //   // const endpoint = await getHttpEndpoint({
  //   //   network: "testnet",
  //   // });
  //   // const tonweb = new TonWeb(new TonWeb.HttpProvider(endpoint));
  //   const tonweb = new TonWeb(
  //     new TonWeb.HttpProvider(`${toncenterTestpoint}/api/v2/jsonRPC`, {
  //       apiKey: process.env.REACT_APP_TONCENTER_API_KEY,
  //     })
  //   );
  //   const balance = await tonweb.getBalance(wallet.account.address);
  //   // console.log(`Balance: ${TonWeb.utils.fromNano(balance)} TON`);
  //   setBalance(TonWeb.utils.fromNano(balance));
  // };

  // useEffect(() => {
  //   const handleChange = async () => {
  //     await loadBalance();
  //   };
  //   if (mounted) {
  //     handleChange();
  //   }
  // }, [mounted]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Fragment>
      {/* <TransactionHash transaction={transaction} /> */}
      <Card onClick={handleClickCardFor} className="pbee_question_card">
        <div className="pbee_question_card_header">
          <div className="pbee_question_card_heading">
            {cardFor === "home" || cardFor === "catgory" ? (
              <div className="pbee_question_card_category_img">
                <img
                  width={20}
                  height={20}
                  src={questionDetails?.category_icon}
                />
                <span>{questionDetails?.category_name}</span>
              </div>
            ) : (
              ""
            )}
            <div className="pbee_question_card_expire">
              <p>
                {utils.scheduleicon(20, 20, "#fff")}{" "}
                {utils.timeCalculation(questionDetails?.end_time)}
              </p>
            </div>
            <div className="pbee_question_card_participants">
              <p className="text-end d-flex align-items-center justify-content-end gap-2">
                {utils.visibleicon(20, 20, "#000")}{" "}
                {questionDetails?.participants}
              </p>
            </div>
          </div>
        </div>
        <Card.Body>
          <div className="pbee_question_card_body">
            {cardFor === "home" || cardFor === "catgory" ? (
              <Link
                to={
                  cardFor === "catgory"
                    ? `${questionDetails?.id}`
                    : `${Routeconst.CATEGORIES}/${questionDetails?.category_id}/${questionDetails?.id}`
                }
              >
                <p>{questionDetails?.question}</p>
              </Link>
            ) : (
              <p>{questionDetails?.question}</p>
            )}
            <div className="pbee_question_hint">
              {utils.lightbulb()}
              <p>{questionDetails?.hint}</p>
            </div>
            <div className="pbee_question_sec">
              {questionDetails?.options?.map((e, i) => {
                return (
                  <Fragment key={i}>
                    <Progress
                      label={e?.option}
                      onClick={() => {
                        handleBetToggleShow(e, i);
                        handleCardClick();
                      }}
                      // percent={e?.bet_amount}
                      variant={"transparent"}
                      className={e.user_bet ? "user_bet_active" : ""}
                    />
                  </Fragment>
                );
              })}
            </div>

            {/* <button onClick={() => tonConnectUI.sendTransaction(transaction)}>
                Send transaction
            </button> */}

            {(cardFor === "home" || cardFor === "catgory") && (
              <div className="d-flex justify-content-between pearbee_total_invest_sec">
                <p>
                  You Invested : &nbsp;{" "}
                  <span>
                    {/* {utils.coinIcon(15, 15)} */}
                    {questionDetails?.investment_amount}
                  </span>
                </p>
                <p>
                  Total Investment : &nbsp;
                  <span>
                    {/* {utils.coinIcon(15, 15)} */}
                    {questionDetails?.total_bet_amount}
                  </span>
                </p>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>

      <OffCanvasCommon
        offcanvasHeader={<OffcanvasHeader />}
        placement="bottom"
        show={show}
        onHide={handleBetToggleHide}
        className="event_overview_offcanvas"
      >
        <div className="event_overview_offcanvas_wrapper">
          <div className="pbee_question_sec pbee_question_offcanvas">
            {optionsState?.map((e, i) => {
              return (
                <div className="pbee_question_progress_sec" key={i}>
                  <Progress
                    label={`${e?.option} ${e.percent}`}
                    onClick={() => handleBetToggleShow(e, i)}
                    percent={e.percent}
                    className={
                      selectedOption === e?.id ? "pearbee_ans_selected" : ""
                    }
                  />
                  {/* <span className="pearbee_calculate_percent">
                    {`${e.percent} %`}
                  </span> */}
                </div>
              );
            })}
          </div>
          <div className="pbee_event_overview_quantity">
            <div className="pbee_event_overview_qty_header">
              <p>Quantity</p>
              <div className="pbee_event_overview_quantity-rhs">
                {/* <input
                  type="text"
                  onChange={handleEditQuantityChange}
                  // max={String(questionDetails?.max_qty)}
                  value={quantityVal}
                  // max={10}
                  // maxLength={3}
                  pattern="[0-9]*"
                /> */}
                {editQuantity ? (
                  <input
                    type="text"
                    onChange={handleEditQuantityChange}
                    // max={String(questionDetails?.max_qty)}
                    value={quantityVal}
                    // max={10}
                    // maxLength={3}
                    // pattern="[0-9]*"
                  />
                ) : (
                  <span>{qty}</span>
                )}

                <Image
                  src={editicon}
                  alt="edit"
                  width={8}
                  height={8}
                  onClick={handleEditQuantity}
                />
              </div>
            </div>

            <Form.Range
              value={qty}
              // onChange={(e) => setQty(e.target.value)}
              onChange={handleChangeQuantity}
              max={eventDetails?.max_qty}
              min={1}
              className="range-slider"
            />
          </div>
          <div className="pbee_event_overview_investment_block">
            <div className="investment_lhs">
              <span>{investment?.toFixed(2)}</span>
              <p>Your Investment</p>
            </div>
            <div className="investment_rhs">
              <span>
                {/* {getUptoVal + investment} */}
                {getUptoVal}
              </span>
              <p className="gap-1 d-flex">
                You Get Upto <span>₹</span>
                {/* <img src={coinImg} alt="coin-img" width={14} height={14} /> */}
              </p>
            </div>
          </div>
          <Button
            variant="dark"
            onClick={handleConfirmBetTon}
            disabled={loading}
            className="pbee_event_overview_offcanvas-btn"
          >
            {loading ? <SubmitLoading /> : "Submit"}
          </Button>
        </div>
        <div className="event_overview_offcanvas_footer">
          <p>
            Commisions: {`${eventDetails?.commission} % `}
            {/* {`${commission} %`}  */}
            of lost prediction amount are charged as commission
          </p>
          <p>Available Balance : {Number(balance)?.toFixed(2)}</p>
        </div>
      </OffCanvasCommon>

      {/* success */}
      <OffCanvasCommon
        show={successShow}
        onHide={handleSuccessShow}
        placement="bottom"
        className="event_success_offcanvas"
        offcanvasHeader={<SuccessOffcanvasHeader />}
      >
        {utils.successfullyicon(74, 74)}
        <p>Trade confirmed</p>

        {/* <Button onClick={handleSuccessShow} variant="dark">
          See trade in Portfolio
        </Button> */}
      </OffCanvasCommon>

      {/* error */}
      <ModalCommon
        show={errorShow}
        onHide={handleErrorToggle}
        className="event_success_offcanvas"
        centered={true}
      >
        <div className="event_error_show_wrap">
          <h2>{respMsg}</h2>
          <Button onClick={handleErrorToggle} variant="dark">
            Close
          </Button>
        </div>
      </ModalCommon>
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    reloadWalletAction: (reloadWallet) =>
      dispatch(reloadWalletAction(reloadWallet)),
    reloadApiAfterBetAction: (reloadApi) =>
      dispatch(reloadApiAfterBetAction(reloadApi)),
  };
};

export default connect(null, mapDispatchToProps)(QuestionCard);
