import React, { useContext, useEffect } from "react";
import { IoIosLink } from "react-icons/io";
import { FiDollarSign, FiHeart, FiPhone } from "react-icons/fi";
import { FaRegCalendarCheck } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getPosts } from "../../store/api/post";
import { UserContext } from "../../context/UserProvider";
export const auth = {
  headers: { Authorization: `Basic ${process.env.REACT_APP_AUTH}` },
};
function PlaceGrid({ griditems }) {
  const [state, dispatch] = useContext(UserContext);
  const { posts } = state;
  useEffect(() => {
    async function getData() {
      const d = await getPosts();
      if (!d.ok) {
        console.log(d, " error");
      }
      console.log(d);
      dispatch({ type: "POSTS_SET", data: d?.data });
    }
    getData();
  }, []);
  return (
    <>
      {posts?.map((item, index) => {
        return (
          <div className="col-lg-4 column-td-6" key={index}>
            <div className="card-item">
              <Link to={item.titleUrl} className="card-image-wrap">
                <div className="card-image">
                  <img
                    src={item?.image || "https://via.placeholder.com/389x200"}
                    className="card__img"
                    alt="Place"
                  />
                  <span
                    className={item.titleIcon ? "badge" : "badge badge-closed"}
                  >
                    {item?.bedge || "New"}
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
              </Link>
              <div className="card-content-wrap">
                <div className="card-content">
                  <Link to={item.title}>
                    <h5 className="card-meta">
                      <span>{item.cardTypeIcon}</span> {item.category}
                    </h5>
                    <h4 className="card-title">
                      {item.title}
                      <i>{item.titleIcon}</i>
                    </h4>
                    <p className="card-sub">{item.location || "Location"}</p>
                  </Link>
                  <a href={item.authorUrl} className="author-img">
                    <img
                      src={item?.author || "https://via.placeholder.com/50"}
                      alt="author-img"
                    />
                  </a>
                  <ul className="info-list padding-top-20px">
                    <li>
                      <span className="la d-inline-block">
                        <FiDollarSign />
                      </span>{" "}
                      {item.sellingPrice}
                    </li>
                    {/* <li>
                      <span className="la d-inline-block">
                        <IoIosLink />
                      </span>{" "}
                      <a href={item.websiteUrl}>{item.website}</a>
                    </li> */}
                    <li>
                      <span className="la d-inline-block">
                        <FaRegCalendarCheck />
                      </span>{" "}
                      {item.updatedOn}
                    </li>
                  </ul>
                </div>
                <div className="rating-row">
                  <div className="rating-rating">
                    {item?.ratings?.map((rating, index) => {
                      return <span key={index}>{rating}</span>;
                    })}
                    <span className="rating-count">{item.ratingNum}</span>
                  </div>
                  <div className="listing-info">
                    <ul>
                      <li>
                        <span className="info__count">
                          <AiOutlineEye />
                        </span>{" "}
                        {item.view}
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
          </div>
        );
      })}
    </>
  );
}

export default PlaceGrid;
