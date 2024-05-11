import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as Routeconst from "../../../routes/routes";
import { utils } from "core/helper";

const ComingSoon = () => {
  return (
    <div className="support-container">
      <div className="d-flex align-items-center gap-3 page-header">
        <Link to={Routeconst.SETTING}>
          {utils.arrowback(27, 18)}
        </Link>
      </div>

      <Container className="reachUs-container">
        <div>
          <h2 className="reachUs-title">Coming Soon...</h2>
        </div>
      </Container>
    </div>
  );
};

export default ComingSoon;
