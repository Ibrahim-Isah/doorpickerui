import React, { useEffect, useState } from "react";
import WidgetSimilarListing from "./widgets/WidgetSimilarListing";
import WidgetFollow from "./widgets/WidgetFollow";
import sectiondata from "../../store/store";
import { BsCheckCircle } from "react-icons/bs";
import WidgetDetail from "./widgets/WidgetDetail";
import { getSimilar } from "../../store/api/post";

function ListingDetailsSidebar(props) {
  const [similar, setSimi] = useState([]);
  useEffect(() => {
    async function mySimilar() {
      const r = await getSimilar(props.post?.category);
      setSimi(r?.data || []);
    }
    mySimilar();
  }, [props.post.id]);
  return (
    <>
      <div className="author-verified-badge margin-bottom-20px">
        <div
          className="author__verified-badge"
          data-toggle="tooltip"
          data-placement="top"
          title="Listing has been verified and belongs the business owner or manager"
        >
          <span className="d-inline-block">
            <BsCheckCircle />
          </span>
          Verified Listing
        </div>
      </div>
      <div className="sidebar section-bg">
        <WidgetDetail
          contents={sectiondata.listingDetails.sidebar.widgetAuthor}
          post={props.post}
        />
        {/* <WidgetStaticsInfo
          staticsinfo={sectiondata.listingDetails.sidebar.widgetStaticsInfo}
        /> */}
        {/* <WidgetBooking /> */}
        {/* <WidgetOpenHours
          openhours={sectiondata.listingDetails.sidebar.widgetOpenHours}
        /> */}
        {/* <WidgetCategory
          wCategories={sectiondata.listingDetails.sidebar.widgetCategories}
        /> */}
        {/* <WidgetTags
          tagcontent={sectiondata.listingDetails.sidebar.widgetTags}
        /> */}
        <WidgetSimilarListing similarcontent={similar} />
        {/* <WidgetSubscribe /> */}
        <WidgetFollow
          followconnect={sectiondata.listingDetails.sidebar.widgetFollowConnect}
        />
      </div>
    </>
  );
}

export default ListingDetailsSidebar;
