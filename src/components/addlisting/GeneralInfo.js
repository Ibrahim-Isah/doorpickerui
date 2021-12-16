import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { BsPencilSquare, BsPencil } from "react-icons/bs";
import Select from "react-select";
import { UserContext } from "../../context/UserProvider";
import * as cats from "../../utils/category.json";

const ca = cats.category.map((c) => {
  return { value: c.cat, label: c.cat };
});
const condit = cats.condition.map((cc) => {
  return { value: cc, label: cc };
});

function GeneralInfo() {
  const [state, dispatch] = useContext(UserContext);
  const [sub, setSub] = useState(null);
  const [t, setT] = useState([]);
  const [res, setRes] = useState(null);
  const [cond, setCondition] = useState("");
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

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const _done = (data) => {
    console.log(res, " resident", cond);
    console.log(data, " dat");
  };
  return (
    <>
      <div className="billing-form-item">
        <div className="billing-title-wrap">
          <h3 className="widget-title pb-0">General Information</h3>
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
                        {...register("title")}
                      />
                    </div>
                  </div>
                </div>
                {/* <div className="col-lg-6">
                  <div className="input-box">
                    <label className="label-text d-flex align-items-center ">
                      Keywords
                      <i
                        className="la tip ml-1"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Maximum of 15 keywords related with your business"
                      >
                        <BsQuestion />
                      </i>
                    </label>
                    <div className="form-group">
                      <span className="la form-icon">
                        <AiOutlineTags />
                      </span>
                      <input
                        className="form-control"
                        type="text"
                        name="name"
                        placeholder="Keywords should be separated by commas"
                      />
                    </div>
                  </div>
                </div> */}
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
                        {...register("description")}
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
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <Button onClick={handleSubmit(_done)}>Done</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default GeneralInfo;
