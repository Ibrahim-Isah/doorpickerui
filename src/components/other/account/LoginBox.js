import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import SignInOptions from "./SignInOptions";
import { AiOutlineUser } from "react-icons/ai";
import { FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/UserProvider";
import { userLogin } from "../../../store/api/user";
import { USER_SET } from "../../../context/actions";

function LoginBox({ title, subtitle, from }) {
  const [state, dispatch] = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const dest = from ? from : "/";
  useEffect(() => {
    state.user?.id && history.push(dest);
  }, [state.user, dest, history]);
  const _submit = async () => {
    if (email.length > 0 && password.length > 0) {
      const obj = { email, password };
      const response = await userLogin(obj);
      if (!response.data) {
        alert("Login failed");
        return;
      }
      const isAuth = { ...response?.data, auth: true };
      dispatch({ type: USER_SET, data: isAuth });
      history.push(dest, {
        user: isAuth,
      });
    }
  };
  return (
    <>
      <div className="billing-form-item mb-0">
        <div className="billing-title-wrap border-bottom-0 pr-0 pl-0 pb-0 text-center">
          <h3 className="widget-title font-size-28 pb-0">{title}</h3>
          <p className="font-size-16 font-weight-medium">{subtitle}</p>
        </div>
        <div className="billing-content">
          <div className="contact-form-action">
            <div className="row">
              <SignInOptions />

              <div className="col-lg-12">
                <div className="account-assist mt-4 mb-4 text-center">
                  <p className="account__desc">or</p>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="input-box">
                  <label className="label-text">Username, or email</label>
                  <div className="form-group">
                    <span className="form-icon">
                      <AiOutlineUser />
                    </span>
                    <input
                      className="form-control"
                      type="email"
                      name="text"
                      placeholder="Username, or email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="input-box">
                  <label className="label-text">Password</label>
                  <div className="form-group">
                    <span className="form-icon">
                      <FiLock />
                    </span>
                    <input
                      className="form-control"
                      type="password"
                      name="text"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <div className="custom-checkbox mr-0 d-flex align-items-center justify-content-between">
                    <div>
                      <input type="checkbox" id="chb1" />
                      <label htmlFor="chb1">Remember Me</label>
                    </div>
                    <div>
                      <Link
                        to="/recover"
                        className="color-text font-weight-medium"
                      >
                        Forgot password?
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="btn-box margin-top-20px margin-bottom-20px">
                  <button className="theme-btn border-0" onClick={_submit}>
                    Login now
                  </button>
                </div>
              </div>
              <div className="col-lg-12">
                <p className="font-weight-medium">
                  Not a member?{" "}
                  <Link to="/sign-up" className="color-text">
                    {" "}
                    Register
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginBox;
