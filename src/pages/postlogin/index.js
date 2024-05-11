import { Suspense, lazy } from "react";
import ProtectedRoutes from "pages/routes/protectedroutes";
import { Routes, Route } from "react-router-dom";
import * as Routeconst from "pages/routes/routes";
import { Spinner } from "react-bootstrap";
import { Loading } from "components/common/loading";

const Category = lazy(() => import("./category"));
const CategoryQuestionOverview = lazy(() => import("./category-question-overview"));
const ComingSoon = lazy(() => import("./settings/comingsoon"));
const YourInvites = lazy(() => import("./settings/invite/your-invites"));
const Support = lazy(() => import("./settings/support"));
const InviteEarn = lazy(() => import("./settings/invite"));
const Transactions = lazy(() => import("./transaction"));
const Settings = lazy(() => import("./settings"));
const Dashboard = lazy(() => import("./dashboard"));
const UGC = lazy(() => import("./ugc"));
const Ask = lazy(() => import("./ugc-ask"));
const IPL = lazy(() => import("./ipl"));
const IPL_TRIVIZHA = lazy(()=>import("./ipl/ipl-trivizha"))
const IPL_TRIVIZHA_VIDEO = lazy(()=>import("./ipl/ipl-trivizha-video"))
const MY_PORTFOLIO = lazy(() => import("./portfolio"));
const SettingWallet = lazy(() => import("./settings/wallet"));
const SettingTerms = lazy(() => import("./settings/terms-condition"));
const SettingPrivacy = lazy(() => import("./settings/privacy"));
const SettingFAQ = lazy(() => import("./settings/faq"));
const LeaderBoard = lazy(()=>import("./leaderboard"))
const Recharge = lazy(()=>import("./recharge"))

const PostLogin = () => {

  const LoadFallback = () => {
    return (
      <div className="pearbee_fallback_loading_wrap">
        <Loading variant="light" />
      </div>
    );
  };

  return (
    <ProtectedRoutes>
      <Suspense fallback={<LoadFallback />}>
        <Routes>
          <Route path={Routeconst.DASH_PATH} element={<Dashboard />} />
          <Route path={Routeconst.CATEGORY_BY_ID_PATH} element={<Category />} />
          <Route path={Routeconst.CATEGORY_QUESTION_OVERVIEW_ID_PATH} element={<CategoryQuestionOverview />} />
          <Route path={Routeconst.UGC} element={<UGC />} />
          <Route path={Routeconst.ASK} element={<Ask />} />
          <Route path={Routeconst.EDIT_ASK_BY_ID} element={<Ask />} />
          {/* <Route path={Routeconst.IPL} element={<IPL />} />
          <Route path={Routeconst.IPL_ROOM_ID} element={<IPL_TRIVIZHA />}/>
          <Route path={Routeconst.IPL_TRIVIZHA_BY_NAME_PATH} element={<IPL_TRIVIZHA_VIDEO />}/> */}
          <Route path={Routeconst.MY_PORTFOLIO} element={<MY_PORTFOLIO />} />
          <Route path={Routeconst.SETTING_WALLET} element={<SettingWallet />} />
          <Route path={Routeconst.SETTING_RECHARGE} element={<Recharge />} />
          <Route path={Routeconst.SETTING_TERMS_CONDITIONS} element={<SettingTerms />} />
          <Route path={Routeconst.SETTING_PRIVACY} element={<SettingPrivacy />} />
          <Route path={Routeconst.SETTING_FAQ} element={<SettingFAQ />} />

          <Route path={Routeconst.SETTING} element={<Settings />} />
          <Route path={Routeconst.SETTING_INVITE} element={<InviteEarn />} />
          <Route
            path={Routeconst.SETTING_INVITE_YOURS}
            element={<YourInvites />}
          />
          <Route path={Routeconst.SETTING_SUPPORT} element={<Support />} />
          <Route path={Routeconst.SETTING_WALLET} element={<ComingSoon />} />
          <Route path={Routeconst.SETTING_TERM} element={<ComingSoon />} />
          <Route path={Routeconst.SETTING_FAQ} element={<ComingSoon />} />
          <Route path={Routeconst.SETTING_PRIVACY} element={<ComingSoon />} />
          <Route path={Routeconst.TRANSACTION} element={<Transactions />} />
          <Route path={Routeconst.LEADERBOARD} element={<LeaderBoard/>}/>

        </Routes>
      </Suspense>
    </ProtectedRoutes>
  );
};

export default PostLogin;
