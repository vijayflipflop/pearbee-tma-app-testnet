import { utils } from "core/helper";
import React from "react";
import { Link } from "react-router-dom";
import * as Routeconst from "pages/routes/routes";
import { useLocation } from "react-router-dom";

const MobileMenu = () => {
  const location = useLocation();
  return (
    <div className="bottom_navbar">
      <ul className="d-flex justify-content-between align-items-center">
        <li>
          <Link
            to={Routeconst.DASH_PATH}
            className={`${
              location.pathname === Routeconst.DASH_PATH
                ? "bottom_navbar_link_active"
                : "bottom_navbar_link"
            }`}
          >
            {location.pathname === Routeconst.DASH_PATH
              ? utils.regularActivePlayIcon(24, 24)
              : utils.regularIcon(24, 24)}
            Regular Play
          </Link>
        </li>
        <li>
          <Link
            to={Routeconst.ASK}
            className={`${
              location.pathname === Routeconst.ASK
                ? "bottom_navbar_link_active"
                : "bottom_navbar_link"
            }`}
          >
            {location.pathname === Routeconst.ASK
              ? utils.askActiveIcon(24, 24)
              : utils.askIcon(24, 24)}
            Ask
          </Link>
        </li>
        {/* <li>
          <Link
            to={Routeconst.IPL}
            className={`${
              location.pathname === Routeconst.IPL
                ? "bottom_navbar_link_active"
                : "bottom_navbar_link"
            }`}
          >
            {location.pathname === Routeconst.IPL
              ? utils.iplActiveIcon(24, 24)
              : utils.iplSportsIcon(24, 24)}
            IPL 2024
          </Link>
        </li> */}
        <li>
          <Link
            to={Routeconst.MY_PORTFOLIO}
            className={`${
              location.pathname === Routeconst.MY_PORTFOLIO
                ? "bottom_navbar_link_active"
                : "bottom_navbar_link"
            }`}
          >
            {location.pathname === Routeconst.MY_PORTFOLIO
              ? utils.portfolioActiveIcon(24, 24)
              : utils.portfolioIcon(24, 24)}
            My Portfolio
          </Link>
        </li>
        <li>
          <Link
            to={Routeconst.SETTING}
            className={`${
              location.pathname === Routeconst.SETTING
                ? "bottom_navbar_link_active"
                : "bottom_navbar_link"
            }`}
          >
            {location.pathname === Routeconst.SETTING
              ? utils.settingActiveIcon(24, 24)
              : utils.settingIcon(24, 24)}
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MobileMenu;
