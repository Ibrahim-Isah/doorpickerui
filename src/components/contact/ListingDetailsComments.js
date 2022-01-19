import React from "react";
import { FiRefreshCw } from "react-icons/fi";
import Button from "../common/Button";
import SectionDivider from "../common/SectionDivider";
import { Link } from "react-router-dom";
import { RiReplyLine } from "react-icons/ri";
import { MdStar } from "react-icons/md";

function ListingDetailsComments(props) {
  const { commentlists } = props;
  return (
    <>
      <ul className="comments-list padding-top-40px">
        <li>
          {commentlists?.length > 0 &&
            commentlists.map((item, i) => {
              return (
                <div key={i}>
                  <div className="comment">
                    {/* <img
                      className="avatar__img"
                      alt="Comment"
                      src={item?.img}
                    /> */}
                    <div className="comment-body">
                      <div className="meta-data">
                        <span className="comment__author">{item?.name}</span>
                        <span className="comment__date">
                          {new Date(item?.date).toLocaleDateString()}{" "}
                          <div className="rating-rating">
                            {[...Array(item?.star)].map((i, idx) => (
                              <span className="la la-star" key={idx}>
                                <MdStar />
                              </span>
                            ))}{" "}
                          </div>
                        </span>
                      </div>
                      <p className="comment-content">{item?.content}</p>
                      <div className="comment-reply d-flex justify-content-between align-items-center">
                        <Link className="theme-btn comment__btn" to="#">
                          <i className="la d-inline-block">
                            <RiReplyLine />
                          </i>
                          Reply
                        </Link>
                        {/* <p className="feedback-box">
                                                Was this review?
                                                <button type="button" className="theme-btn">
                                                    <i className="la d-inline-block"><FiThumbsUp /></i> Helpful
                                                </button>
                                                <button type="button" className="theme-btn">
                                                    <i className="la d-inline-block"><FaRegSmile /></i> Funny
                                                </button>
                                            </p> */}
                      </div>
                    </div>
                  </div>

                  {item?.replyComments
                    ? item.replyComments.map((item2, index2) => {
                        return (
                          <ul className="comments-reply" key={index2}>
                            <li>
                              <div className="comment">
                                {/* <img
                                  className="avatar__img"
                                  alt="Comment"
                                  src={item2.img}
                                /> */}
                                <div className="comment-body">
                                  <div className="meta-data">
                                    <span className="comment__author">
                                      {item2.name}
                                    </span>
                                    <span className="comment__date">
                                      {item2.date}
                                    </span>
                                  </div>
                                  <p className="comment-content">
                                    {item2.content}
                                  </p>
                                  <div className="comment-reply d-flex justify-content-between align-item2s-center">
                                    <Link
                                      className="theme-btn comment__btn"
                                      to="#"
                                    >
                                      <i className="la d-inline-block">
                                        {item2.replyBtnIcon}
                                      </i>{" "}
                                      {item2.replyBtn}
                                    </Link>
                                    {/* <p className="feedback-box">
                                      Was this review?
                                      <button
                                        type="button"
                                        className="theme-btn"
                                      >
                                        <i className="la d-inline-block">
                                          <FiThumbsUp />
                                        </i>{" "}
                                        Helpful
                                      </button>
                                      <button
                                        type="button"
                                        className="theme-btn"
                                      >
                                        <i className="la d-inline-block">
                                          <FaRegSmile />
                                        </i>{" "}
                                        Funny
                                      </button>
                                    </p> */}
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        );
                      })
                    : ""}
                </div>
              );
            })}
        </li>
      </ul>
      <SectionDivider />
      <div className="button-shared padding-top-40px text-center">
        <Button url="#" text="Load more review" className="border-0">
          <FiRefreshCw />
        </Button>
      </div>
    </>
  );
}

export default ListingDetailsComments;
