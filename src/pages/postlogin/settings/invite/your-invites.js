import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { YourInvitesData } from "data/YourInvitesData";
import * as Routeconst from "../../../routes/routes";
import { utils } from "core/helper";
import Breadcrumb from "components/common/breadcrumb";

const YourInvites = () => {

  return (
    <div className="page_container">
      <Breadcrumb title="Your Invites" className="yourInvite_header"/>

      <Container className="yourInvite_container">
        {YourInvitesData.map((data) => (
          <div key={data.id} className="invites_card">
            <div>
              <h4>{data.phoneNo}</h4>
              <p>{data.date}</p>
            </div>
            <h2>{data.amount}</h2>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default YourInvites;
