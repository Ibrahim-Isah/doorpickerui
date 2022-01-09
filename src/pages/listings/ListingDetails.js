import React, { useEffect, useState } from "react";
import GeneralHeader from "../../components/common/GeneralHeader";
import ListingDetailsBreadcrumb from "./ListingDetailsBreadcrumb";
import ListingDetailsSidebar from "../../components/sidebars/ListingDetailsSidebar";
import ListingDetailsGallery from "../../components/sliders/ListingDetailsGallery";
import GeneralMap from "../../components/contact/GeneralMap";
import CustomerFeedback from "../../components/sidebars/widgets/CustomerFeedback";
import ListingDetailsComments from "../../components/contact/ListingDetailsComments";
import ReviewFields from "../../components/contact/ReviewFields";
import Footer from "../../components/common/footer/Footer";
import ScrollTopBtn from "../../components/common/ScrollTopBtn";
import sectiondata from "../../store/store";
import { postMeta } from "../../store/api/post";
import { BsCheckCircle } from "react-icons/bs";

function ListingDetails(props) {
  const p = props?.location?.state?.post || {};
  //const [isOpen, setOpen] = useState(false);
  const [meta, setMeta] = useState({});
  useEffect(() => {
    async function getMeta() {
      const r = await postMeta(p.id);
      setMeta(r?.data || {});
    }
    getMeta();
  }, []);

  // const openModal = () => {
  //   setOpen(true);
  // };
  const contentstate = {
    mapTitle: "Location",
    peopleViewtitle: "People Also Viewed",
  };
  const rev = meta?.review ? JSON.parse(meta.review) : [];

  return (
    <main className="listing-details">
      <GeneralHeader />
      <ListingDetailsBreadcrumb post={p} meta={meta} />
      {/* <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId={sectiondata.listingDetails.videoid}
        onClose={() => setOpen(false)}
      /> */}
      <section className="single-listing-area padding-top-35px">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="single-listing-wrap">
                <ListingDetailsGallery images={p?.images || []} />
                <div className="listing-description padding-top-40px padding-bottom-35px">
                  <h2 className="widget-title">
                    {sectiondata.listingDetails.descriptiontitle}
                  </h2>
                  <div className="title-shape"></div>
                  <div className="section-heading mt-4">
                    <p className="sec__desc font-size-16">{p?.description}</p>
                  </div>
                </div>

                <div className="feature-listing padding-bottom-20px">
                  <h2 className="widget-title">
                    {sectiondata.listingDetails.featurestitle}
                  </h2>
                  <div className="title-shape"></div>
                  <ul className="list-items mt-4">
                    <li>
                      <i className="color-text font-size-18">
                        <BsCheckCircle />
                      </i>{" "}
                      Fixed Price: {p?.fixed || false}
                    </li>
                    <li>
                      <i className="color-text font-size-18">
                        <BsCheckCircle />
                      </i>{" "}
                      Condition: {p?.condition || "NA"}
                    </li>
                    <li>
                      <i className="color-text font-size-18">
                        <BsCheckCircle />
                      </i>{" "}
                      Category: {p?.category || "NA"}
                    </li>
                    <li>
                      <i className="color-text font-size-18">
                        <BsCheckCircle />
                      </i>{" "}
                      Sub Category: {p?.subCategory || "NA"}
                    </li>
                    <li>
                      <i className="color-text font-size-18">
                        <BsCheckCircle />
                      </i>{" "}
                      Color: {p?.color || "NA"}
                    </li>
                    <li>
                      <i className="color-text font-size-18">
                        <BsCheckCircle />
                      </i>{" "}
                      Type: {p?.make || "NA"}
                    </li>
                  </ul>
                </div>

                {/* <div className="video-listing padding-bottom-40px">
                    <h2 className="widget-title">
                      {sectiondata.listingDetails.videotitle}
                    </h2>
                    <div className="title-shape"></div>
                    <div className="video__box margin-top-35px text-center">
                      <img
                        src={sectiondata.listingDetails.videoImg}
                        alt="video"
                      />
                      <div className="video__box-content">
                        <span
                          className="mfp-iframe video-popup-btn video-play-btn"
                          onClick={this.openModal}
                          title="Play Video"
                        >
                          <span className="d-inline-block">
                            <AiOutlinePlayCircle />
                          </span>
                        </span>
                        <p className="video__desc">
                          {sectiondata.listingDetails.videobtn}
                        </p>
                      </div>
                    </div>
                  </div> */}

                {/* <div className="listing-map gmaps">
                  <h2 className="widget-title">{contentstate.mapTitle}</h2>
                  <div className="title-shape margin-bottom-35px"></div>
                  <GeneralMap />
                </div> */}
                <CustomerFeedback meta={meta} />
                <div className="comments-wrap">
                  <h2 className="widget-title">
                    {meta?.review?.length || 0} Review(s)
                  </h2>
                  <div className="title-shape"></div>
                  <ListingDetailsComments commentlists={rev} />
                </div>
                <ReviewFields />
              </div>
            </div>
            <div className="col-lg-4">
              <ListingDetailsSidebar post={p} />
            </div>
          </div>
        </div>
      </section>

      {/* <section className="card-area padding-top-80px padding-bottom-100px">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-heading">
                <h2 className="widget-title">{contentstate.peopleViewtitle}</h2>
                <div className="title-shape"></div>
              </div>
            </div>
          </div>
          <PlaceOne places={sectiondata.mostvisitedplaces.places} />
        </div>
      </section> */}
      <Footer />
      <ScrollTopBtn />
    </main>
  );
  //}
}

export default ListingDetails;
