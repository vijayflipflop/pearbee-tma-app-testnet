import { Container, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import dimondImg from "assets/images/dimond.png";
import Slider from "react-slick";
import userImg1 from "assets/images/user-1.jpg";
import { utils } from "core/helper";
import * as Routeconst from "pages/routes/routes";
import { Link, useNavigate } from "react-router-dom";
import { services } from "core/service";
import { ROOMS_LIST } from "core/service/api.url.service";
import { Loading } from "components/common/loading";

const categories = [
  {
    label: "Cricket",
    value: 10,
  },
  {
    label: "Football",
    value: 20,
  },
  {
    label: "Election",
    value: 30,
  },
  {
    label: "Crypto",
    value: 40,
  },
  {
    label: "Regular Play",
    value: 50,
  },
];

const hosting = [
  {
    label: "All",
    value: 10,
  },
  {
    label: "Live Hosters",
    value: 20,
  },
  {
    label: "Upcoming Hoster",
    value: 30,
  },
  {
    label: "Favorite Hosters",
    value: 40,
  },
];

const MainIpl = () => {
  const navigate = useNavigate();
  const settings = {
    infinite: false,
    speed: 500,
    arrows: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    className: "center",
    centerPadding: "20px",
    appendDots: (dots) => (
      <div
        style={{
          backgroundColor: "transparent",
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1.75,
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.75,
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1.75,
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.75,
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 430,
        settings: {
          slidesToShow: 1.4,
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1.25,
          centerPadding: "20px",
        },
      },
    ],
  };

  const [roomsList, setRoomsList] = useState([]);
  const [loading, setIsLoading] = useState(false);

  const loadRommsList = async () => {
    try {
      setIsLoading(true);
      const resp = await services.get(ROOMS_LIST);
      if (resp?.status) {
        setRoomsList(resp?.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setRoomsList([]);
      }
    } catch (err) {
      setRoomsList([]);
      throw err;
    }
  };

  const handleRedirectToJoinRoom = (ele) => {
    console.log("ele::", ele?.status);
    if (ele?.status === "LIVE") {
      navigate(`${Routeconst.IPL}/${ele?.id}/${ele?.question_category[0]}`);
    } else {
      utils.showSuccessMsg("Event will be comming soon");
    }
  };

  const [isComponentMounted, setComponentMounted] = useState(false);
  useEffect(() => {
    const handleChange = async () => {
      await loadRommsList();
    };
    if (isComponentMounted) {
      handleChange();
    }
  }, [isComponentMounted]);

  useEffect(() => {
    setComponentMounted(true);
  }, []);

  return (
    <Container>
      <Row>
        <Col md={12} xs={12}>
          <div className="pearbee_ipl_section_wrapper">
            <div className="pearbee_category_list_sec">
              <ul>
                {categories.map(({ label, value }, idx) => (
                  <li
                    className={value === 10 ? "active" : ""}
                    key={idx}
                    value={value}
                  >
                    {label}
                  </li>
                ))}
              </ul>
            </div>
            <div className="pearbee_category_list_hosting_sec">
              <ul>
                {hosting.map(({ label, value }, idx) => (
                  <li className={value === 10 ? "active" : ""} key={idx}>
                    {label}
                  </li>
                ))}
              </ul>
            </div>
            <div className="pearbee_influencer_sec">
              <h3>Make money with your favored Influencer</h3>
              <p>
                Enjoy passive income while following your treasured influencer.
              </p>
              <div className="pearbee_influencer_price_sec">
                <p>INTRODUCTORY TICKET PRICE:</p>
                <img
                  src={dimondImg}
                  alt="dimond"
                  width={"20px"}
                  height={"20px"}
                />
                <span>99</span>
                <button>FREE</button>
              </div>
            </div>
            <div className="pearbee_fav_influencer_sec">
              <h2>Pick your Favorite Influencer </h2>
              <div className="pearbee_live_hoster_slider_sec">
                <h2>Live Hosters</h2>
                <Slider {...settings}>
                  <div className="pearbee_live_hoster_slider_card">
                    <div className="row">
                      <div className="col-4 col-md-4 xs-4">
                        <div className="pearbee_live_hoster_slider_img_sec">
                          <img
                            alt="Remy Sharp"
                            src={userImg1}
                            width={80}
                            height={80}
                          />
                        </div>
                      </div>
                      <div className="col-8 col-md-8 xs-5">
                        <div className="pearbee_live_hoster_slider_content_sec">
                          <h5>
                            Lakshmipathi <span>(Host)</span>
                          </h5>
                          <p>Actor, Director</p>
                          <p>
                            {utils.micIcon(13, 12)}
                            3,213 Listening...
                          </p>
                          <div className="pearbee_live_hoster_slider_lang_sec">
                            <p>Tamil, Hindi</p>
                            <span>Activate Room</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pearbee_live_hoster_slider_card">
                    <div className="row">
                      <div className="col-4 col-md-4 xs-4">
                        <div className="pearbee_live_hoster_slider_img_sec">
                          <img
                            alt="Remy Sharp"
                            src={userImg1}
                            width={80}
                            height={80}
                          />
                        </div>
                      </div>
                      <div className="col-8 col-md-8 xs-8">
                        <div className="pearbee_live_hoster_slider_content_sec">
                          <h5>
                            Lakshmipathi <span>(Host)</span>
                          </h5>
                          <p>Actor, Director</p>
                          <p>
                            <svg
                              width="13"
                              height="10"
                              viewBox="0 0 13 10"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4.75 1.875C4.75 1.37772 4.94754 0.900805 5.29917 0.549175C5.65081 0.197544 6.12772 0 6.625 0C7.12228 0 7.59919 0.197544 7.95083 0.549175C8.30246 0.900805 8.5 1.37772 8.5 1.875V5C8.5 5.49728 8.30246 5.97419 7.95083 6.32583C7.59919 6.67746 7.12228 6.875 6.625 6.875C6.12772 6.875 5.65081 6.67746 5.29917 6.32583C4.94754 5.97419 4.75 5.49728 4.75 5V1.875Z"
                                fill="white"
                              />
                              <path
                                d="M3.8125 4.0625C3.89538 4.0625 3.97487 4.09542 4.03347 4.15403C4.09208 4.21263 4.125 4.29212 4.125 4.375V5C4.125 5.66304 4.38839 6.29893 4.85723 6.76777C5.32607 7.23661 5.96196 7.5 6.625 7.5C7.28804 7.5 7.92393 7.23661 8.39277 6.76777C8.86161 6.29893 9.125 5.66304 9.125 5V4.375C9.125 4.29212 9.15792 4.21263 9.21653 4.15403C9.27513 4.09542 9.35462 4.0625 9.4375 4.0625C9.52038 4.0625 9.59987 4.09542 9.65847 4.15403C9.71708 4.21263 9.75 4.29212 9.75 4.375V5C9.75001 5.77471 9.46226 6.5218 8.94258 7.09634C8.42289 7.67088 7.70832 8.0319 6.9375 8.10938V9.375H8.8125C8.89538 9.375 8.97487 9.40792 9.03347 9.46653C9.09208 9.52513 9.125 9.60462 9.125 9.6875C9.125 9.77038 9.09208 9.84987 9.03347 9.90847C8.97487 9.96708 8.89538 10 8.8125 10H4.4375C4.35462 10 4.27513 9.96708 4.21653 9.90847C4.15792 9.84987 4.125 9.77038 4.125 9.6875C4.125 9.60462 4.15792 9.52513 4.21653 9.46653C4.27513 9.40792 4.35462 9.375 4.4375 9.375H6.3125V8.10938C5.54168 8.0319 4.82711 7.67088 4.30742 7.09634C3.78774 6.5218 3.49999 5.77471 3.5 5V4.375C3.5 4.29212 3.53292 4.21263 3.59153 4.15403C3.65013 4.09542 3.72962 4.0625 3.8125 4.0625Z"
                                fill="white"
                              />
                            </svg>
                            3,213 Listening...
                          </p>
                          <div className="pearbee_live_hoster_slider_lang_sec">
                            <p>Tamil, Hindi</p>
                            <span>Activate</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pearbee_live_hoster_slider_card">
                    <div className="row">
                      <div className="col-4 col-md-4 xs-4">
                        <div className="pearbee_live_hoster_slider_img_sec">
                          <img
                            alt="Remy Sharp"
                            src={userImg1}
                            width={80}
                            height={80}
                          />
                        </div>
                      </div>
                      <div className="col-8 col-md-8 xs-8">
                        <div className="pearbee_live_hoster_slider_content_sec">
                          <h5>
                            Lakshmipathi <span>(Host)</span>
                          </h5>
                          <p>Actor, Director</p>
                          <p>
                            <svg
                              width="13"
                              height="10"
                              viewBox="0 0 13 10"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4.75 1.875C4.75 1.37772 4.94754 0.900805 5.29917 0.549175C5.65081 0.197544 6.12772 0 6.625 0C7.12228 0 7.59919 0.197544 7.95083 0.549175C8.30246 0.900805 8.5 1.37772 8.5 1.875V5C8.5 5.49728 8.30246 5.97419 7.95083 6.32583C7.59919 6.67746 7.12228 6.875 6.625 6.875C6.12772 6.875 5.65081 6.67746 5.29917 6.32583C4.94754 5.97419 4.75 5.49728 4.75 5V1.875Z"
                                fill="white"
                              />
                              <path
                                d="M3.8125 4.0625C3.89538 4.0625 3.97487 4.09542 4.03347 4.15403C4.09208 4.21263 4.125 4.29212 4.125 4.375V5C4.125 5.66304 4.38839 6.29893 4.85723 6.76777C5.32607 7.23661 5.96196 7.5 6.625 7.5C7.28804 7.5 7.92393 7.23661 8.39277 6.76777C8.86161 6.29893 9.125 5.66304 9.125 5V4.375C9.125 4.29212 9.15792 4.21263 9.21653 4.15403C9.27513 4.09542 9.35462 4.0625 9.4375 4.0625C9.52038 4.0625 9.59987 4.09542 9.65847 4.15403C9.71708 4.21263 9.75 4.29212 9.75 4.375V5C9.75001 5.77471 9.46226 6.5218 8.94258 7.09634C8.42289 7.67088 7.70832 8.0319 6.9375 8.10938V9.375H8.8125C8.89538 9.375 8.97487 9.40792 9.03347 9.46653C9.09208 9.52513 9.125 9.60462 9.125 9.6875C9.125 9.77038 9.09208 9.84987 9.03347 9.90847C8.97487 9.96708 8.89538 10 8.8125 10H4.4375C4.35462 10 4.27513 9.96708 4.21653 9.90847C4.15792 9.84987 4.125 9.77038 4.125 9.6875C4.125 9.60462 4.15792 9.52513 4.21653 9.46653C4.27513 9.40792 4.35462 9.375 4.4375 9.375H6.3125V8.10938C5.54168 8.0319 4.82711 7.67088 4.30742 7.09634C3.78774 6.5218 3.49999 5.77471 3.5 5V4.375C3.5 4.29212 3.53292 4.21263 3.59153 4.15403C3.65013 4.09542 3.72962 4.0625 3.8125 4.0625Z"
                                fill="white"
                              />
                            </svg>
                            3,213 Listening...
                          </p>
                          <div className="pearbee_live_hoster_slider_lang_sec">
                            <p>Tamil, Hindi</p>
                            <span>Activate</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pearbee_live_hoster_slider_card">
                    <div className="row">
                      <div className="col-4 col-md-4 xs-4">
                        <div className="pearbee_live_hoster_slider_img_sec">
                          <img
                            alt="Remy Sharp"
                            src={userImg1}
                            width={80}
                            height={80}
                          />
                        </div>
                      </div>
                      <div className="col-8 col-md-8 xs-8">
                        <div className="pearbee_live_hoster_slider_content_sec">
                          <h5>
                            Lakshmipathi <span>(Host)</span>
                          </h5>
                          <p>Actor, Director</p>
                          <p>
                            <svg
                              width="13"
                              height="10"
                              viewBox="0 0 13 10"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4.75 1.875C4.75 1.37772 4.94754 0.900805 5.29917 0.549175C5.65081 0.197544 6.12772 0 6.625 0C7.12228 0 7.59919 0.197544 7.95083 0.549175C8.30246 0.900805 8.5 1.37772 8.5 1.875V5C8.5 5.49728 8.30246 5.97419 7.95083 6.32583C7.59919 6.67746 7.12228 6.875 6.625 6.875C6.12772 6.875 5.65081 6.67746 5.29917 6.32583C4.94754 5.97419 4.75 5.49728 4.75 5V1.875Z"
                                fill="white"
                              />
                              <path
                                d="M3.8125 4.0625C3.89538 4.0625 3.97487 4.09542 4.03347 4.15403C4.09208 4.21263 4.125 4.29212 4.125 4.375V5C4.125 5.66304 4.38839 6.29893 4.85723 6.76777C5.32607 7.23661 5.96196 7.5 6.625 7.5C7.28804 7.5 7.92393 7.23661 8.39277 6.76777C8.86161 6.29893 9.125 5.66304 9.125 5V4.375C9.125 4.29212 9.15792 4.21263 9.21653 4.15403C9.27513 4.09542 9.35462 4.0625 9.4375 4.0625C9.52038 4.0625 9.59987 4.09542 9.65847 4.15403C9.71708 4.21263 9.75 4.29212 9.75 4.375V5C9.75001 5.77471 9.46226 6.5218 8.94258 7.09634C8.42289 7.67088 7.70832 8.0319 6.9375 8.10938V9.375H8.8125C8.89538 9.375 8.97487 9.40792 9.03347 9.46653C9.09208 9.52513 9.125 9.60462 9.125 9.6875C9.125 9.77038 9.09208 9.84987 9.03347 9.90847C8.97487 9.96708 8.89538 10 8.8125 10H4.4375C4.35462 10 4.27513 9.96708 4.21653 9.90847C4.15792 9.84987 4.125 9.77038 4.125 9.6875C4.125 9.60462 4.15792 9.52513 4.21653 9.46653C4.27513 9.40792 4.35462 9.375 4.4375 9.375H6.3125V8.10938C5.54168 8.0319 4.82711 7.67088 4.30742 7.09634C3.78774 6.5218 3.49999 5.77471 3.5 5V4.375C3.5 4.29212 3.53292 4.21263 3.59153 4.15403C3.65013 4.09542 3.72962 4.0625 3.8125 4.0625Z"
                                fill="white"
                              />
                            </svg>
                            3,213 Listening...
                          </p>
                          <div className="pearbee_live_hoster_slider_lang_sec">
                            <p>Tamil, Hindi</p>
                            <span>Activate</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
            <div className="pearbee_fav_upcoming_hoster">
              <h2>Upcoming Hosters </h2>
              {!loading && roomsList.length === 0 && (
                <div className="pearbee_empty_date_wrap">
                  <h5>No Hosters Found</h5>
                </div>
              )}
              {loading && <Loading isWrap={true} />}
              {!loading &&
                roomsList?.length > 0 &&
                roomsList.map((ele, ind) => {
                  return (
                    <div
                      onClick={() => handleRedirectToJoinRoom(ele)}
                      className="pearbee_fav_upcoming_hoster_card"
                    >
                      <div className="row">
                        <div className="col-3 col-md-4 col-xs-4">
                          <img
                            src={userImg1}
                            alt="dimond"
                            width={"78"}
                            height={"76px"}
                          />
                        </div>
                        <div className="col-5 col-md-5 col-xs-5">
                          <div className="pearbee_fav_upcoming_hoster_card_content">
                            <p>
                              Stuart Binny <span>(Host)</span>
                            </p>
                            <p>{utils.micIcon(13, 12)} Starts Soon...</p>
                            <span>Tamil, English</span>
                          </div>
                        </div>
                        <div className="col-3 col-md-3 col-xs-3">
                          <div className="pearbee_fav_upcoming_hoster_time_sec">
                            <h5>52m 25s</h5>
                            <h6>09:30 AM</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MainIpl;
