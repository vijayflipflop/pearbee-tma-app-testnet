import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "../node_modules/react-datepicker/dist/react-datepicker.css";
import "./assets/styles/index.css";
import { Provider } from "react-redux";
import Container from "./pages/container";
import store from "./core/store";
import { THEME, TonConnectUIProvider } from "@tonconnect/ui-react";
// import NotFound from "components/common/not-found";

// if (process.env.REACT_APP_ENV === 'production') {
//   require('dotenv').config({ path: '.env.prod' });
// } else {
//   require('dotenv').config();
// }
const wallets = [
  {
    appName: "safepalwallet",
    name: "SafePal",
    imageUrl: "https://s.pvcliping.com/web/public_image/SafePal_x288.png",
    aboutUrl: "https://www.safepal.com/download",
    jsBridgeKey: "safepalwallet",
    platforms: ["ios", "android", "chrome", "firefox"],
  },
  {
    appName: "tonwallet",
    name: "TON Wallet",
    imageUrl: "https://wallet.ton.org/assets/ui/qr-logo.png",
    aboutUrl:
      "https://chrome.google.com/webstore/detail/ton-wallet/nphplpgoakhhjchkkhmiggakijnkhfnd",
    universalLink: "https://wallet.ton.org/ton-connect",
    jsBridgeKey: "tonwallet",
    bridgeUrl: "https://bridge.tonapi.io/bridge",
    platforms: ["chrome", "android"],
  },
];

function App() {
  // const isLoggedIn = useSelector((state) => state.account?.isLoggedIn);
  return (
    <TonConnectUIProvider
      manifestUrl="https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json"
      uiPreferences={{ theme: THEME.DARK }}
      walletsListConfiguration={{
        includeWallets: wallets,
      }}
      setOptions={{ network: 'mainnet', disableTestnet: true }}
      actionsConfiguration={{
        twaReturnUrl: "https://t.me/pearbeeui_bot/PearBee",
      }}
    >
      <div className="app">
        <Provider store={store}>
          <Container />
        </Provider>
      </div>
    </TonConnectUIProvider>
  );
}

export default App;
