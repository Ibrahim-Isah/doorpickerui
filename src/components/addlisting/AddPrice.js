import React, { useContext, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { FaDollarSign } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import { POST_SET } from "../../context/actions";
import { UserContext } from "../../context/UserProvider";
import { addPrice } from "../../store/api/post";

function AddPrice(props) {
  const [state, dispatch] = useContext(UserContext);
  const { draft } = state;
  const [price, setPrice] = useState(draft?.sellingPrice);
  const [firm, setFirm] = useState(false);
  const [terms, setTerms] = useState(false);
  const [al, setAlert] = useState({ show: false });
  const history = useHistory();
  console.log(terms, "terms");
  const _done = async () => {
    if (!state.user?.id) {
      setAlert({
        show: true,
        msg: "Login is required",
        variant: "danger",
        isLogin: true,
      });
      return;
    }
    if (!terms) {
      setAlert({
        show: true,
        msg: "T&C is mandatory!",
        variant: "danger",
      });
      return;
    }
    const toSave = {
      status: "LIVE",
      sellingPrice: price,
      id: state.draft.id,
      ownerId: state.user?.id,
      fixed: terms,
    };
    const post = await addPrice(toSave);
    dispatch({ type: POST_SET, data: post?.data });
    history.push("/", {
      from: "/add-listing/new",
    });
  };
  return (
    <>
      <div className="billing-form-item">
        <div className="billing-title-wrap">
          <h3 className="widget-title pb-0">Price</h3>
          <Alert
            variant={al?.variant}
            show={al?.show}
            onClose={() => setAlert({ show: false, msg: "" })}
            dismissible
          >
            {al?.msg}
            {al.isLogin && (
              <Button
                variant="link"
                style={{ marginLeft: "4px", textDecoration: "none" }}
                onClick={() =>
                  history.push("/login", {
                    from: "/add-listing/new",
                  })
                }
              >
                Go to login
              </Button>
            )}
          </Alert>
          <div className="title-shape margin-top-10px"></div>
        </div>
        <div className="billing-content">
          <div className="contact-form-action">
            <form method="post">
              <div className="row">
                <div className="col-lg-12">
                  <div className="custom-checkbox d-block mr-0">
                    <input
                      type="checkbox"
                      id="firm"
                      checked={firm}
                      onChange={() => setFirm(!firm)}
                    />
                    <label htmlFor="firm">Price is not negotiable</label>
                  </div>

                  {/* <div className="custom-checkbox d-block mr-0">
                    <input
                      type="checkbox"
                      id="firm"
                      checked={firm}
                      onChange={() => setFirm(!firm)}
                    />
                    <label htmlFor="privacy">Price is not negotiable</label>
                  </div> */}
                </div>
                <div className="col-lg-12">
                  <div className="input-box">
                    <label className="label-text">Price</label>
                    <div className="form-group">
                      <span className="la form-icon">
                        <FaDollarSign />
                      </span>
                      <input
                        className="form-control"
                        type="number"
                        name="price"
                        placeholder="NGN Price"
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <div className="billing-form-item p-0 border-0 mb-0 shadow-none">
        <div className="billing-content p-0">
          <div className="custom-checkbox d-block mr-0">
            <input
              type="checkbox"
              id="terms"
              onChange={() => setTerms(!terms)}
            />
            <label htmlFor="privacy">
              I Agree to DoorPicker's
              <Link to="#" className="color-text">
                Terms of Services & Privacy Policy
              </Link>
            </label>
          </div>

          <div className="btn-box mt-4">
            <button onClick={_done} className="theme-btn border-0">
              submit picket
            </button>
          </div>
        </div>
      </div> */}
      <div className="billing-form-item p-0 border-0 mb-0 shadow-none">
        <div className="billing-content p-0">
          <div className="custom-checkbox d-block mr-0">
            <input
              type="checkbox"
              id="terms"
              checked={terms}
              onChange={() => setTerms(!terms)}
            />
            <label htmlFor="terms">
              I Agree to DoorPicker's
              <Link to="#" className="color-text">
                Terms of Services
              </Link>
            </label>
          </div>
          <div className="btn-box mt-4">
            <button onClick={_done} className="theme-btn border-0">
              Publish Picket
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddPrice;
