import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  LOGIN_PATH,
  OTP_PATH,
  PRE_LOGIN_PATH,
  UNKNOWN_PATH,
} from "pages/routes/routes";
import { Spinner } from "react-bootstrap";

const Login = lazy(() => import("./login"));
const OTP = lazy(() => import("./otp"));

const Prelogin = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route
          path={PRE_LOGIN_PATH}
          element={<Navigate replace to={LOGIN_PATH} />}
        />
        <Route
          path={UNKNOWN_PATH}
          element={<Navigate replace to={LOGIN_PATH} />}
        />
        <Route path={LOGIN_PATH} element={<Login />} />
        <Route path={OTP_PATH} element={<OTP />} />
      </Routes>
    </Suspense>
  );
};

export default Prelogin;
