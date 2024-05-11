import { utils } from "core/helper";
import { Button,Container } from "react-bootstrap"
import React from "react";
import whatsAppImg from "../../assets/images/3d-fluency-whatsapp-logo 1.png";
import coinImg from "../../assets/images/22775344_COIN 2.png";

const MessageMobileMenu = () => {
  return (
    <div className="ipl_trivizha_msg_input_container">
      <Container className="ipl_trivizha_inner_container">
        <div className="ipl_trivizha_input">
          <input type="text" placeholder="Say hi" />
          <Button variant="transparent">{utils.send(20,20)}</Button>
        </div>

        <div className="ipl_trivizha_get">
          <div>
            <img src={whatsAppImg} alt="whatsapp-logo" />
            GET
          </div>
          <div>
            <img src={coinImg} alt="coin-img" />
            200
          </div>
        </div>

        <div className="ipl_trivizha_speak">{utils.micOn(11.67,15.83)}</div>
      </Container>
    </div>
  );
};

export default MessageMobileMenu;
