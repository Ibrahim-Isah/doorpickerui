import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { FaRegEnvelope } from "react-icons/fa";
import { FiExternalLink, FiPhone } from "react-icons/fi";
import { GiPositionMarker } from "react-icons/gi";
import Button from "../../common/Button";

const WidgetDetail = (props) => {
  const { contents, post } = props;

  return (
    <>
      <div className="sidebar-widget">
        <div className="author-bio margin-bottom-30px">
          <div className="d-flex align-items-center">
            <img src={contents.authorImg} alt="author" />
            <div className="author-inner-bio">
              <h4 className="author__title font-weight-bold pb-0 mb-1">
                {`${post?.ownerFirstname || "DP"} ${
                  post?.ownerLastname || "Admin"
                }`}
              </h4>
              <p className="author__meta">{contents.date}</p>
            </div>
          </div>
        </div>
        <div className="info-list">
          <ul>
            <li className="mb-2">
              <i className="la">
                <GiPositionMarker />
              </i>
              {`${post.location}, ${post.city}`}
            </li>
            {/* <li className="mb-2">
              <i className="la">
                <FaRegEnvelope />
              </i>
              <a href={"mailto:" + post.ownerEmail}>{contents.ownerEmail}</a>
            </li> */}
            <li className="mb-2">
              <i className="la">
                <FiPhone />
              </i>
              0803-xxx-xxxx
            </li>
            {/* <li className="mb-2">
              <i className="la">
                <FiExternalLink />
              </i>
              <a href={contents.websiteUrl}>{contents.website}</a>
            </li> */}
          </ul>
        </div>
        <div className="section-block-2 margin-top-35px margin-bottom-35px"></div>
        {/* <ul className="social-profile margin-bottom-35px text-center">
          {contents.socials.map((item, index) => {
            return (
              <li key={index}>
                <a href={item.url}>
                  <i className="d-inline-block">{item.icon}</i>
                </a>
              </li>
            );
          })}
        </ul> */}
        <div className="btn-box text-center">
          <Button
            text="chat"
            url={{
              pathname: "/listing-chat",
              state: { post: post },
            }}
            className="d-block"
          >
            <span className="d-inline-block">
              <AiOutlineUser />
            </span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default WidgetDetail;
