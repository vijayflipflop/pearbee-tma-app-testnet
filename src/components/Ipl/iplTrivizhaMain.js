import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { services } from "core/service";
import { CATEGORY_QUESTION } from "core/service/api.url.service";
import QuestionCard from "components/common/question-card";
import { Loading } from "components/common/loading";

const IplTrivizhaMain = () => {
  const { questionCategoryId } = useParams();
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(0);
  const [page, setPage] = useState(null);
  const [isComponentMounted, setComponentMounted] = useState(false);

  // const videoCallData = [
  //   {
  //     id: 1,
  //     hostImg: hostImg,
  //     hostName: "host",
  //     name: "Srikkanth",
  //     catagory: "HOST",
  //   },
  //   {
  //     id: 2,
  //     hostImg: coHostImg,
  //     hostName: "host",
  //     name: "Satheesh",
  //     catagory: "CO-HOST",
  //   },
  // ];

  // const commentData = [
  //   {
  //     id: 1,
  //     userImg: user1Img,
  //     username: "user2321_",
  //     comment: "CSK will win this IPL",
  //   },
  //   {
  //     id: 2,
  //     userImg: user2Img,
  //     username: "user2321_",
  //     comment: "CSK will win this IPL",
  //   },
  //   {
  //     id: 3,
  //     userImg: user3Img,
  //     username: "user2321_",
  //     comment: "CSK will win this IPL",
  //   },
  //   {
  //     id: 4,
  //     userImg: user4Img,
  //     username: "user2321_",
  //     comment: "CSK will win this IPL",
  //   },
  // ];

  const [activeDrags, setActiveDrags] = useState(0);
  const [deltaPosition, setDeltaPosition] = useState({ x: 0, y: 0 });

  const handleDrag = (e, ui) => {
    const { x, y } = deltaPosition;
    setDeltaPosition({ x: x + ui.deltaX, y: y + ui.deltaY });
  };

  const onStart = () => {
    setActiveDrags(activeDrags + 1);
  };

  const onStop = () => {
    setActiveDrags(activeDrags - 1);
  };

  const dragHandlers = { onStart, onStop, onDrag: handleDrag };

  const getTotalCatgoryQuestions = async () => {
    try {
      const questionResp = await services.get(`${CATEGORY_QUESTION}${2}`);
      const { status: questionStatus, result: questionResult } =
        questionResp || {};
      if (questionStatus) {
        const totalPages = questionResult[0] ? questionResult[0].full_count : 0;
        setTotalPosts(totalPages);
      }
    } catch (error) {
      throw error;
    }
  };

  const fetchQuestions = async (page) => {
    try {
      const questionResp = await services.get(
        `${CATEGORY_QUESTION}${2}&page=${page}`
      );
      const { status: questionStatus, result: questionResult } =
        questionResp || {};
      if (questionStatus) {
        setVisible((prev) => prev + questionResult.length);
        setPosts((prev) => [...prev, ...questionResult]);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnScroll = () => {
    if (
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const handleChange = async () => {
      await getTotalCatgoryQuestions();
    };
    if (isComponentMounted) {
      setPage(1);
      handleChange();
    }
  }, [isComponentMounted]);

  useEffect(() => {
    setComponentMounted(true);
  }, []);

  useEffect(() => {
    if (page) {
      fetchQuestions(page);
    }
  }, [page]);

  useEffect(() => {
    visible < totalPosts && totalPosts > 0
      ? window.addEventListener("scroll", handleOnScroll)
      : window.removeEventListener("scroll", handleOnScroll);
    return () => {
      window.removeEventListener("scroll", handleOnScroll);
    };
  }, [visible]);

  return (
    <Container className="ipl_trivizha_main">
      <div className="ipl_trivizha_main_header">
        <h3>
          PREDICT WITH <span>{"CHEEKA"}</span>
        </h3>
      </div>
      <Row className="ipl_trivizha_main_row">
        {isLoading && (
            <div className={"loading_wrapper"}>
              <Loading animation="border" variant={"light"} />
            </div>
          )}
        {!isLoading && posts.length === 0 && (
          <div className="pearbee_empty_date_wrap">
            <h5>No Questions Found</h5>
          </div>
        )}
        {!isLoading &&
          posts.length > 0 &&
          posts.map((ele, ind) => {
            return (
              <Col md={12}>
                <QuestionCard
                  key={ind}
                  cardFor={"category"}
                  questionDetails={ele}
                />
              </Col>
            );
          })}
        {totalPosts > 0 && visible < totalPosts && (
          <div className={"loading_wrapper"}>
            <Loading animation="border" variant={"light"} />
          </div>
        )}
      </Row>
      {/* <div className="ipl_trivizha_comments">
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
      </div> */}
      {/* {videoCallShow && (
        <Draggable {...dragHandlers}>
          <div className="pbee_ipl_trivizha_videoCall">
            <div
              className="pbee_ipl_trivizha_close"
              onClick={() => setVideoCallShow(false)}
            >
              {utils.closeIconBig(14, 14)}
            </div>
            <div className="pbee_ipl_trivizha_videoCall_inner">
              {videoCallData.map((data, index) => (
                <Link
                  to={`${IPL_ROOM_ID}/${data.hostName}`}
                  className="pbee_ipl_trivizha_video"
                  key={index}
                >
                  <img src={data.hostImg} alt="host" width={153} height={80} />
                  <div className="pbee_ipl_trivizha_host_name">
                    <h3>{data.name}</h3>
                    <small>{data.catagory}</small>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Draggable>
      )} */}
    </Container>
  );
};

export default IplTrivizhaMain;
