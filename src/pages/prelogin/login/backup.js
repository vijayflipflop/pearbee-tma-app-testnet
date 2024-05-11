// import { Buffer } from 'buffer';
import React, { Fragment, useEffect, useState } from "react";

import { Button, Container, Form, Image, InputGroup } from "react-bootstrap";
import Logo from "assets/images/Logo.png";
import { useNavigate } from "react-router-dom";
import { CONST, utils } from "core/helper";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { getHttpEndpoint } from "@orbs-network/ton-access";
import Services from "core/service/services";
import { DASH_PATH } from "pages/routes/routes";
import { LOGIN_URL } from "core/service/api.url.service";
import { connect } from "react-redux";
import { loginAction } from "core/redux/account/account.action";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import { firebaseAuth } from "core/firebase/setup";
import {
  Account,
  ConnectAdditionalRequest,
  TonProofItemReplySuccess,
} from "@tonconnect/ui";
import {
  TonConnectButton,
  useTonAddress,
  useTonConnectUI,
  useIsConnectionRestored,
  useTonWallet,
} from "@tonconnect/ui-react";

// window.Buffer = window.Buffer || Buffer;

// const TonWeb = require('tonweb');

const validationSchema = Yup.object().shape({
  mobile: Yup.string().label(CONST.MSG.REQ_PHONE_NUM).required(),
});

const Login = (props) => {
  const { loginAction } = props;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [phoneNumVal, setPhonNumVal] = useState("");

  const {
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // const setUpRecaptcha = () => {
  //   window.recaptchaVerifier = new RecaptchaVerifier(
  //     firebaseAuth,
  //     "recaptcha-container",
  //     {
  //       size: "invisible",
  //     }
  //   );
  // };

  const onSubmit = async (values) => {
    const { mobile } = values;
    // if (!window.recaptchaVerifier) {
    //   setUpRecaptcha();
    // }
    // const recaptcha = new RecaptchaVerifier(firebaseAuth, "recaptcha", {});
    // await signInWithPhoneNumber(firebaseAuth, `+91${mobile}`, recaptcha)
    //   .then((resp) => {
    //     utils.showSuccessMsg("Code send to mobile successfully");
    //   })
    //   .catch((err) => {
    //     utils.showErrMsg(err);
    //   });
    // mobileNumberAction({
    //   mobileNumber: mobile,
    // });

    try {
      setLoading(true);
      const payload = {
        countrycode: "+91",
        mobile,
      };
      const resp = await Services.post(LOGIN_URL, payload);
      const { data, message } = resp;
      if (resp?.status) {
        loginAction({
          isLoggedIn: true,
          token: data.token,
          authUser: data,
          coin: 1,
          // refreshToken: data?.refreshToken,
        });
        utils.showSuccessMsg(message);
        reset();
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


  // const handlePhoneChange = (e) => {
  //   const regex = /^[0-9\b]+$/;
  //   if (e.target.value === "" || regex.test(e.target.value)) {
  //     setPhonNumVal(e.target.value);
  //     setValue("mobile", e.target.value, { shouldValidate: true });
  //   }
  // };

  // const handleRefferalChange = (e) => {
  //   if (e.target.value) {
  //     setValue("referred_by", e.target.value, { shouldValidate: true });
  //   }
  // };

  // connect-wallet
  const localStorageKey = "my-dapp-auth-token";
  const payloadTTLMS = 1000 * 60 * 20;
  const baseURL = "https://tma-api.pearbee.com/api";
  const userFriendlyAddress = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();

  const isConnectionRestored = useIsConnectionRestored();
  const wallet = useTonWallet();

  const handleLogoutTonConnect = async () => {
    await tonConnectUI.disconnect();
  };

  useEffect(() => {
    console.log("isConnectionRestored::", isConnectionRestored);
    console.log("wallet::", wallet);

    if (!isConnectionRestored) {
      console.log("isConnectionRestored");
      return;
    }

    // transactionHash()

    // if wallet not available
    if (wallet === null) {
      localStorage.removeItem(localStorageKey);

      const refreshPayload = async () => {
        tonConnectUI.setConnectRequestParameters({ state: "loading" });

        const value = await generatePayload();
        if (!value) {
          tonConnectUI.setConnectRequestParameters(null);
        } else {
          tonConnectUI.setConnectRequestParameters({ state: "ready", value });
        }
      };

      refreshPayload();
      setInterval(refreshPayload, payloadTTLMS);
      return;
    }

    const token = localStorage.getItem(localStorageKey);
    if (token) {
      console.log("token::", token);
      return;
    }
    console.log(
      "wallet.connectItems?.tonProof::",
      wallet.connectItems?.tonProof
    );


    if (
      wallet.connectItems?.tonProof &&
      !("error" in wallet.connectItems.tonProof)
    ) {
      checkProof(wallet.connectItems.tonProof.proof, wallet.account).then(
        (token) => {
          if (token) {
            console.log("token::", token);
            localStorage.setItem(localStorageKey, token);
            loginAction({
              isLoggedIn: true,
              token: token,
              authUser: {
                token: token
              },
            });
            navigate(DASH_PATH);
            return;
          } else {
            alert("Please try another wallet");
            tonConnectUI.disconnect();
          }
        }
      );
    } else {
      alert("Please try another wallet");
      tonConnectUI.disconnect();
    }
  }, [wallet, isConnectionRestored]);

  const generatePayload = async () => {
    try {
      const response = await (
        await fetch(`${baseURL}/ton-proof/generatePayload`, {
          method: "GET",
        })
      ).json();
      return { tonProof: response.payload };
    } catch (e) {
      console.error(e);
      return;
    }
  };

  const checkProof = async (proof, account) => {
    try {
      const requestBody = {
        address: account.address,
        network: account.chain,
        proof: {
          ...proof,
          state_init: account.walletStateInit,
        },
      };
      const response = await (
        await fetch(`${baseURL}/ton-proof/checkProof`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify(requestBody),
        })
      ).json();

      return response?.data?.authToken;
    } catch (e) {
      console.log(e);
    }
  };

  // const transactionHash = async () => {
  //   console.log("Transaction HAsh");
  //   const endpoint = await getHttpEndpoint({
  //     network: "testnet",
  //   });
  //   const tonweb = new TonWeb(new TonWeb.HttpProvider(endpoint));
  //   const address = '0QBTbD8xsFx0wV8EGzHutuArDBWIRcIJh9r9OPQauGtCO_hv'
  //   const lastTx = (await tonweb.getTransactions(address, 1))[0]
  //   const lastTxHash = lastTx.transaction_id.hash
  //   console.log(lastTx, "Last Tx");
  //   console.log(lastTxHash, "Last Tx Hash");


  //   // const client = new TonClient4({
  //   //   endpoint: 'https://toncenter.com/api/v2/jsonRPC',
  //   // });

  //   // console.log(client.getTransaction('0QBUY1G7M5_Nbu1P_u8XKz6mXs_h9aa5lTkZp4NAmqZ7K'));


  // }

  const getAccountInfo = async (accessToken, account) => {
    return (
      await fetch(`${baseURL}/dapp/getAccountInfo?network=${account.chain}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
    ).json();
  };


  return (
    <Fragment>
      <div className="signUp-class">
        <Container className="p-4 p-sm-5">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="text-center mb-5">
                <Image src={Logo} alt="Logo" fluid />
              </div>
              <div className="d-flex gap-2 justify-content-center">
                <TonConnectButton />
              </div>
              {/* <div className="input-container">
                <h2>Enter Your Mobile Number</h2>
                <p className="sub-heading">We'll send you an OTP</p>

                <div>
                  <div style={{ marginBottom: "60px" }}>
                    <InputGroup
                      className={`${errors.phoneNumber ? "error-input" : ""}`}
                    >
                      <InputGroup.Text id="basic-addon1">+91</InputGroup.Text>
                      <Form.Control
                        value={phoneNumVal}
                        onChange={handlePhoneChange}
                        maxLength={10}
                      />
                    </InputGroup>
                    <p className="error-msg">{errors.mobile?.message}</p>
                  </div>
                  <Form.Group>
                    <Form.Label>Referral Code ? (optional)</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={handleRefferalChange}
                    />
                  </Form.Group>
                </div>
              </div> */}
            </div>
            {/* <div className="form_footer_container">
              <p>
                By continuing, you accept you are 18+ years of age and agree to
                the <br /> Terms and Condition
              </p>

              <Button
                type="submit"
                disabled={loading || !isValid}
                variant="primary"
              >
                Get OTP
              </Button>
            </div> */}
          </Form>
        </Container>
      </div>
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    // mobileNumberAction: (authUser) => dispatch(mobileNumberAction(authUser)),
    loginAction: (authUser) => dispatch(loginAction(authUser)),
  };
};

export default connect(null, mapDispatchToProps)(Login);