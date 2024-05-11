import React, { Fragment } from "react";
import Slider from "react-slick";
import clock from "assets/images/Home-img/sand-clock.png";
import blob from "assets/images/Home-img/first-blob.png";
import { Link } from "react-router-dom";

const DashSlider = (props) => {
  const { bannersList } = props;
  const settings = {
    // dots: true,
    infinite: false,
    speed: 500,
    arrows: false,
    slidesToShow: 2,
    slidesToScroll: 1,
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
          slidesToShow: 2.1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2.1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          // slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          // slidesToShow: 1.8,
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 430,
        settings: {
          // slidesToShow: 1.5,
          slidesToShow: 1.1,
        },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {bannersList?.map((ele, ind) => {
          const { image, is_active, url, role_number } = ele;
          return (
            <div
              className={`hero_slider ${
                ind % 2 === 0 ? "slider_two_bg " : " "
              } d-flex`}
              key={ind}
            >
              <Link to={url} target="_blank">
                <Fragment>
                  {/* <div className="hero_slider_lhs">
                        <h3 className="text_3">Expiring Soon Trades</h3>
                        <p>Get Rewarded soon by trading Events to Close Soon</p>
                      </div> */}
                  <div className="slider_img">
                    <img src={image} className="w-100" alt="sand clock" />
                  </div>
                  {/* <img
                    src={blob}
                    alt="blob"
                    width={105}
                    height={109}
                    className="slider_blob_first"
                  /> */}
                </Fragment>
              </Link>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default DashSlider;
