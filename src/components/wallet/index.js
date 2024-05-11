import ProfileImageFallback from "components/common/profile-image-fallback";
import { services } from "core/service";
import { GET_USER_BAL } from "core/service/api.url.service";
import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { utils } from "core/helper";
import * as Routeconst from "pages/routes/routes";
import { useSelector } from "react-redux";

const WalletScreen = () => {
  const wallet = useSelector((state) => state.account?.wallet);

  const handleClickedRecentTransaction = () => {
    utils.mixPannelEvent(
      "click_recent_transaction_button",
      "CLICKED_RECENT_TRANSACTION",
      "click_recent_transaction_button"
    );
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Col md={6}>
          <div className="pearbee_wallet_wrap">
            <div className="pearbee_wallet_profile_sec">
              <ProfileImageFallback src="profile-image" alt="profile-image" />
              <div>
                <p>Your Balance</p>
                <p>{wallet?.total}</p>
              </div>
            </div>
            <div className="pearbee_wallet_profile_list_wrap">
              <div className="pearbee_wallet_profile_list_sec">
                <div className="pearbee_wallet_profile_deposit">
                  <h5>Deposit</h5>
                  <h4>{wallet?.deposit}</h4>
                </div>
                <div className="d-flex align-items-center">
                  <Link to={Routeconst.SETTING_RECHARGE}>
                    Recharge Now {utils.rightArrowPrimary(15, 15, "#22A5F5")}
                  </Link>
                </div>
              </div>

              <div className="pearbee_wallet_profile_list_sec">
                <h5>Winnings</h5>
                <h4>{wallet?.winnings}</h4>
              </div>
              <div className="pearbee_wallet_profile_list_sec">
                <h5>Promotional Bonus</h5>
                <h4>{wallet?.bonus_win}</h4>
              </div>
            </div>
            <div className="pearbee_wallet_link_sec">
              <Link
                onClick={handleClickedRecentTransaction}
                to={Routeconst.TRANSACTION}
              >
                Recent Transactions
                {utils.rightarrowbig(15, 15)}
              </Link>
              <Link to={Routeconst.TRANSACTION}>
                Withdraw Winnings
                {utils.rightarrowbig(15, 15)}
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default WalletScreen;
