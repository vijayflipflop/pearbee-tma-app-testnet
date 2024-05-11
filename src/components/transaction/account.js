import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row, Tab, Tabs, Nav } from "react-bootstrap";
import { utils } from "core/helper";
import { services } from "core/service";
import {
  DEPOSIT_TRANSACTIONS,
  TRANSACTIONS,
  WITHDRAW_TRANSACTIONS,
} from "core/service/api.url.service";
import { Loading } from "components/common/loading";
import moment from "moment";

const AllTransactions = () => {
  const [transactions, setAllTransaction] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(0);
  const [page, setPage] = useState(null);

  const [isComponentMounted, setComponentMounted] = useState(false);
  useEffect(() => {
    const handleChange = async () => {
      await allTransactions();
    };
    if (isComponentMounted) {
      setPage(1);
      handleChange();
    }
  }, [isComponentMounted]);

  const allTransactions = async () => {
    try {
      const resp = await services.get(TRANSACTIONS);
      const { status: questionStatus, result: questionResult } = resp || {};
      if (questionStatus) {
        const totalPages = questionResult[0] ? questionResult[0].full_count : 0;
        setTotalPosts(totalPages);
      }
    } catch (error) {
      throw error.message;
    }
  };

  const handleOnScroll = () => {
    if (
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 1);
    }
  };

  const fetchTranactions = async () => {
    try {
      const resp = await services.get(`${TRANSACTIONS}?page=${page}`);
      const {
        status: questionStatus,
        result: questionResult,
        message,
      } = resp || {};
      if (questionStatus) {
        setVisible((prev) => prev + questionResult.length);
        setAllTransaction((prev) => [...prev, ...questionResult]);
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
    const handleChange = async () => {
      await fetchTranactions();
    };
    if (page) {
      handleChange();
    }
  }, [page]);

  useEffect(() => {
    visible < totalPosts && totalPosts > 0
      ? window.addEventListener("scroll", handleOnScroll)
      : window.removeEventListener("scroll", handleOnScroll);
    return () => {
      window.removeEventListener("scroll", handleOnScroll);
    };
  }, [visible, totalPosts]);

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

  useEffect(() => {
    setComponentMounted(true);
  }, []);

  return (
    <div className="transaction_card_group">
      {!isLoading && transactions.length === 0 && !error && (
        <div className="pearbee_empty_date_wrap">
          <h5>No Records Found</h5>
        </div>
      )}
      {!isLoading && transactions.length === 0 && error && (
        <div className="pearbee_empty_date_wrap">
          <h5>No Records Found</h5>
        </div>
      )}
      {!isLoading &&
        transactions.length > 0 &&
        transactions.map((e, i) => {
          return (
            <Row key={i}>
              <Col md={10} xs={8}>
                <div className="transaction_sec_content">
                  <p>{e.transaction_name}</p>
                  <span>
                    {moment(e.joined).format("MMMM Do YYYY, h:mm:ss a")}
                  </span>
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
                      ? utils.walletIcon(10, 10)
                      : utils.walletIconCredit(10, 10)}{" "}
                    {e.sub_type}
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

export default AllTransactions;
