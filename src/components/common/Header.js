import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Routeconst from "pages/routes/routes";
import { connect } from "react-redux";
import { utils } from "core/helper";
import {
  TonConnectButton,
  useTonAddress,
  useTonConnectUI,
} from "@tonconnect/ui-react";
import trophyImg from "assets/images/trophyicon.png";
import logo from "assets/images/Logo.png";
import { logoutAction } from "core/redux/account/account.action";

const Header = (props) => {
  const { logoutAction } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const userFriendlyAddress = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();
  // const wallet = useTonWallet();
  // const [balance, setBalance] = useState(0);

  // const handleNavigate = () => {
  //   utils.mixPannelEvent(
  //     "click_wallet_button",
  //     "HEADER_WALLET",
  //     "click_wallet_button"
  //   );
  //   navigate(Routeconst.TRANSACTION);
  // };

  const handleClickPortfolio = () => {
    utils.mixPannelEvent(
      "click_portfolio_button",
      "CLICKED_PORTFOLIO_BUTTON",
      "click_portfolio_button"
    );
  };

  const handleClickedLeaderBoard = () => {
    utils.mixPannelEvent(
      "clickleaderboard",
      "CLICKED_LEADERBOARD_BUTTON",
      "clickleaderboard"
    );
    navigate(Routeconst.LEADERBOARD);
  };

  const handleDisConnect = async () => {
    logoutAction();
    await tonConnectUI.disconnect();
  };

  // useEffect(() => {
  //   const loadBalance = async () => {
  //     const endpoint = await getHttpEndpoint({
  //       network: "testnet",
  //     });
  //     const tonweb = new TonWeb(new TonWeb.HttpProvider(endpoint));
  //     const balance = await tonweb.getBalance(wallet.account.address);
  //     // console.log(`Balance: ${TonWeb.utils.fromNano(balance)} TON`);
  //     setBalance(TonWeb.utils.fromNano(balance));
  //   };
  //   if (wallet?.account) {
  //     loadBalance();
  //   }
  // }, [wallet]);

  return (
    <Navbar sticky="top">
      <Container>
        <Navbar.Brand as={Link} to={Routeconst.DASH_PATH}>
          <img
            src={logo}
            width={51.36}
            height={32}
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Nav>
          <Nav.Link as={Link} to={Routeconst.DASH_PATH}>
            {location.pathname === Routeconst.DASH_PATH
              ? utils.regularActivePlayIcon(24, 24)
              : utils.regularIcon(24, 24)}
            Regular Play 
          </Nav.Link>
          <Nav.Link as={Link} to={Routeconst.UGC}>
            {location.pathname === Routeconst.UGC
              ? utils.askActiveIcon(24, 24)
              : utils.askIcon(24, 24)}
            Ask
          </Nav.Link>
          {/* <Nav.Link as={Link} to={Routeconst.IPL}>
            {location.pathname === Routeconst.IPL
              ? utils.iplActiveIcon(24, 24)
              : utils.iplSportsIcon(24, 24)}
            IPL 2024
          </Nav.Link> */}
          <Nav.Link
            as={Link}
            to={Routeconst.MY_PORTFOLIO}
            onClick={handleClickPortfolio}
          >
            {location.pathname === Routeconst.MY_PORTFOLIO
              ? utils.portfolioActiveIcon(24, 24)
              : utils.portfolioIcon(24, 24)}
            My Portfolio
          </Nav.Link>
          <Nav.Link as={Link} to={Routeconst.SETTING}>
            {location.pathname === Routeconst.SETTING
              ? utils.settingActiveIcon(24, 24)
              : utils.settingIcon(24, 24)}
            Settings
          </Nav.Link>
        </Nav>
        {/* {userFriendlyAddress && (
          <div className="d-flex gap-2">
            <div className="pearbee_tonwallet_address_wrap">
              <p>{utils.truncateString(userFriendlyAddress, 4, 6, 6)}</p>
            </div>
          </div>
        )} */}
        {userFriendlyAddress ? (
          <div className="d-flex gap-2">
            <div className="pearbee_tonwallet_address_wrap">
              <p onClick={handleDisConnect}>
                {utils.truncateString(userFriendlyAddress, 4, 6, 6)}
              </p>
            </div>
            {/* <Button onClick={handleLogoutTonConnect}>logout</Button> */}
          </div>
        ) : (
          <div className="me-auto">
            <TonConnectButton />
          </div>
        )}

        {/* <div className="header_wallet_coin_sec" onClick={handleNavigate}>
          <div className="header_coins_count">
            {wallet && (
              <div className="header_coins_rhs">
                <span>{utils.tonIcon(17, 17)} {Number(balance)?.toFixed(2)}</span>
              </div>
            )}
          </div>
        </div> */}
        <ul className="header_icon_mob">
          <li>
            <Link to={Routeconst.MY_PORTFOLIO}>
              {utils.portfolioIcon(24, 24)}
            </Link>
          </li>
          <li>
            <span onClick={handleClickedLeaderBoard}>
              <img
                src={trophyImg}
                alt="trophy-img"
                width={30}
                height={30}
                style={{ objectFit: "cover" }}
              /> 
            </span>
          </li>
        </ul>
      </Container>
    </Navbar>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutAction: (authUser) => dispatch(logoutAction(authUser)),
  };
};

export default connect(null, mapDispatchToProps)(Header);
