import Breadcrumb from "components/common/breadcrumb";
import WalletScreen from "components/wallet";
import { utils } from "core/helper";

const SettingWallet = () => {
  utils.mixPannelEvent(
    "wallet_page",
    "WALLET_PAGE",
    "wallet_page"
  );
  return (
    <div className="page_container">
      <Breadcrumb title="Wallet" className="wallet_header" />
      <WalletScreen />
    </div>
  );
};

export default SettingWallet;
