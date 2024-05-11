import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row, Tab, Tabs, Nav } from "react-bootstrap";
// import { utils } from "core/helper";
// import { services } from "core/service";
// import {
//   DEPOSIT_TRANSACTIONS,
//   TRANSACTIONS,
//   WITHDRAW_TRANSACTIONS,
// } from "core/service/api.url.service";
// import { Loading } from "components/common/loading";
// import moment from "moment";
import Breadcrumb from "components/common/breadcrumb";
import { transactionLinks } from "core/helper/constant";
import AllTransactions from "components/transaction/account";
// import BonusTransaction from "components/transaction/bonus";
import WinningsTransactions from "components/transaction/winnings";

const Transactions = () => {
  const [eventKey, setEventKey] = useState("account");

  const handleChangeEvent = (key) => {
    setEventKey(key);
  };

  const transactionType = (type) => {
    switch (type) {
      case "Debit":
        return "transaction_dec";
      case "Credit":
        return "transaction_inc";
      default:
        return "transaction_inc";
    }
  };

  return (
    <div className="page_container">
      <Container className="transaction_container">
        <Breadcrumb
          title="Transactions"
          isCoin={false}
          className="transaction_navbar"
        />
        <Tab.Container defaultActiveKey={"account"}>
          <Nav>
            {transactionLinks.map((e, i) => (
              <Nav.Item key={i}>
                <Nav.Link
                  onClick={() => handleChangeEvent(e.value)}
                  eventKey={e.value}
                >
                  {e.label}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
          <Tab.Content>
            {eventKey === "account" && (
              <Tab.Pane eventKey="account">
                <AllTransactions />
              </Tab.Pane>
            )}
            {/* {eventKey === "bonus" && (
              <Tab.Pane eventKey="bonus">
                <BonusTransaction />
              </Tab.Pane>
            )} */}
            {eventKey === "winnings" && (
              <Tab.Pane eventKey="winnings">
                <WinningsTransactions />
              </Tab.Pane>
            )}
          </Tab.Content>
        </Tab.Container>
      </Container>
    </div>
  );
};

export default Transactions;
