import React from "react";
import { MdStar } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { FaRegEnvelope } from "react-icons/fa";
import { BsPencil } from "react-icons/bs";
import PhotoUploader2 from "../addlisting/PhotoUploader2";
import { addMeta } from "../../store/api/post";
import { remi } from "../../store/store";
import { tComment } from "../../utils/tReview";

const states = {
  title: "Add a Review",
  subtitle:
    "Your email address will not be published. Required fields are marked *",
};
const _review = async () => {
  // hard coded data,  pls replace
  const data = {
    pid: 6,
    id: 21,
    fav: 1,
    share: 3,
    rating: 5,
    star: 4.5,
    review: JSON.stringify(remi.review),
  };
  const r = await addMeta(data);
  console.log(r);
};
function ReviewFields(props) {
  const addReview = (obj: tComment) => {
    // call this method to submit a review
    // capture the form input data into the obj argument

    props.doReview(obj);
  };
  return (
    <>
      <div className="add-review-listing padding-top-50px" id="review">
        <h2 className="widget-title">{states.title}</h2>
        <div className="title-shape"></div>
        <div className="section-heading padding-top-20px">
          <p className="sec__desc font-size-16">{states.subtitle}</p>
        </div>
        <ul className="rating-list padding-top-20px">
          <li>
            <span className="la d-inline-block">
              <MdStar />
            </span>
            <label className="review-label">
              <input type="radio" name="review-radio" />
              <span className="review-mark"></span>
            </label>
          </li>
          <li>
            <span className="la d-inline-block">
              <MdStar />
            </span>
            <span className="la d-inline-block">
              <MdStar />
            </span>
            <label className="review-label">
              <input type="radio" name="review-radio" />
              <span className="review-mark"></span>
            </label>
          </li>
          <li>
            <span className="la d-inline-block">
              <MdStar />
            </span>
            <span className="la d-inline-block">
              <MdStar />
            </span>
            <span className="la d-inline-block">
              <MdStar />
            </span>
            <label className="review-label">
              <input type="radio" name="review-radio" />
              <span className="review-mark"></span>
            </label>
          </li>
          <li>
            <span className="la d-inline-block">
              <MdStar />
            </span>
            <span className="la d-inline-block">
              <MdStar />
            </span>
            <span className="la d-inline-block">
              <MdStar />
            </span>
            <span className="la d-inline-block">
              <MdStar />
            </span>
            <label className="review-label">
              <input type="radio" name="review-radio" />
              <span className="review-mark"></span>
            </label>
          </li>
          <li>
            <span className="la d-inline-block">
              <MdStar />
            </span>
            <span className="la d-inline-block">
              <MdStar />
            </span>
            <span className="la d-inline-block">
              <MdStar />
            </span>
            <span className="la d-inline-block">
              <MdStar />
            </span>
            <span className="la d-inline-block">
              <MdStar />
            </span>
            <label className="review-label">
              <input type="radio" name="review-radio" />
              <span className="review-mark"></span>
            </label>
          </li>
        </ul>
        <div className="contact-form-action mt-5">
          <form>
            <div className="row">
              <div className="col-lg-6">
                <div className="input-box">
                  <label className="label-text">Name</label>
                  <div className="form-group">
                    <span className="la form-icon">
                      <AiOutlineUser />
                    </span>
                    <input
                      className="form-control"
                      type="text"
                      name="name"
                      placeholder="Your Name"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="input-box">
                  <label className="label-text">Email</label>
                  <div className="form-group">
                    <span className="la form-icon">
                      <FaRegEnvelope />
                    </span>
                    <input
                      className="form-control"
                      type="email"
                      name="email"
                      placeholder="Email Address"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="input-box">
                  <label className="label-text">Review</label>
                  <div className="form-group">
                    <span className="la form-icon">
                      <BsPencil />
                    </span>
                    <textarea
                      className="message-control form-control"
                      name="message"
                      placeholder="Write Message"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="upload-btn-box">
                  <form>
                    <PhotoUploader2 />

                    <button
                      className="theme-btn border-0 margin-top-20px"
                      type="submit"
                      value="submit"
                      onClick={_review}
                    >
                      Submit review
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default ReviewFields;
