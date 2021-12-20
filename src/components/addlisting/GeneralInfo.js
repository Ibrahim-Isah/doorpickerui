import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import React, { useContext, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { BsPencilSquare, BsPencil } from "react-icons/bs";
import Select from "react-select";
import * as firebaseApi from "../../store/api/firebaseApi";
import { DRAFT_SET } from "../../context/actions";
import { UserContext } from "../../context/UserProvider";
import { addPicket } from "../../store/api/post";
import * as cats from "../../utils/category.json";
import { firebaseConfig } from "../../utils/config";
import { useHistory } from "react-router-dom";
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const ca = cats.category.map((c) => {
  return { value: c.cat, label: c.cat };
});
const condit = cats.condition.map((cc) => {
  return { value: cc, label: cc };
});

function GeneralInfo() {
  const [state, dispatch] = useContext(UserContext);
  const history = useHistory();
  const [title, setTitle] = useState(state.draft?.title || "");
  const [description, setDescr] = useState(state.draft?.description || "");
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
  console.log(res, " role it ");
  const _type = (ty) => {
    const f = { ...res, type: ty };
    setRes(f);
  };

  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   reset,
  //   formState: { errors },
  // } = useForm({ defaultValues: state.draft });
  const openChat = (id, email) => {
    firebaseApi.storeChat(
      {
        createdAt: new Date(),
        _id: id,
        text: "is this still available",
        user: email, // should be OP
      },
      id
    );
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
      ...state.draft,
      title,
      description,
      condition: cond,
      category: res?.cat,
      subCategory: res?.subcat,
      make: res?.type,
      ownerId: state.user.id,
      status: "DRAFT",
    };
    // const data = {
    //   title,
    //   description,
    //   condition: cond,
    //   category: res.cat,
    //   subCategory: res.subcat,
    //   make: res.type,
    //   ownerId: state.user.id,
    //   status: "DRAFT",
    // };
    if (state?.draft?.id) {
      data.id = state.draft.id;
    }
    const d = await addPicket(data);
    if (d.error) {
      return;
    }
    dispatch({ type: DRAFT_SET, data: d.data });
    openChat(d.data?.id, d?.data?.email);
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
                    <label className="label-text">Listing Title</label>
                    <div className="form-group">
                      <span className="la form-icon">
                        <BsPencilSquare />
                      </span>
                      <input
                        className="form-control"
                        type="text"
                        name="name"
                        placeholder="Enter your listing title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="input-box">
                    <label className="label-text">Description</label>
                    <div className="form-group">
                      <span className="la form-icon">
                        <BsPencil />
                      </span>
                      <textarea
                        className="message-control form-control"
                        name="message"
                        placeholder="Write your listing description"
                        value={description}
                        onChange={(e) => setDescr(e.target.value)}
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default GeneralInfo;
