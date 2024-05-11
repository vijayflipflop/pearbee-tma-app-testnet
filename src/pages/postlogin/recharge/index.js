import Breadcrumb from "components/common/breadcrumb";
import RechargeScreen from "components/recharge";

const Recharge = () => {
  return (
    <div className="recharge_page_container">
      <Breadcrumb title="Recharge" className="recharge_header"/>
      <RechargeScreen/>
    </div>
  );
};

export default Recharge;
