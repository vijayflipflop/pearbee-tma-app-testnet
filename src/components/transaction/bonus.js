import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { utils } from "core/helper";
import { services } from "core/service";
import { DEPOSIT_TRANSACTIONS } from "core/service/api.url.service";
import { Loading } from "components/common/loading";
import moment from "moment";

const BonusTransaction = () => {
  const [totalPosts, setTotalPosts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const [visible, setVisible] = useState(0);
  const [page, setPage] = useState(null);

  const depositTransactions = async () => {
    try {
      const resp = await services.get(DEPOSIT_TRANSACTIONS);
      const { status: questionStatus, result: questionResult } = resp || {};
      if (questionStatus) {
        const totalPages = questionResult[0] ? questionResult[0].full_count : 0;
        setTotalPosts(totalPages);
      }
    } catch (error) {
      throw error.message;
    }
  };

  const [isComponentMounted, setComponentMounted] = useState(false);
  useEffect(() => {
    const handleChange = async () => {
      await depositTransactions();
    };
    if (isComponentMounted) {
      setPage(1);
      handleChange();
    }
  }, [isComponentMounted]);

  useEffect(() => {
    setComponentMounted(true);
  }, []);

  const fetchWinningsTranactions = async () => {
    try {
      const resp = await services.get(`${DEPOSIT_TRANSACTIONS}?page=${page}`);
      const {
        status: questionStatus,
        result: questionResult,
        message,
      } = resp || {};
      if (questionStatus) {
        setVisible((prev) => prev + questionResult.length);
        setPosts((prev) => [...prev, ...questionResult]);
        setError(null);
      } else {
        setError(message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (page) {
      fetchWinningsTranactions(page);
    }
  }, [page]);

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
    <div className="transaction_card_group">
      {!isLoading && posts.length === 0 && !error && (
        <div className="pearbee_empty_date_wrap">
          <h5>No Records Found</h5>
        </div>
      )}
      {!isLoading && posts.length === 0 && error && (
        <div className="pearbee_empty_date_wrap">
          <h5>No Records Found</h5>
        </div>
      )}
      {!isLoading &&
        posts.length > 0 &&
        posts.map((e, i) => {
          return (
            <Row key={i}>
              <Col md={10} xs={8}>
                <div className="transaction_sec_content">
                  <p>{e.transaction_name}</p>
                  <span>{moment(e.joined).format("MMMM Do YYYY h:mm")}</span>
                </div>
              </Col>
              <Col md={2} xs={4}>
                <div className="transaction_type_wrap">
                  <p className={transactionType(e.type)}>
                    {e.type === "Debit" ? " - " : " + "}
                    {"₹"}
                    {e.amount}
                  </p>
                  <p>
                    {e.type === "Debit"
                      ? utils.walletIcon(15, 15)
                      : utils.walletIconCredit(15, 15)}{" "}
                    {e.type}
                  </p>
                </div>
              </Col>
            </Row>
          );
        })}
      {totalPosts > 0 && visible < totalPosts && (
        <div className={"loading_wrapper"}>
          <Loading animation="border" variant={"light"} />
        </div>
      )}
    </div>
  );
};

export default BonusTransaction;
