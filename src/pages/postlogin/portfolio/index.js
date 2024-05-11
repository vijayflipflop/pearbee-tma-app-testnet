import Breadcrumb from "components/common/breadcrumb";
import MobileMenu from "components/common/mobileMenu";
import React, { Fragment, useState } from "react";
import PortfolioScreen from "components/portfolio";

const Portfolio = () => {

  const [portfolioType, setPortfolioType] = useState(1); // 1 - public, 2 - private

  const handlePortfolio = (portfolioTypeVal) => {
    setPortfolioType(portfolioTypeVal === "public" ? 1 : 2);
  };

  return (
    <div className="page_container">
      <Breadcrumb title="Portfolio" enablePortfolioHandle={false} handlePortfolioEvent={handlePortfolio}/>
      <PortfolioScreen portfolioType={portfolioType}/>
      {/* <MobileMenu /> */}
    </div>
  );
};

export default Portfolio;
