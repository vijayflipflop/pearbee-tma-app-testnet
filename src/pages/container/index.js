import { lazy, Suspense, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
// import { useSearchParams } from "react-router-dom";
import { connect, useSelector } from "react-redux";
// import axios from "axios";
import mixpanel from "mixpanel-browser";
import {
  loginAction,
  userWalletActions,
} from "core/redux/account/account.action";
import { localStorage, utils } from "core/helper";
import { GET_USER_BAL, PEARBEE_VERIFY } from "core/service/api.url.service";
import { services } from "core/service";
// import NotFound from "components/common/not-found";
import { Loading } from "components/common/loading";

const PostLogin = lazy(() => import("../postlogin"));
const Prelogin = lazy(() => import("../prelogin"));

const Container = (props) => {
  const { loginAction, userWalletActions } = props;
  const isLoggedIn = useSelector((state) => state.account?.authUser);
  // const token = useSelector((state) => state.account?.token);
  // console.log("token::", token);
  console.log("isLoggedIn::", isLoggedIn);
  const authUser = useSelector((state) => state?.account?.authUser);
  // console.log("authUser::", authUser);
  const reloadWallet = useSelector((state) => state.account?.reloadWallet);

  const [isComponentMounted, setComponentMounted] = useState(false);
  // const [getTokenParams] = useSearchParams();
  // const [validateToken, setValidateToken] = useState(false);
  // const [verifyLoading, setVerifyLoading] = useState(false);

  let tokenId = process.env.REACT_APP_MIX_PANEL; // mix-panel-tokenid
  mixpanel.init(tokenId, {
    debug: false,
    track_pageview: true,
    persistence: "localStorage",
    userId: authUser?.data?.userId,
  });

  // let tokenUrl = getTokenParams.get("token");
  // let refreshTokenUrl = getTokenParams.get("refreshToken");

  // const loadPearbeeVerfify = async (token, refreshToken) => {
  //   try {
  //     // const category = await Services.post(`${CATEGORYBYID}${id}`);
  //     setVerifyLoading(true);
  //     let urlPlbOrVeeraCheck = PEARBEE_VERIFY;
  //     const authUrl = process.env.REACT_APP_API_URL + urlPlbOrVeeraCheck;
  //     const resp = await axios.get(authUrl, {
  //       headers: {
  //         Token: token,
  //       },
  //     });
  //     if (resp?.status) {
  //       const { data } = resp;
  //       loginAction({
  //         isLoggedIn: true,
  //         token: data.jwt_token,
  //         authUser: data,
  //       });
  //       setValidateToken(true);
  //       setVerifyLoading(false);
  //     } else {
  //       setValidateToken(false);
  //       setVerifyLoading(false);
  //     }
  //   } catch (err) {
  //     setValidateToken(false);
  //     setVerifyLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (isComponentMounted) {
  //     let token = getTokenParams.get("token");
  //     if (!isLoggedIn && (refreshToken || token)) {
  //       loadPearbeeVerfify(token, refreshToken);
  //     }
  //   }
  // }, [getTokenParams, isLoggedIn, isComponentMounted]);

  // useEffect(() => {
  //   const handleChange = async () => {
  //     await getUserBalance();
  //   };
  //   if (isLoggedIn) {
  //     handleChange();
  //   }
  // }, [isLoggedIn, reloadWallet]);

  useEffect(() => {
    setComponentMounted(true);
  }, []);

  const checkSessionlogin = async () => {
    const token = localStorage.getAuthToken();
    console.log("token", token);
    if (token === "") {
      return false;
    }
    const authUser = localStorage.getAuthUser();
    console.log("authUser::", authUser);
    loginAction(authUser);
  };

  useEffect(() => {
    checkSessionlogin();
  }, []);

  // useEffect(() => {
  //   const handleChange = async () => {
  //     utils.mixPannelEvent("home_page", "HOME_PAGE", "home_page");
  //   };
  //   if (isComponentMounted) {
  //     handleChange();
  //   }
  // }, [isComponentMounted]);

  // const getUserBalance = async () => {
  //   const resp = await services.get(GET_USER_BAL);
  //   if (resp?.result) {
  //     userWalletActions(resp?.result?.[0]);
  //   }
  // };

  const LoadFallback = () => {
    return (
      <div className="pearbee_fallback_loading_wrap">
        <Loading variant="light" />
      </div>
    );
  };

  // useEffect(() => {
  //   if (isLoggedIn && (tokenUrl || refreshTokenUrl)) {
  //     console.log("delte call");
  //     getTokenParams.delete("token");
  //     getTokenParams.delete("refreshTokenUrl");
  //   }
  // }, [tokenUrl, refreshTokenUrl, isLoggedIn]);

  return (
    <div
      data-typography="poppins"
      data-theme-version="light"
      data-layout="vertical"
      data-nav-headerbg="color_1"
      data-headerbg="color_1"
      data-sidebar-style="full"
      data-sibebarbg="color_1"
      data-sidebar-position="fixed"
      data-header-position="fixed"
      data-container="wide"
      direction="ltr"
      data-primary="color_1"
      data-sibebartext="color_1"
    >
      <Suspense fallback={<LoadFallback />}>
        {/* {!isLoggedIn && verifyLoading && <LoadFallback />} */}
        {/* {!isLoggedIn && <PostLogin />} */}
        {/* {(!tokenUrl || !refreshTokenUrl) && !validateToken && <NotFound />} */}
        {isLoggedIn && (
          <div className="after-login">
            <PostLogin />
          </div>
        )}
        {!isLoggedIn && <Prelogin />}
      </Suspense>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginAction: (authUser) => dispatch(loginAction(authUser)),
    userWalletActions: (wallet) => dispatch(userWalletActions(wallet)),
  };
};

export default connect(null, mapDispatchToProps)(Container);
