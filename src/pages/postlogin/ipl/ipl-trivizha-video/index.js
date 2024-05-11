import Breadcrumb from "components/common/breadcrumb";
import MessageMobileMenu from "components/common/messageMobileMenu";
import React, { useEffect, useState } from "react";
import user1Img from "../../../../assets/images/guest_1.png";
import user2Img from "../../../../assets/images/guest_2.png";
import user3Img from "../../../../assets/images/guest_3.png";
import user4Img from "../../../../assets/images/guest_4.png";
import hostImg from "../../../../assets/images/srikanthHost.png";
import coHostImg from "../../../../assets/images/satheeshHost.png";

const IplTrivizhaVideo = () => {
  const [commentsShow, setCommentsShow] = useState(true);

  const commentData = [
    {
      id: 1,
      userImg: user1Img,
      username: "user2321_",
      comment: "CSK will win this IPL",
    },
    {
      id: 2,
      userImg: user2Img,
      username: "user2321_",
      comment: "CSK will win this IPL",
    },
    {
      id: 3,
      userImg: user3Img,
      username: "user2321_",
      comment: "CSK will win this IPL",
    },
    {
      id: 4,
      userImg: user4Img,
      username: "user2321_",
      comment: "CSK will win this IPL",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setCommentsShow(false);
    }, 10000);
  }, []);

  return (
    <div className="page_container">
      <Breadcrumb />

      <div className="pbee_ipl_trivizha_video_screen_page">
        <div className="pbee_ipl_trivizha_video_screen">
          <img src={hostImg} alt="host" />
          <div className="pbee_ipl_trivizha_video_screen_name">
            <h3>Srikkanth</h3>
            <small>HOST</small>
          </div>
        </div>

        <div className="pbee_ipl_trivizha_video_screen">
          <img src={coHostImg} alt="host" />
          <div className="pbee_ipl_trivizha_video_screen_name">
            <h3>Srikkanth</h3>
            <small>HOST</small>
          </div>
        </div>
      </div>

      {commentsShow && (
        <div className="ipl_trivizha_comments">
          <ul>
            {commentData.map((comment, index) => (
              <li key={index}>
                <div className="ipl_trivizha_comment_list">
                  <div className="ipl_trivizha_comment_user_img">
                    <img src={comment.userImg} alt={comment.username} />
                  </div>
                  <div className="ipl_trivizha_comment_user_comment">
                    <h4>{comment.username}</h4>
                    <p>{comment.comment}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <MessageMobileMenu />
    </div>
  );
};

export default IplTrivizhaVideo;
