import React from "react";
import { BsEye } from "react-icons/bs";
import Button from "../../common/Button";
import { Link } from "react-router-dom";
import { s3path } from "../../../utils/constant";

function WidgetSimilarListing(props) {
  const { similarcontent } = props;
  return (
    <>
      <div className="sidebar-widget similar-widget">
        <h3 className="widget-title">Similar Items</h3>
        <div className="title-shape"></div>
        <div className="similar-list padding-top-30px">
          {similarcontent?.map((item, i) => {
            return (
              <div className="recent-item" key={i}>
                <div className="recent-img">
                  <Link to={item.title}>
                    <img
                      src={`${s3path}${item?.images[0]}`}
                      alt={item?.title}
                    />
                  </Link>
                </div>
                <div className="recentpost-body">
                  <h4 className="recent__link">
                    <Link to={item.title}>{item.title}</Link>
                  </h4>
                  <div className="rating-rating">
                    {item?.stars?.map((icon, i) => {
                      return (
                        <span key={i} className="la la-star">
                          {icon}
                        </span>
                      );
                    })}
                  </div>
                  <p className="recent__meta">
                    <span className="color-text font-weight-bold">
                      {item?.sellingPrice}
                    </span>{" "}
                    <Link to={item?.catUrl}>{item?.cat}</Link>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="btn-box text-center padding-top-30px">
          <Button
            text="see all listings"
            url="/listing-grid"
            className="d-block"
          >
            <BsEye />
          </Button>
        </div>
      </div>
    </>
  );
}

export default WidgetSimilarListing;
