import React from "react";
import { AiOutlineEye } from "react-icons/ai";
import { FiHeart, FiDollarSign } from "react-icons/fi";
import { FaLocationArrow } from "react-icons/fa";
import Slider from "react-slick";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const responsive = [
  {
    breakpoint: 1024,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 3,
      infinite: true,
      dots: true,
    },
  },
  {
    breakpoint: 768,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2,
      infinite: true,
      dots: true,
    },
  },
  {
    breakpoint: 600,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2,
      initialSlide: 2,
    },
  },
  {
    breakpoint: 480,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
    },
  },
];

function PlaceOne({ places }) {
  return (
    <div className="row mt-5">
      <div className="col-lg-12">
        <Slider
          className="places-carousel"
          dots={true}
          infinite={places?.length > 3}
          slidesToScroll={2}
          arrows={false}
          slidesToShow={3}
          centerMode={false}
          centerPadding="50px"
          autoplay={true}
          responsive={responsive}
        >
          {places?.map((item, index) => {
            return (
              <div className="card-item" key={index}>
                <a href={item.titleUrl} className="card-image-wrap">
                  <div className="card-image">
                    <img
                      src={item?.image || "https://via.placeholder.com/100x50"}
                      className="card__img"
                      alt="Place"
                    />
                    <span
                      className={
                        item.titleIcon ? "badge" : "badge badge-closed"
                      }
                    >
                      {item?.bedge | "bedge"}
                    </span>
                    <span
                      className="badge-toggle"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="22 Likes"
                    >
                      <FiHeart />
                    </span>
                  </div>
                </a>
                <div className="card-content-wrap">
                  <div className="card-content">
                    <a href={item?.titleUrl}>
                      <h5 className="card-meta">
                        <span>{item?.cardTypeIcon}</span> {item?.category}
                      </h5>
                      <h4 className="card-title">
                        <Link
                          to={{
                            pathname: "/listing-details",
                            state: { post: item },
                          }}
                        >
                          {item?.title}
                        </Link>
                        <i>{item?.titleIcon}</i>
                      </h4>
                      <p className="card-sub">{item?.stitle}</p>
                      <p>{item?.description}</p>
                    </a>
                    <a href={item?.authorUrl} className="author-img">
                      <img
                        src={item?.author || "https://via.placeholder.com/80"}
                        alt="author-img"
                      />
                    </a>
                    <ul className="info-list padding-top-20px">
                      <li>
                        <span className="la d-inline-block">
                          <FiDollarSign />
                        </span>
                        {item?.sellingPrice?.toLocaleString("en")}
                      </li>
                      <li>
                        <span className="la d-inline-block">
                          <FaLocationArrow />
                        </span>
                        {item.city}
                      </li>
                    </ul>
                  </div>
                  <div className="rating-row">
                    <div className="rating-rating">
                      {item?.ratings?.map((rating, index) => {
                        return <span key={index}>{rating}</span>;
                      })}
                      <span className="rating-count">{item?.ratingNum}</span>
                    </div>
                    <div className="listing-info">
                      <ul>
                        <li>
                          <span className="info__count">
                            <AiOutlineEye />
                          </span>
                          {item?.view}
                        </li>
                        <li>
                          <span
                            className="info__save"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Bookmark"
                          >
                            <FiHeart />
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}

export default PlaceOne;
