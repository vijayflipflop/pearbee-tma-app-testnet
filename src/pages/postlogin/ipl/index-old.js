import MainIpl from "components/Ipl";
import Header from "components/common/Header";
import MobileMenu from "components/common/mobileMenu";

import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import mixpanel from "mixpanel-browser";

function randomID(len) {
  let result = "";
  if (result) return result;
  var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(url = window.location.href) {
  let urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}

const IPL = () => {
  const zegoCloudAppId = process.env.REACT_APP_ZEGO_CLOUD_APP_ID;
  const zegoCloudServerSecret = process.env.REACT_APP_ZEGO_CLOUD_SERVER_SECRET;
  const roomID = getUrlParams().get("roomID") || randomID(5);
  
  let myMeeting = async (element) => {

    // generate Kit Token
    // const appID = 519277734;
    // const serverSecret = "de51fe080bc8ffe0954990c4b1a37559";
    // const appID = 1746301411;
    // const serverSecret = "12f45a9e0ab605830c31a0251ecc7446";

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      Number(zegoCloudAppId),
      zegoCloudServerSecret,
      roomID,
      randomID(5),
      randomID(5)
    );

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    const { protocol, host, pathname } = window.location;
    const personalLink = `${protocol}//${host}${pathname}?roomID=${roomID}`;
    const roomSetting = {
      container: element,
      sharedLinks: [
        {
          name: "Personal link",
          url:personalLink
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
      },
    }
    console.log("zp::", zp);
    // start the call
    zp.joinRoom(roomSetting);
  };

  mixpanel.track("ipl page viewed", {
    IPL: "Page viewed",
  });

  return (
    <div className="page_container">
      <Header />
      <MainIpl />
      <MobileMenu />
      <div
        className="myCallContainer"
        ref={myMeeting}
        style={{ width: "100vw", height: "100vh" }}
      ></div>
    </div>
  );
};

export default IPL;
