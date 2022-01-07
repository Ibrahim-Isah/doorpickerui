import React, { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineUser } from "react-icons/ai";
import { FaMobile, FaRegEnvelope } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";
import Footer from "../components/common/footer/Footer";
import GeneralHeader from "../components/common/GeneralHeader";
import ScrollTopBtn from "../components/common/ScrollTopBtn";
import { userIsTaken } from "../store/api/user";
import breadcrumbimg from "../assets/images/bread-bg.jpg";
import Breadcrumb from "../components/common/Breadcrumb";
import { Alert } from "react-bootstrap";
import { ALERT_SHOW } from "../context/actions";
import { UserContext } from "../context/UserProvider";
function SignupAdmin(props) {
  const [state, dispatch] = useContext(UserContext);
  const password = useRef({});
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const { _submit } = props;
  const [breadc] = useState(breadcrumbimg);
  return (
    <main className="signup-page">
      <GeneralHeader />
      <Breadcrumb CurrentPgTitle="Sign Up" img={breadc} />
      <section className="form-shared padding-top-40px padding-bottom-100px">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mx-auto">
              <div className="billing-form-item mb-0">
                <div className="billing-title-wrap border-bottom-0 pr-0 pl-0 pb-0 text-center">
                  <h3 className="widget-title font-size-28 pb-0">
                    New Admin User
                  </h3>
                  <p className="font-size-16 font-weight-medium">add admin</p>
                </div>
                <Alert
                  show={false}
                  variant={""}
                  dismissible
                  onClose={() =>
                    dispatch({
                      type: ALERT_SHOW,
                      data: {
                        show: false,
                      },
                    })
                  }
                >
                  ""
                </Alert>

                <div className="billing-content">
                  <div className="contact-form-action">
                    <form method="post">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="input-box">
                            <label className="label-text">*First name</label>
                            {errors.firstname && (
                              <span role="alert" className="color-text">
                                {errors.firstname.message}
                              </span>
                            )}
                            <div className="form-group">
                              <span className="form-icon">
                                <AiOutlineUser />
                              </span>
                              <input
                                className="form-control"
                                type="text"
                                name="firstname"
                                placeholder="First name"
                                {...register("firstname", {
                                  required: "required!",
                                })}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="input-box">
                            <label className="label-text">Last name</label>
                            <div className="form-group">
                              <span className="form-icon">
                                <AiOutlineUser />
                              </span>
                              <input
                                className="form-control"
                                type="text"
                                name="lastname"
                                placeholder="Last name"
                                {...register("lastname")}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="input-box">
                            <label className="label-text">Username</label>
                            {errors.username && (
                              <span role="alert" className="color-text">
                                {errors.username.message}
                              </span>
                            )}
                            <div className="form-group">
                              <span className="form-icon">
                                <AiOutlineUser />
                              </span>
                              <input
                                className="form-control"
                                type="text"
                                name="username"
                                placeholder="Username"
                                {...register("username", {
                                  validate: {
                                    isUsernameTaken: async (value) =>
                                      (await userIsTaken(value)) &&
                                      "Username is taken",
                                  },
                                })}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="input-box">
                            <label className="label-text">*Email</label>
                            {errors.email && (
                              <span role="alert" className="color-text">
                                {errors.email.message}
                              </span>
                            )}
                            <div className="form-group">
                              <span className="form-icon">
                                <FaRegEnvelope />
                              </span>
                              <input
                                className="form-control"
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                {...register("email", {
                                  required: "required",
                                  pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Invalid !",
                                  },
                                  validate: {
                                    isEmailTaken: async (userEmail = "test") =>
                                      (await userIsTaken(userEmail)) === true &&
                                      "Email is already taken",
                                  },
                                })}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="input-box">
                            <label className="label-text">*Phone</label>
                            {errors.phone && (
                              <span role="alert" className="color-text">
                                {errors.phone.message}
                              </span>
                            )}
                            <div className="form-group">
                              <span className="form-icon">
                                <FaMobile />
                              </span>
                              <input
                                className="form-control"
                                type="number"
                                name="phone"
                                maxLength={11}
                                placeholder="numbers only e.g 08031234567"
                                {...register("phone", {
                                  required: "required",
                                  pattern: {
                                    value: /^[0-9]{11}$/,
                                    message: "11 digits GSM number ",
                                  },
                                })}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="input-box">
                            <label className="label-text">*Password</label>
                            {errors.password && (
                              <span role="alert" className="color-text">
                                {errors.password.message}
                              </span>
                            )}
                            <div className="form-group">
                              <span className="form-icon">
                                <FiLock />
                              </span>
                              <input
                                className="form-control"
                                type="password"
                                name="password"
                                placeholder="Password"
                                {...register("password", {
                                  required: "required!",
                                })}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="input-box">
                            <label className="label-text">
                              *Confirm Password
                            </label>
                            {errors.confirm && (
                              <span role="alert" className="color-text">
                                {errors.confirm.message}
                              </span>
                            )}
                            <div className="form-group">
                              <span className="form-icon">
                                <FiLock />
                              </span>
                              <input
                                className="form-control"
                                type="password"
                                name="confirm"
                                placeholder="Confirm password"
                                {...register("confirm", {
                                  validate: (v) =>
                                    v === password.current ||
                                    "Password do not match!",
                                })}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <div className="custom-checkbox d-block mr-0">
                              <input
                                type="checkbox"
                                id="chb14"
                                {...register("terms", {
                                  required: "required!",
                                })}
                              />
                              {errors.terms && (
                                <span role="alert" className="color-text">
                                  {errors.terms.message}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="btn-box margin-top-20px margin-bottom-20px">
                            <button
                              className="theme-btn border-0"
                              onClick={handleSubmit(_submit)}
                            >
                              Add Admin
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <ScrollTopBtn />
    </main>
  );
}

export default SignupAdmin;
