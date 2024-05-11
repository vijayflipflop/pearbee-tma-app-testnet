import React, { useState, useEffect, useRef, Fragment } from "react";
import { ZegoExpressEngine } from "zego-express-engine-webrtc";
import { Button } from "react-bootstrap";

// get token
function generateToken(tokenServerUrl, userID, roomID) {
  // Obtain the token interface provided by the App Server
  return fetch(
    `${tokenServerUrl}/access_token?roomID=${roomID}&userID=${userID}&expired_ts=7200`,
    {
      method: "GET",
    }
  ).then((res) => res.json());
}

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

// const roomOneId = "ROOM_123";
// const roomTwoId = "ROOM_987";
const roomOneUsers = [
  {
    userID: "host_1",
    userName: "Pravin_Host",
    userRole: "host",
    token:
      "04AAAAAGY40jMAEDA0N3JmeWRla2xtcXFqd3kAsGlG3t45IUnBRoIFILm7EqfOHnuhFeOSwflrluzL/iVwtrEdjQ18wJfVrv2WJ7J9TCEtSDh7T7qaiWB9GYWyZAOOEcMDdACrCjUcFJ6ITu2thSPsQgE5vVODkiPkOMYEh1xCP9D/6nuoP9TrzJPDNCalfNNqs8WoaHwwBreDmDQdpiXdsBzMoESn0Z6jubLX6MU4ePwohC8dUKD7g1UfhVigY3iPAHZuvA+K4Yzvw0Nc",
  },
  {
    userID: "co_host_1",
    userName: "Raja_Co_Host",
    userRole: "co_host",
    token:
      "04AAAAAGY40j4AEG5xbm5qejFkajJ4MjBuZnkAsMhAho+jr0sjeuG6Hy6M6ixZomlO+y3d2X2dBFspMKteT1WLS3NtaR/aXQItNhNS7BrP3vilXJ57kfqLeahofS8+sHH+OH9P8GkmFlAR8FDUMlU/2DuvjuVEud3Ie0NTxYEriZOOGsXm6pYv5jZO9IxXqUX7hA+gdSTTHmdOmTkBQ0M6FBXUDdVfKLCtGrXsmHB9AGDu00dyz90/y90Tl+XbPD9O7ePmY4YdGvRMyPed",
  },
  {
    userID: "audience_1",
    userName: "Raja_Audience",
    userRole: "audience",
    token:
      "04AAAAAGY40lsAEGoxN21uMTQzenJjbHZicTQAsJVjxF7CYEGFv0mWk0IHN/8kVMktdlBKRf3lmkCqtDy23t2jY7M7QOoXI/0z/R+UR+EdbQDRDkilPGFX5Zn/meybBjPQj1smCfZ+9gYgJTpY+uocq1W0jX2Kg5E4moTYxYstbmH+696afv/UoBfvXjaZk07D1ExPofke6I1ZNTOkTqkTWMLYMh41LVyrYDfi4f2cHguH5G1FY9sSt1DDrGWRLVlaJ7EVibtIX8/HVv1X",
  },
];
const roomTwoUsers = [
  {
    userID: "r2_host_1",
    userName: "RJ_BALAJI_Host",
    userRole: "host",
    token:
      "04AAAAAGY0g6YAEHA2bmNtbXR3dHRpZ2R4ZXQAsP9bMG+zwHnUfbspV4yNnf6+flpEYx/nuySzgAWE3DtbMzzu+QbziHkjri3M29RE613PY0ktTByktnv6FCTxjzyHz5/9mBYgO/C5fyVUe7XseALKFP3sM7MWFzChcWMHCeV4AAYGmzhd6Tsf1+Dz5iKmGMrZxYK8/YvklTr2Qs6yar5skXu/xiKBQz8h2SJuXa3DYLN3GFdMktY/4rOJH1HsGhKm76F9k08A42YJmTg1",
  },
  {
    userID: "r2_co_host_1",
    userName: "Vikram_Co_Host",
    userRole: "co_host",
    token:
      "04AAAAAGY0g7EAEGVxZG9pNGNtM3M0YzUwYW8AsF8MriaOyzBVtWXuogIEDx5eEH6+dapWH0N+BSlMKYCrBGRGMGFkvS+Hr1cF4DzdxCpR+jlQiyqjxFLVGTgWw0sRI2jdlIck+qY6uN20irIop3CkGW8W1/WJw+BRD7urXFWPgNAGXHp0MLatRYfKqm9/jOUK5O5LeIKn7fTK+jU1NL8onl1EUpiWrbXg9AiBFvgnfFNU86Z/4w9L5oPo1anZvjS23GHnK5pjH3ApTI4e",
  },
  {
    userID: "r2_autdience_1",
    userName: "Sudhar_Audience",
    userRole: "audience",
    token:
      "04AAAAAGY0g7wAEHE1aTh6bXVoMHR5NTFlbWMAsO6oMBH0bSKCmGjqoUZbmuRkEFHgW2uFMMFzeU67j6ERHML5RvadgdTN0ZUNMQsl/yxVLnjAgCHNtcyvITh4M1RcCWkGvI1Tu4MN/cYZ6H8SB3MASQd0Vpyrirsan6JPXBNN1ZSR8Kbtpe6pxWpUfhJOJxAyMeYN+66csreiIDbAYKu8NlbtRMRvN0B5Ia3eLTN0gruMhJSsWl9WGwosAo7CyUSb0lqqyp2zervsr1/3",
  },
];

const AudienceStreaming = () => {
  const zegoCloudAppId = process.env.REACT_APP_ZEGO_CLOUD_APP_ID;
  const zegoCloudServerUrl = process.env.REACT_APP_ZEGO_CLOUD_SERVER_URL;

  const remoteAudioStreamRef = useRef(null);
  const remoteVideoStreamRef = useRef(null);

  const audioStreamAudienceRef = useRef(null);

  const [zpInstance, setZpInstance] = useState(null);
  const [zpInstanceLiseners, setZpInstanceLiseners] = useState(false);
  const [joinLiveStreaming, setJoinLiveStreaming] = useState(false);
  const [speakMute, setSpeakMute] = useState(false);

  const userRole = getUrlParams().get("role") || "audience";
  const roomId = getUrlParams().get("roomId") || "ROOM_123";

  const hostAudioStreamID = "HOST_AUD_001";
  const hostVideoStreamID = "HOST_VID_001";
  const audienceAudioStreamID = "CO_HOST_AUD_001";

  useEffect(() => {
    initStreamingSDK();
  }, []);

  const initStreamingSDK = () => {
    // Instance initialization
    const zg = new ZegoExpressEngine(
      Number(zegoCloudAppId),
      zegoCloudServerUrl
    );
    zg.setDebugVerbose(false);
    setZpInstance(zg);
  };

  useEffect(() => {
    async function fetchData() {
      const result = await zpInstance.checkSystemRequirements();
      // The `result` parameter that is returned indicates the compatibility check result. WebRTC is supported if the value of `webRTC` is `true`. For other attributes of this API, see the API reference.
      console.error("result::", result);
      setZpInstanceLiseners(true);
    }
    console.error("zpInstance::", zpInstance);
    if (zpInstance !== null) {
      fetchData();
    }
  }, [zpInstance]);

  const handleJoinLiveStreaming = async () => {
    if ((zpInstanceLiseners, roomId, userRole)) {
      initLiveStreaming(roomId, userRole);
      setJoinLiveStreaming(!joinLiveStreaming);
    } else {
      console.error("live streaming needed information not there");
    }
  };

  const handleLeaveLiveStreaming = async () => {
    if ((zpInstanceLiseners, roomId, userRole)) {
      await toggleRemoteAudioStream();
      await toggleRemoteVideoStream();
      zpInstance.logoutRoom(roomId);
      setJoinLiveStreaming(!joinLiveStreaming);
    } else {
      console.error("live streaming needed information not there");
    }
  };

  const initLiveStreaming = (roomId, userRole) => {
    console.error("roomId::", roomId);
    console.error("userRole::", userRole);
    let roomID = roomId;
    let roomUsers = roomId === "ROOM_123" ? roomOneUsers : roomTwoUsers;
    let userObj = roomUsers.find((ele) => ele.userRole === userRole);
    let userID = userObj.userID;
    let userName = userObj.userName;
    let token = userObj.token;
    console.error("userObj::", userObj);

    zpInstance
      .loginRoom(roomID, token, { userID, userName }, { userUpdate: true })
      .then(async (result) => {
        if (result == true) {
          console.error("login success");
          // Connected to the room successfully. You can perform operations such as stream publishing and playing only after the room is successfully connected.

          initSDKEventLiseners();
        }
      });
  };

  const initSDKEventLiseners = () => {
    // Room status update callback
    // In the sample code, streams are published immediately after you successfully log in to a room. When implementing your service, you can choose to publish streams at any time when the room is connected status.
    // Room status update callback
    zpInstance.on(
      "roomStateChanged",
      async (roomID, state, errorCode, extendedData) => {
        if (state == "LOGINED") {
          console.error(
            "Connected to the room successfully. You can perform operations such as stream publishing and playing only after the room is successfully connected."
          );
        }
        if (state == "DISCONNECTED") {
          console.error("DISCONNECTED::");
        }

        if (state == "CONNECTING") {
          // Connecting to the room
          console.error("CONNECTING::");
        }

        if (state == "CONNECTED") {
          // Connected to the room
          console.error("CONNECTED::");
        }
      }
    );

    zpInstance.on("roomUserUpdate", async (roomID, updateType, userList) => {
      // Notification of users joining or leaving a room
      console.error("roomUserUpdate::");
      console.error("roomID::", roomID);
      console.error("updateType::", updateType);
      console.error(
        `roomUserUpdate: room ${roomID}, user ${
          updateType === "ADD" ? "added" : "left"
        } `,
        JSON.stringify(userList)
      );

      await toggleRemoteAudioStream(updateType);
      await toggleRemoteVideoStream(updateType);
    });

    zpInstance.on(
      "roomStreamUpdate",
      async (roomID, updateType, streamList, extendedData) => {
        console.error("roomStreamUpdate::");
        console.error("roomID::", roomID);
        console.error("updateType::", updateType);
        console.error("roomStreamUpdate::", streamList);
        console.error("extendedData::", extendedData);

        // Notification of audio or video stream updates of other users in a room
        if (updateType == "ADD") {
          // When streams are added, play them.
          // In the sample code, the audio and video of the first stream in the stream addition list are played.
          // const hostVideoStreamID = streamList[1].streamID;
          // The stream list specified by `streamList` contains the ID of the corresponding stream.
          // const remoteVideoStream = await zpInstance.startPlayingStream(hostVideoStreamID);
          // console.error("remoteVideoStream::", remoteVideoStream);
          // Create a media stream player.
          // const remoteView = zpInstance.createRemoteStreamView(remoteStream);
          // remoteView.play("remote-host-video", {enableAutoplayDialog:true});
          // remoteView.play(document.querySelector("#remote-host-video"), {enableAutoplayDialog:true});
        } else if (updateType == "DELETE") {
          // When streams are deleted, stop playing them based on `streamID` of the streams in the stream deletion list specified by `streamList`.
          // const streamID = streamList[0].streamID;
        }
      }
    );

    zpInstance.on("playerStateUpdate", (result) => {
      // Callback for updates on stream playing status.
      // ...
      console.error("playerStateUpdate::");
      console.error("result::", result);
    });

    zpInstance.on("playQualityUpdate", (streamID, stats) => {
      // Callback for reporting stream playing quality.
      console.error("playQualityUpdate::");
      console.error("streamID::", streamID);
      console.error("stats::", stats);
    });
  };

  const toggleRemoteAudioStream = async (updateType = "REMOVE") => {
    if (updateType === "ADD") {
      const remoteAudioStream = await zpInstance.startPlayingStream(
        hostAudioStreamID
      );
      console.error("remoteAudioStream::", remoteAudioStream);

      remoteAudioStreamRef.current = remoteAudioStream;

      const remoteAudio = document.getElementById("remote-host-audio");
      remoteAudio.srcObject = remoteAudioStream;
      return remoteAudio.play();
    } else {
      zpInstance.stopPlayingStream(hostAudioStreamID);
      zpInstance.destroyStream(remoteAudioStreamRef.current);
    }
  };

  const toggleRemoteVideoStream = async (updateType = "REMOVE") => {
    if (updateType === "ADD") {
      const remoteVideoStream = await zpInstance.startPlayingStream(
        hostVideoStreamID
      );
      console.error("remoteVideoStream::", remoteVideoStream);

      remoteVideoStreamRef.current = remoteVideoStream;

      const remoteVideo = document.getElementById("remote-host-video");
      remoteVideo.srcObject = remoteVideoStream;
      return remoteVideo.play();
    } else {
      zpInstance.stopPlayingStream(hostVideoStreamID);
      zpInstance.destroyStream(remoteVideoStreamRef.current);
    }
  };

  const toggleSpeakStream = async (speakMute) => {
    if (!speakMute) {
      const localAudioStream = await zpInstance.createStream({
        camera: { audio: true, video: false },
      });

      // audioStreamAudienceRef.current = localAudioStream;

      // // MediaStream srcObject
      // const localAudienceAudio = document.getElementById("local-audience-audio");
      // localAudienceAudio.srcObject = localAudioStream;

      return zpInstance.startPublishingStream(
        audienceAudioStreamID,
        localAudioStream
      );
      // return localAudienceAudio.play();
    } else {
      zpInstance.stopPublishingStream(audienceAudioStreamID);
      // zpInstance.destroyStream(audioStreamAudienceRef.current);
    }
  };

  const toggleSpeakingLiveStreaming = async () => {
    console.error("toggleLiveStreamingSpeaking::");
    toggleSpeakStream(!speakMute);
    setSpeakMute(!speakMute);
  };

  return (
    // <Fragment>
    //   {joinLiveStreaming ? (
    //     <Button className="btn" onClick={handleLeaveLiveStreaming}>
    //       Leave
    //     </Button>
    //   ) : (
    //     <Button className="btn" onClick={handleJoinLiveStreaming}>
    //       Join
    //     </Button>
    //   )}
    //   <div className="row">
    //     <div className="col-12">
    //       <h6>Audience Video</h6>
    //       <video
    //         style={{ height: 200, width: 200 }}
    //         id="remote-host-video"
    //         controls={false}
    //       />
    //       <audio id="remote-host-audio" controls={false} />
    //       {/* <audio id="local-audience-audio" controls={false} /> */}
    //       <Button className="btn" onClick={toggleSpeakingLiveStreaming}>
    //         {speakMute ? "Speak-UnMute" : "Speak-Mute"}
    //       </Button>
    //     </div>
    //   </div>
    // </Fragment>
    ""
  );
};

export default AudienceStreaming;
