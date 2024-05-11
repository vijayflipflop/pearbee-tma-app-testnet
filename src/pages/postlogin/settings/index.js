import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { utils } from "core/helper";
import walletImg from "assets/images/Setting-Img/wallet.png";
import termsConditionImg from "assets/images/Setting-Img/termscondition.png";
import privacyPolicyImg from "assets/images/Setting-Img/privacypolicy.png";
import FAQImg from "assets/images/Setting-Img/faq.png";
import supportImg from "assets/images/Setting-Img/support.png";
import referEarnImg from "assets/images/Setting-Img/referearn.png";
import logOutImg from "assets/images/Setting-Img/logout.png";
import { logoutAction } from "core/redux/account/account.action";
import * as Routeconst from "pages/routes/routes";
import Breadcrumb from "components/common/breadcrumb";
import MobileMenu from "components/common/mobileMenu";
import { useTonConnectUI } from "@tonconnect/ui-react";

const SettingsMenuData = [
  {
    id: 1,
    menuImg: walletImg,
    code: 10,
    label: "Wallet",
  },
  {
    id: 2,
    menuImg: termsConditionImg,
    code: 20,
    label: "Terms & Condition",
  },
  {
    id: 3,
    menuImg: privacyPolicyImg,
    code: 30,
    label: "Privacy Policy",
  },
  {
    id: 4,
    menuImg: FAQImg,
    code: 40,
    label: "FAQ",
  },
  {
    id: 5,
    menuImg: supportImg,
    code: 50,
    label: "Support",
  },
  {
    id: 6,
    menuImg: referEarnImg,
    code: 60,
    label: "Refer & Earn",
  },
  {
    id: 7,
    menuImg: referEarnImg,
    code: 80,
    label: "Leaderboard",
  },
  {
    id: 7,
    menuImg: logOutImg,
    code: 70,
    label: "Log out",
  },
];

const Settings = (props) => {
  const { logoutAction } = props;
  const authUser = useSelector((state) => state.account?.authUser);
  const navigate = useNavigate();
  const [tonConnectUI] = useTonConnectUI();

  const handleNavigate = async (data) => {
    if (data.code === 60) {
      navigate(Routeconst.SETTING_INVITE);
    } else if (data.code === 50) {
      navigate(Routeconst.SETTING_SUPPORT);
    } else if (data.code === 10) {
      navigate(Routeconst.SETTING_WALLET);
    } else if (data.code === 20) {
      navigate(Routeconst.SETTING_TERM);
    } else if (data.code === 30) {
      navigate(Routeconst.SETTING_PRIVACY);
    } else if (data.code === 40) {
      navigate(Routeconst.SETTING_FAQ);
    } else if (data.code === 80) {
      navigate(Routeconst.LEADERBOARD);
    } else if (data.code === 70) {
      logoutAction();
      await tonConnectUI.disconnect();
    }
  };

  return (
    <div className="page_container">
      <Breadcrumb
        title="Settings"
        isCoin={false}
        fluid={true}
        className="settings_header"
      />

      <div className="add_email_class">
        <div>
          <h3>Signed in as</h3>
          <h1>{authUser.mobile}</h1>
        </div>

        <Button variant="secondary">
          {utils.addicon(12.04, 12.44)} Add Email
        </Button>
      </div>

      <Container>
        <Row>
          <Col md={12}>
            <div className="menu_container">
              {SettingsMenuData.map((data, index) => (
                <Button
                  variant={"transparent"}
                  className="settings-btn"
                  onClick={() => handleNavigate(data)}
                  key={index}
                >
                  <div className="d-flex align-items-center gap-3">
                    <img src={data.menuImg} alt={data.label} />
                    {data.label}
                  </div>
                  {utils.rightarrowbig(12, 24)}
                </Button>
              ))}
              <div className="settings_footer_container">
                <div>
                  <h1>PearBee</h1>
                  <h1>V 2.8.1</h1>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <MobileMenu activeMenu={"settings"} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutAction: (authUser) => dispatch(logoutAction(authUser)),
  };
};

export default connect(null, mapDispatchToProps)(Settings);
