import React, { Fragment, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import * as Routeconst from "../../../routes/routes";
import { utils } from "core/helper";
import OffCanvasCommon from "components/common/offcanvas";
import vectorBarImg from "assets/images/Vector 2491.png";
import ImageFallback from "components/common/image-fallback";
import MobileMenu from "components/common/mobileMenu";
import Breadcrumb from "components/common/breadcrumb";

const InviteEarn = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleNavigate = () => {
    navigate(Routeconst.SETTING_INVITE_YOURS);
  };

  const OffcanvasHeader = () => {
    return (
      <Fragment>
        <ImageFallback src={vectorBarImg} />
        <div>
          <h4>Your Code</h4>
          <h2>Jim678</h2>
        </div>
        <Button variant="dark">Invite Now</Button>
      </Fragment>
    );
  };

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 1000);
  }, []);

  return (
    <div className="page_container" id="invite_earn">
      <Breadcrumb title="Invite & Earn" className="invite_earn_header"/>

      <Container className="invite_earn_container">
        <h1>Earn 100 GOLD on every referral</h1>

        <div className="inviteEarn_card">
          <div className="d-flex justify-content-between align-items-center">
            <h4>
              Total Coins earned via Referral
            </h4>
            <h2>500</h2>
          </div>
          <div
            className="d-flex justify-content-between align-items-center"
            onClick={handleNavigate}
            style={{ cursor: "pointer" }}
          >
            <h4 className="inviteEarn_card_head-2">My Invites</h4>
            <Button variant="transparent">{utils.rightarrow(13, 13)}</Button>
          </div>
        </div>
      </Container>

      <OffCanvasCommon
        className="invite_offcanvas"
        offcanvasHeader={<OffcanvasHeader />}
        close={false}
        show={show}
        onHide={handleClose}
        placement="bottom"
      >
        <div>
          <h2>How it works</h2>
          <div className="pbee_how_it_works">
            <div className="d-flex align-items-center gap-2">
              <span>1</span>
              <p>Invite your Friends to PearBee</p>
            </div>
            <div className="d-flex align-items-center gap-2">
              <span>2</span>
                <p>Get 100 Gold, on sign up,</p>
            </div>
          </div>
        </div>
      </OffCanvasCommon>
    </div>
  );
};

export default InviteEarn;
