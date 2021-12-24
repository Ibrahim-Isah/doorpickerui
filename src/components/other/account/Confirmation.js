import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { FiCheckCircle } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { USER_SET } from "../../../context/actions";
import { UserContext } from "../../../context/UserProvider";
import { doConfirmation } from "../../../store/api/user";
import Footer from "../../common/footer/Footer";
import GenAlert from "../../common/GenAlert";
import GeneralHeader from "../../common/GeneralHeader";
import ScrollTopBtn from "../../common/ScrollTopBtn";

function Confirmation(props) {
  const [tk, setTk] = useState("");
  const [al, setAlert] = useState(null);
  const history = useHistory();
  const [state, dispatch] = useContext(UserContext);
  const phone = props.location?.state?.phone || state?.user?.phone;
  console.log(state.user);
  const _token = async () => {
    if (tk.length > 0) {
      const d = await doConfirmation(tk, phone);
      if (d.error) {
        setAlert({
          variant: "danger",
          msg: "Confirmation Failed!",
          isAlert: true,
        });
      }
      setAlert({
        variant: "success",
        msg: "Confirmation Succesful!",
        isAlert: true,
      });
      const toStore = { ...d?.data, auth: true };
      dispatch({ type: USER_SET, data: toStore });
      history.push("/");
    }
  };
  return (
    <main className="booking-confirmation-page">
      {/* Header */}
      <GeneralHeader />
      <GenAlert alert={al} />

      <section className="booking-confirm-area padding-top-200px padding-bottom-140px overflow-hidden">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="booking-confirm-page text-center">
                <span className="la">
                  <FiCheckCircle />
                </span>
                <div className="section-heading pt-3">
                  <GenAlert />
                  <h2 className="sec__title pt-0 mb-2 before-none">
                    Thanks for signing up! {state?.user?.firstname}
                  </h2>

                  <p className="sec__desc">
                    Kindly input the confirmation code sent to {phone}.
                  </p>
                </div>
                <div className="row">
                  <div className="col-md-4"></div>
                  <div className="col-md-4">
                    <div className="input-box">
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="number"
                          name="token"
                          align="center"
                          placeholder="numbers only e.g 1234"
                          onChange={(e) => setTk(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4"></div>
                </div>

                <div className="btn-box padding-top-30px">
                  <Button onClick={_token}>Submit Token</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      <ScrollTopBtn />
    </main>
  );
}

export default Confirmation;
