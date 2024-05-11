import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./assets/styles/global.css";
import "./assets/styles/general.css";
import "./assets/styles/home.css";
import "./assets/styles/invite.css";
import "./assets/styles/support.css";
import "./assets/styles/transactions.css";
import "./assets/styles/settings.css";
import "./assets/styles/responsive.css";
import "./assets/styles/event-overview.css";
import "./assets/styles/ask.css";
import "./assets/styles/ugc.css";
import "./assets/styles/portfolio.css";
import "./assets/styles/ipl.css";
import "./assets/styles/ipl-trivizha.css";
import "./assets/styles/leaderboard.css";
import "./assets/styles/wallet.css";
import "./assets/styles/recharge.css";
import "./assets/styles/ipl-v2.css";

import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
