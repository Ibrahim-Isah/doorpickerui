import React, { useContext, useRef } from "react";
import SignInOptions from "./SignInOptions";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../../context/UserProvider";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AiOutlineUser } from "react-icons/ai";
import { FaMobile, FaRegEnvelope } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import { userSignup, userIsTaken } from "../../../store/api/user";
import { ALERT_SHOW, USER_SET } from "../../../context/actions";
import { Alert } from "react-bootstrap";

function SignUpBox({ title, subtitle }) {
  const password = useRef({});
  const history = useHistory();
  const [state, dispatch] = useContext(UserContext);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  password.current = watch("password", "");
  const _submit = async (data) => {
    const user = await userSignup(data);
    if (user.error) {
      // sign up failed!
      dispatch({
        type: ALERT_SHOW,
        data: {
          variant: "danger",
          show: true,
          msg: "Signup failed, please retry!",
        },
      });
    }
    if (user.data) {
      const { data } = user;
      dispatch({ type: USER_SET, data });
      dispatch({
        type: ALERT_SHOW,
        data: {
          variant: "success",
          show: true,
          msg: `Welcome ${data.firstname} , please check your phone and email for more info!`,
        },
      });
      reset();
      // navigate to confirmation page
      history.push({ pathname: "/confirmation", state: { phone: data.phone } });
    }
  };

  return (
    <>
      <div className="billing-form-item mb-0">
        <div className="billing-title-wrap border-bottom-0 pr-0 pl-0 pb-0 text-center">
          <h3 className="widget-title font-size-28 pb-0">{title}</h3>
          <p className="font-size-16 font-weight-medium">{subtitle}</p>
        </div>
        <Alert
          show={state.alert?.show}
          variant={state.alert?.variant}
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
          {state.alert?.msg}
        </Alert>

        <div className="billing-content">
          <div className="contact-form-action">
            <form method="post">
              <div className="row">
                <SignInOptions />

                <div className="col-lg-12">
                  <div className="account-assist mt-4 mb-4 text-center">
                    <p className="account__desc">or</p>
                  </div>
                </div>
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
                        {...register("firstname", { required: "required!" })}
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
                              (await userIsTaken(value)) && "Username is taken",
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
                        {...register("password", { required: "required!" })}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="input-box">
                    <label className="label-text">*Confirm Password</label>
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
                            v === password.current || "Password do not match!",
                        })}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    {/* <div className="custom-checkbox d-block mr-0">
                      <input type="checkbox" id="chb13" />
                      <label htmlFor="chb13">
                        I Agree to DoorPicker's
                        <Link to="#" className="color-text">
                          Privacy Policy
                        </Link>
                      </label>
                    </div> */}
                    <div className="custom-checkbox d-block mr-0">
                      <input
                        type="checkbox"
                        id="chb14"
                        {...register("terms", { required: "required!" })}
                      />
                      {errors.terms && (
                        <span role="alert" className="color-text">
                          {errors.terms.message}
                        </span>
                      )}
                      <label htmlFor="chb14">
                        * I Agree to DoorPicker's
                        <Link to="#" className="color-text">
                          Terms of Services and Privacy
                        </Link>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="btn-box margin-top-20px margin-bottom-20px">
                    <button
                      className="theme-btn border-0"
                      onClick={handleSubmit(_submit)}
                    >
                      Register account
                    </button>
                  </div>
                </div>
                <div className="col-lg-12">
                  <p className="font-weight-medium">
                    Already have an account?
                    <Link to="/login" className="color-text">
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpBox;
