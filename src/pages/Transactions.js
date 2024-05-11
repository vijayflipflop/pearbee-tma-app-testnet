import React from "react";
import { Container } from "react-bootstrap";
import { utils } from "utils";

const Transactions = () => {
  return (
    <div className="transaction-container">
      <Container>
        <div className="d-flex align-items-center gap-3">
          {utils.arrowback(27, 18)}
          <h1 className="transaction-header">Transaction History</h1>
        </div>
      </Container>
    </div>
  );
};

export default Transactions;
