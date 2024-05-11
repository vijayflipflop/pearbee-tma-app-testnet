import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import Services from "core/service/services";
import { Loading } from "components/common/loading";
import { CATEGORY, GET_BANNER } from "core/service/api.url.service";
import CategoryLinks from "./category-links";
import DashSlider from "./slider";
import QuestionList from "./QuestionList";
import { useTonConnectUI } from "@tonconnect/ui-react";

const DashComponents = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isBannerLoading, setIsBannerLoading] = useState(false);
  const [banners, setBanners] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  const getCategories = async () => {
    setIsLoading(true);
    try {
      const categoryResp = await Services.get(CATEGORY);
      const { result: categoryResult } = categoryResp || {};
      if (categoryResp?.status) {
        setCategoryData(categoryResult);
        setIsLoading(false);
      }
    } catch (error) {
      throw error.message;
    }
  };

  const getBanners = async () => {
    setIsBannerLoading(true);
    try {
      const bannerResp = await Services.get(GET_BANNER);
      const { result: bannerResult } = bannerResp || {};
      if (bannerResp?.status) {
        setBanners(bannerResult);
        setIsBannerLoading(false);
      }
    } catch (error) {
      throw error.message;
    }
  };

  const [isComponentMounted, setComponentMounted] = useState(false);
  useEffect(() => {
    const handleChange = async () => {
      await getBanners();
      await getCategories();
    };
    if (isComponentMounted) {
      handleChange();
    }
  }, [isComponentMounted]);

  useEffect(() => {
    setComponentMounted(true);
  }, []);

  // const convertInrToTon = (inrAmount) => {
  //   const exchangeRate = 0.3745; // example exchange rate INR to TON
  //   const tonAmount = inrAmount / exchangeRate;
  //   return tonAmount;
  // };

  // const [tonConnectUI, setOptions] = useTonConnectUI();
  // const [inrAmount, setInrAmount] = useState(0);
  // const [tonAmount, setTonAmount] = useState(0);

  // useEffect(() => {
  //   setTonAmount(convertInrToTon(inrAmount));
  // }, [inrAmount]);

  // const toNano = (amount) => {
  //   return Math.floor(amount * 1e14);
  // };

  // const myTransaction = {
  //   messages: [
  //     {
  //       amount: toNano(), // for commission fees, excess will be returned
  //     },
  //   ],
  // };

  return (
    <Container>
      <div className="pbee_hometab_wrapper">
        {isBannerLoading && <Loading variant={"light"} isWrap={true} />}
        {!isBannerLoading && banners?.length > 0 && (
          <DashSlider bannersList={banners} />
        )}
        {!isLoading && <CategoryLinks categoryData={categoryData} />}
        <QuestionList />

        {/* <input
          type="number"
          value={inrAmount}
          onChange={(e) => setInrAmount(e.target.value)}
        />
        <p>INR: {inrAmount}</p>
        <p>TON: {tonAmount}</p>
        <button
          onClick={() =>
            tonConnectUI.sendTransaction({
              ...myTransaction,
              amount: toNano(tonAmount),
            })
          }
        >
          Send transaction
        </button> */}
      </div>
    </Container>
  );
};

export default DashComponents;
