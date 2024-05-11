import MainIpl from "components/Ipl";
import Header from "components/common/Header";
import MobileMenu from "components/common/mobileMenu";

import mixpanel from "mixpanel-browser";


const IPL = () => {

  mixpanel.track("ipl page viewed", {
    IPL: "Page viewed",
  });

  return (
    <div className="page_container">
      <Header />
      <MainIpl />
      <MobileMenu />
    </div>
  );
};

export default IPL;
