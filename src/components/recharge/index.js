import ProfileImageFallback from "components/common/profile-image-fallback";
import { services } from "core/service";
import { GET_USER_BAL, WALLET_PURCHASE } from "core/service/api.url.service";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { utils } from "core/helper";
import * as Routeconst from "pages/routes/routes";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { ethers } from "ethers";
// import BigNumber from "bn.js";

const RechargeScreen = () => {
  const wallet = useSelector((state) => state.account?.wallet);
  const [purchaseItems, setPurchanseItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const [coinSelected, setCoinSelected] = useState("");
  const [tonConnectUI, setOptions] = useTonConnectUI();

  const loadPurchaseItems = async () => {
    try {
      const resp = await services.get(WALLET_PURCHASE);
      if (resp?.status) {
        setPurchanseItems(resp?.data);
      }
    } catch (error) {
      throw error.message;
    }
  };

  const [isComponentMounted, setComponentMounted] = useState(false);
  useEffect(() => {
    const handleChange = async () => {
      // await loadPurchaseItems();
    };
    if (isComponentMounted) {
      handleChange();
    }
  }, [isComponentMounted]);

  useEffect(() => {
    setComponentMounted(true);
  }, []);

  const { handleSubmit, reset, setValue } = useForm();

  const onSubmit = async (values) => {
    const { mobile } = values;

    return;
  };

  const handleSelectedCoin = (value) => {
    if (value) {
      setValue("coinValue", value, { shouldValidate: true });
      setCoinSelected(value?.toString());
    } else {
      setCoinSelected("");
      setValue("coinValue", "");
    }
  };

  // const rawAddress = useTonAddress(false);
  // let tonAmount = ethers.BigNumber.from("0.1");
  // const decimalNumber = 0.02;
  // const integerNumber = Math.round(decimalNumber * 100); // 2

  // const transaction = {
  //   messages: [
  //     {
  //       address: "0:2b318a62bc41c80519b64ab804386f12cfdf0803ec5bd40d911534da0d10c94a", // destination address
  //       amount: String(20000000), //Toncoin in nanotons
  //     },
  //   ],
  // };

  // const handleSendTransaction = () => {
  //   tonConnectUI.sendTransaction(transaction);
  // };

  return (
    <Container className="recharge_screen">
      <Row className="d-flex justify-content-center">
        <Col md={6}>
          <div className="pearbee_recharge_wrap">
            <div className="pearbee_recharge_bal_sec">
              <p>Your Balance</p>
              <h4>{wallet?.total}</h4>
            </div>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <div className="pearbee_recharge_coin_sec">
                <p>Choose Recharge Amount</p>
                <ul>
                  {purchaseItems?.length > 0 &&
                    purchaseItems?.map((e, i) => {
                      return (
                        <li
                          onClick={() => handleSelectedCoin(e?.coin_value)}
                          key={i}
                          className={
                            coinSelected === e?.coin_value?.toString()
                              ? "selected"
                              : ""
                          }
                        >{`${e?.coin_value} Coins`}</li>
                      );
                    })}
                </ul>
                <div>
                  <Button type="submit">
                    Buy {coinSelected} Coins
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RechargeScreen;
