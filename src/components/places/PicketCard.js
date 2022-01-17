import React from "react";
import { AiOutlineEye } from "react-icons/ai";
import { FaLocationArrow } from "react-icons/fa";
import { FiDollarSign, FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { s3path } from "../../utils/constant";

const PicketCard = ({ item }) => {
  return (
    <div className="card-item col-lg-4 col-md-6">
      <a href={item.titleUrl} className="card-image-wrap">
        <div className="card-image">
          <img
            src={
              item?.images
                ? s3path.concat(item?.images[0])
                : "https://via.placeholder.com/100x50"
            }
            width={375}
            height={250}
            className="card__img"
            alt="PickIt"
          />
          {/* <span
                    className={
                      item?.condition === "new" ? "badge" : "badge badge-closed"
                    }
                  >
                    {item?.condition | "bedge"}
                  </span> */}
          {/* <span
                    className="badge-toggle"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="22 Likes"
                  >
                    <FiHeart />
                  </span> */}
        </div>
      </a>
      <div className="card-content-wrap">
        <div className="card-content">
          <h5 className="card-meta">
            <span></span> {item?.category}
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
          </h4>
          <p className="card-sub">{item?.stitle}</p>
          <p>{item?.description}</p>

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
};

export default PicketCard;
