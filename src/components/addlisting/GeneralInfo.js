import React, { useContext, useEffect, useState } from "react";
import * as firebaseApi from "../../store/api/firebaseApi";
import { Alert, Button } from "react-bootstrap";
import { BsPencilSquare, BsPencil } from "react-icons/bs";
import Select from "react-select";
import { DRAFT_SET } from "../../context/actions";
import { UserContext } from "../../context/UserProvider";
import { addPicket } from "../../store/api/post";
import * as cats from "../../utils/category.json";
import { useHistory } from "react-router-dom";
const ca = cats.category.map((c) => {
  return { value: c.cat, label: c.cat };
});
const condit = cats.condition.map((cc) => {
  return { value: cc, label: cc };
});

function GeneralInfo(props) {
  const [state, dispatch] = useContext(UserContext);

  const history = useHistory();
  const [dr, setDraft] = useState({});
  useEffect(() => {
    setDraft(state.draft);
  }, [state.draft]);
  const [sub, setSub] = useState(null);
  const [t, setT] = useState([]);
  const [res, setRes] = useState({
    cat: state.draft?.category,
    subcat: state.draft?.subCategory,
    type: state.draft?.make,
  });
  const [cond, setCondition] = useState(state.draft?.condition || "");
  const [al, setAlert] = useState({ show: false });
  const getSub = (cat) => {
    setRes({ cat });
    const sel = cats.category.find((c) => c.cat === cat);
    const res = sel?.items?.map((s) => {
      return { value: s.name, label: s.name };
    });
    setSub(res || []);
  };
  const _sub = (su) => {
    const st = cats.category
      .find((a) => a.cat === res.cat)
      .items.find((b) => b.name === su);
    const ms = st.subcategory.map((sms) => {
      return { value: sms, label: sms };
    });
    setT(ms);
    const ba = { ...res, subcat: su };
    setRes(ba);
  };
  const _type = (ty) => {
    const f = { ...res, type: ty };
    setRes(f);
  };

  const _change = (e) => {
    e.preventDefault();
    const { id, value } = e?.target;
    console.log(id, value);
    const draftCone = { ...dr };
    draftCone[id] = value;
    setDraft(draftCone);
  };
  const writeUserData = async (itemId = 10) => {
    const res = await firebaseApi.storeChat(
      {
        createdAt: new Date(),
        _id: itemId,
        text: "is this still available",
        user: {
          _id: state.user.id,
          name: state.user.firstname,
        },
      },
      itemId
    );
    console.log(res);
  };
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
    const data = {
      ...dr,
      condition: cond,
      category: res?.cat,
      subCategory: res?.subcat,
      make: res?.type,
      ownerId: state.user.id,
      status: "DRAFT",
    };
    console.log(JSON.stringify(data), " wtf ?????");
    if (state?.draft?.id) {
      data.id = state.draft.id;
    }
    const d = await addPicket(data);
    if (d.error) {
      return;
    }
    dispatch({ type: DRAFT_SET, data: d.data });
    writeUserData(d.data?.id);
    props.next();
    // post it to firebase
    //reset();
  };
  return (
    <>
      <div className="billing-form-item">
        <div className="billing-title-wrap">
          <h3 className="widget-title pb-0">General Information</h3>
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
                  <div className="input-box">
                    <label className="label-text">
                      Listing Title {dr?.title}
                    </label>
                    <div className="form-group">
                      <span className="la form-icon">
                        <BsPencilSquare />
                      </span>
                      <input
                        id="title"
                        className="form-control"
                        type="text"
                        name="name"
                        placeholder="Enter your listing title"
                        value={dr?.title}
                        onChange={_change}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="input-box">
                    <label className="label-text">
                      Description {dr?.description}
                    </label>
                    <div className="form-group">
                      <span className="la form-icon">
                        <BsPencil />
                      </span>
                      <textarea
                        id="description"
                        className="message-control form-control"
                        name="message"
                        placeholder="Write your listing description"
                        value={dr?.description}
                        onChange={_change}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="input-box">
                    <label className="label-text">Category</label>
                    <div className="form-group mb-0">
                      <Select
                        placeholder="Select a Category"
                        options={ca}
                        onChange={(e) => getSub(e.value)}
                        value={{ value: res?.cat, label: res?.cat }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="input-box">
                    <label className="label-text">Subcategory</label>
                    <div className="form-group mb-0">
                      <Select
                        placeholder="Select a Subcategory"
                        options={sub}
                        onChange={(e) => _sub(e.value)}
                        value={{ value: res?.subcat, label: res?.subcat }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="input-box">
                    <label className="label-text">Type</label>
                    <div className="form-group mb-0">
                      <Select
                        placeholder="Select type"
                        options={t}
                        onChange={(e) => _type(e.value)}
                        value={{ value: res?.type, label: res?.type }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="input-box">
                    <label className="label-text">Condition</label>
                    <div className="form-group mb-0">
                      <Select
                        placeholder="Select a Condition"
                        options={condit}
                        onChange={(e) => setCondition(e.value)}
                        value={{ value: cond, label: cond }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <Button onClick={_done} style={{ marginTop: "16px" }}>
                Done
              </Button>
              {/* <Button onClick={() => firebaseApi.addTwo()}>Two</Button> */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default GeneralInfo;
