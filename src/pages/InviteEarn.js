import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import OffCanvasCard from "../components/OffCanvasCard";
import { utils } from "utils";

const InviteEarn = () => {
  return (
    <div className="page-container">
      <div className="d-flex align-items-center gap-3 page-header">
        <Link to="/setting">{utils.arrowback(27, 18)}</Link>

        <h1>Invite & Earn</h1>
      </div>
      <Container className="my-4">
        <h3 className="inviteEarn-title">
          Earn 300 GOLD + 10 PLATINUM on every referral
        </h3>

        <div className="inviteEarn-card">
          <div className="d-flex justify-content-between align-items-center py-2">
            <h6 className="inviteEarn-card-head-1">
              Total Coins earned via Referral
            </h6>
            <p>500</p>
          </div>
          <div className="d-flex justify-content-between align-items-center py-2">
            <h6 className="inviteEarn-card-head-2">My Invites</h6>
            <Button variant="transparent btn-card-invite">
              {utils.rightarrow(13, 13)}
            </Button>
          </div>
        </div>
      </Container>

      <OffCanvasCard />
    </div>
  );
};

export default InviteEarn;
