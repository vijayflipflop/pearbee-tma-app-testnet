import React, { useState } from "react";
import { Button, Container, Form, Image, Modal } from "react-bootstrap";
import { IoArrowBack } from "react-icons/io5";
import OtpInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import bonusImg from "assets/images/Bonus-Image.png";
import { services } from "core/service";
import { utils } from "core/helper";
import { DASH_PATH } from "pages/routes/routes";
import { LOGIN_URL } from "core/service/api.url.service";
import { loginAction } from "core/redux/account/account.action";
import { connect } from "react-redux";
import ModalCommon from "components/common/modal";

const ValidateOtp = (props) => {
  const { loginAction } = props;
  const [error, setError] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleOtpVerification = (e) => {
    e.preventDefault();
    const enteredOTP = otp.join("");
    if (!/^\d{6}$/.test(enteredOTP)) {
      setError("Incorrect OTP");
    } else {
      setError("");
      handleShow();
    }
  };

  const handleOtpChange = (otpValue) => {
    const sanitizedOtp = otpValue.replace(/\D/g, "");
    setOtp(sanitizedOtp.split("").slice(0, 6));
  };

  const otpDisabled = otp.length !== 6 || otp.some((val) => val === "");

  const handleKeyDown = async (e) => {
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
      return false;
    }
    try {
      setLoading(true);
      const payload = {
        countrycode: "+91",
        mobile: "",
      };
      const resp = await services.post(LOGIN_URL, payload);
      const { data, message } = resp;
      if (resp?.status) {
        loginAction({
          isLoggedIn: true,
          token: data.token,
          authUser: data,
          coin: 1,
        });
        utils.showSuccessMsg(message);
        navigate(DASH_PATH);
        setLoading(false);
      } else {
        utils.showErrMsg(message);
        setLoading(false);
      }
    } catch (err) {
      throw err;
    }
  };

  const renderInput = (inputProps, index) => (
    <input {...inputProps} key={index} onKeyDown={handleKeyDown} />
  );

  return (
    <div className="signUp-class position-relative">
      {/* <IoArrowBack className="arrow-back-icon" onClick={() => navigate("/")} /> */}
      <Link to="/">{utils.arrowback(24, 24)}</Link>

      <Container className="p-4 p-sm-5">
        <Form onSubmit={handleOtpVerification} className="form">
          <div className="input-container">
            <h4 className="heading">Verify Phone</h4>
            <p className="sub-heading">OTP has been sent to 9876543210</p>

            <div className="mt-5">
              <OtpInput
                value={otp.join("")}
                onChange={handleOtpChange}
                numInputs={6}
                isInputNum
                inputStyle={{
                  width: "40px",
                  height: "50px",
                  fontSize: "20px",
                  borderRadius: "5px",
                  border: "1px solid #4a4a4a",
                  backgroundColor: "#2c2c2c",
                  color: "#FFFFFF",
                  margin: "0px 5px",
                  fontFamily: "lato",
                }}
                renderInput={renderInput}
              />
              {error && <p className="error-msg mt-3">{error}</p>}
            </div>
            <p className="resend-otp mt-4">
              Resend OTP in <span className="resend-time">12 sec</span>
            </p>
          </div>

          <div className="footer-container">
            <Button type="submit" disabled={otpDisabled} className="btn-verify">
              Verify
            </Button>
          </div>
        </Form>
      </Container>
      <ModalCommon show={show} onHide={handleClose} centered={true}>
        <div>
          <Image
            src={bonusImg}
            alt="Bonus-img"
            fluid
            width={"160px"}
            height={"160px"}
          />
        </div>
        <div>
          <h1 className="text-center">Sign up Bonus of</h1>
          <h1>250 COINS</h1>
          <p>Credited to your Wallet</p>
        </div>
      </ModalCommon>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginAction: (authUser) => dispatch(loginAction(authUser)),
  };
};

export default connect(null, mapDispatchToProps)(ValidateOtp);
