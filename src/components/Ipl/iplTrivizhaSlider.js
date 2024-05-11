import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Container } from "react-bootstrap";
import { utils } from "core/helper";
import { services } from "core/service";
import { useParams } from "react-router-dom";
import {  ROOM_DETAILS } from "core/service/api.url.service";
import ImageFallback from "components/common/image-fallback";

const IplTrivizhaSlider = () => {
  const { id } = useParams();
  const [peoplesList, setPeoplesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isComponentMounted, setComponentMounted] = useState(false);

  const loadPeoples = async (id) => {
    try {
      setLoading(true);
      const resp = await services.get(ROOM_DETAILS + id);
      if (resp?.status) {
        setPeoplesList(resp?.data?.peoples);
        setLoading(false);
      } else {
        setPeoplesList([]);
        setLoading(false);
      }
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    const handleChange = async (id) => {
      await loadPeoples(id);
    };
    if (isComponentMounted && id) {
      handleChange(id);
    }
  }, [isComponentMounted, id]);

  useEffect(() => {
    setComponentMounted(true);
  }, []);

  // const iplStories = [
  //   {
  //     img: guest1Img,
  //     guestName: "srikanth",
  //     host: true,
  //   },
  //   {
  //     img: guest2Img,
  //     guestName: "kanth",
  //     player: true,
  //     speaking: false,
  //   },
  //   {
  //     img: guest3Img,
  //     guestName: "Rj",
  //     player: false,
  //     speaking: true,
  //   },
  //   {
  //     img: guest4Img,
  //     guestName: "Badri",
  //     player: true,
  //     speaking: false,
  //   },
  //   {
  //     img: guest1Img,
  //     guestName: "srikanth",
  //     player: true,
  //     speaking: false,
  //   },
  //   {
  //     img: guest2Img,
  //     guestName: "kanth",
  //     player: true,
  //     speaking: false,
  //   },
  //   {
  //     img: guest3Img,
  //     guestName: "Rj",
  //     player: true,
  //     speaking: false,
  //   },
  //   {
  //     img: guest4Img,
  //     guestName: "Badri",
  //     player: true,
  //     speaking: false,
  //   },
  //   {
  //     img: guest1Img,
  //     guestName: "srikanth",
  //     player: true,
  //     speaking: false,
  //   },
  //   {
  //     img: guest2Img,
  //     guestName: "kanth",
  //     player: true,
  //     speaking: true,
  //   },
  //   {
  //     img: guest3Img,
  //     guestName: "Rj",
  //     player: true,
  //     speaking: false,
  //   },
  //   {
  //     img: guest4Img,
  //     guestName: "Badri",
  //     player: true,
  //     speaking: false,
  //   },
  // ];

  // const settings = {
  //   dots: false,
  //   speed: 500,
  //   arrows: true,
  //   slidesToShow: 4,
  //   // slidesToShow:
  //   //   iplStories.length >= 10
  //   //     ? 9
  //   //     : iplStories.length >= 7
  //   //     ? 6
  //   //     : iplStories.length,
  //   // slidesToScroll:
  //   //   iplStories.length >= 10 ? 3 : iplStories.length >= 7 ? 2 : 1,
  //   slidesToScroll: 1,
  //   initialSlide: 0,
  //   responsive: [
  //     {
  //       breakpoint: 1200,
  //       settings: {
  //         arrows: false,
  //       },
  //     },
  //     {
  //       breakpoint: 992,
  //       settings: {
  //         slidesToShow: 7,
  //         slidesToScroll: 3,
  //         arrows: false,
  //       },
  //     },
  //     {
  //       breakpoint: 768,
  //       settings: {
  //         slidesToShow: 5,
  //         slidesToScroll: 4,
  //         arrows: false,
  //       },
  //     },
  //     {
  //       breakpoint: 576,
  //       settings: {
  //         slidesToShow: 4,
  //         infinite: true,
  //         arrows: false,
  //       },
  //     },
  //   ],
  // };

  const settings = {
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 2,
    slidesToScroll: 2,
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
          slidesToShow: 5,
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 3,
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 430,
        settings: {
          slidesToShow: 3,
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 3,
          centerPadding: "20px",
        },
      },
    ],
  };

  return (
    <Container>
      <div className="ipl_slider">
        <Slider {...settings}>
          {/* {iplStories.map((stories, index) => (
            <div
              className={`inner_ipl_slider ${
                stories.host
                  ? "inner_ipl_slider_highlights_host"
                  : "inner_ipl_slider_NotHighlights_host"
              } `}
              key={index}
            >
              <div
                className={`ipl_slider_img ${
                  stories.host
                    ? "ipl_trivizha_img_border_host"
                    : "ipl_trivizha_img_border"
                }`}
              >
                <img src={stories.img} alt="guest" width={72} height={72} />
                {stories.host || stories.speaking ? (
                  <div className="ipl_host_graphic_eq">
                    {utils.iplGraphicEq(18, 20)}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="ipl_stories_guest_details">
                <h6>{stories.guestName}</h6>

                <div>
                  {stories.host || stories.speaking
                    ? utils.keyboardVoice(15, 15)
                    : utils.micOffRed(15, 15)}
                  <small
                    className={`${
                      stories.speaking
                        ? "ipl_stories_speaking"
                        : "ipl_stories_notSpeaking"
                    }`}
                  >
                    {stories.host
                      ? "Host"
                      : stories.player
                      ? "Player"
                      : "Speaking"}
                  </small>
                </div>
              </div>
            </div>
          ))} */}
          {peoplesList.length > 0 &&
            peoplesList.map((ele, ind) => {
              return (
                <div
                  className={`inner_ipl_slider ${
                    ele.host
                      ? "inner_ipl_slider_highlights_host"
                      : "inner_ipl_slider_NotHighlights_host"
                  } `}
                  key={ind}
                >
                  <div
                  // className={`ipl_slider_img ${
                  //   stories.host
                  //     ? "ipl_trivizha_img_border_host"
                  //     : "ipl_trivizha_img_border"
                  // }`}
                  >
                    <ImageFallback
                      src={""}
                      alt="guest"
                      width={72}
                      height={72}
                    />
                    {ele.host || ele.speaking ? (
                      <div className="ipl_host_graphic_eq">
                        {utils.iplGraphicEq(18, 20)}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="ipl_stories_guest_details">
                    <h6>{ele?.voice_name}</h6>

                    <div>
                      {ele.host || ele.speaking
                        ? utils.keyboardVoice(15, 15)
                        : utils.micOffRed(15, 15)}
                      <small
                        className={`${
                          ele.speaking
                            ? "ipl_stories_speaking"
                            : "ipl_stories_notSpeaking"
                        }`}
                      >
                        {ele.host ? "Host" : ele.player ? "Player" : "Speaking"}
                      </small>
                    </div>
                  </div>
                </div>
              );
            })}
        </Slider>
      </div>
    </Container>
  );
};

export default IplTrivizhaSlider;
