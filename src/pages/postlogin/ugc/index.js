import Breadcrumb from "components/common/breadcrumb";
import MobileMenu from "components/common/mobileMenu";
import UGCScreen from "components/ugc";

const UGC = () => {
  return (
    <div className="page_container">
      <Breadcrumb title={"UGC"} />
      <UGCScreen />
      <MobileMenu />
    </div>
  );
};

export default UGC;
