import IplTrivizhaMain from "components/Ipl/iplTrivizhaMain";
import IplTrivizhaSlider from "components/Ipl/iplTrivizhaSlider";
import Breadcrumb from "components/common/breadcrumb";
import MessageMobileMenu from "components/common/messageMobileMenu";
import HostLiveStreaming from "components/Ipl/hostStreaming";
import AudienceStreaming from "components/Ipl/audienceStreaming";
import React, { useState } from "react";

export function getUrlParams(url = window.location.href) {
  let urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}

const IplTrivizha = () => {
  const userRole = getUrlParams().get("role") || "audience";

  return (
    <div className="page_container" id="iplTrivizha">
      <Breadcrumb
        title="IPL TRIVIZHA 2024"
        volumeUp={true}
        className="ipl_trivizha_header "
      />

      {userRole === "host" && <HostLiveStreaming />}
      {userRole === "audience" && <AudienceStreaming />}

      <IplTrivizhaSlider />
      <IplTrivizhaMain />
      <MessageMobileMenu />
    </div>
  );
};

export default IplTrivizha;
