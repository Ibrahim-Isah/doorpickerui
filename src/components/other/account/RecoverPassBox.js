import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegEnvelope, FaUserSecret } from "react-icons/fa";

function RecoverPassBox(props) {
  const [token, setToken] = useState(null);
  const [isValid, setValid] = useState(null);
  return (
    <>
      <section className="form-shared padding-top-40px padding-bottom-100px">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mx-auto">
              <div className="billing-form-item mb-0">
                <div className="billing-title-wrap">
                  <h3 className="widget-title font-size-28">
                    Recover Password!
                  </h3>
                  <p className="font-size-16 font-weight-medium">
                    Enter your email or phone number to reset password. A reset
                    code will be sent to you. If you have any issue about reset
                    password
                    <Link to="/contact" className="color-text">
                      contact us
                    </Link>
                  </p>
                </div>
                <div className="billing-content">
                  <div className="contact-form-action">
                    <form>
                      <div className="input-box">
                        <label className="label-text">
                          Your Email or Phone Number(for example 0807136662)
                        </label>
                        <div className="form-group">
                          <span className="la form-icon">
                            <FaRegEnvelope />
                          </span>
                          <input
                            className="form-control"
                            type="text"
                            name="text"
                            placeholder="Enter email address or phone number"
                          />
                        </div>
                      </div>
                      <div className="input-box">
                        <label className="label-text">
                          Token (Sent to your email or phone)
                        </label>
                        <div className="form-group">
                          <span className="la form-icon">
                            <FaRegEnvelope />
                          </span>
                          <input
                            className="form-control"
                            type="text"
                            name="text"
                            placeholder="Token (Sent to your email or phone)"
                          />
                        </div>
                      </div>
                      <div className="input-box">
                        <label className="label-text">Password</label>
                        <div className="form-group">
                          <span className="la form-icon">
                            <FaUserSecret />
                          </span>
                          <input
                            className="form-control"
                            type="text"
                            name="text"
                            placeholder="New password"
                          />
                        </div>
                      </div>
                      <div className="input-box">
                        <label className="label-text">Confirm Password</label>
                        <div className="form-group">
                          <span className="la form-icon">
                            <FaUserSecret />
                          </span>
                          <input
                            className="form-control"
                            type="text"
                            name="text"
                            placeholder="Confirm new password"
                          />
                        </div>
                      </div>
                      <div className="btn-box margin-top-20px margin-bottom-20px">
                        <button className="theme-btn border-0" type="submit">
                          reset password
                        </button>
                      </div>
                      <p className="font-weight-medium">
                        <Link to="/login" className="color-text">
                          Login{" "}
                        </Link>
                        or{" "}
                        <Link to="/sign-up" className="color-text">
                          Register
                        </Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default RecoverPassBox;
