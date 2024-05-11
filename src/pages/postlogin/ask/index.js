import Header from "components/common/Header";
import MobileMenu from "components/common/mobileMenu";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Ask = () => {
  return (
    <div className="page_container">
      <Header />
      <h1 className="my-5 text-center">Ask is coming soon.</h1>
      <MobileMenu />
    </div>
  );
};

export default Ask;
