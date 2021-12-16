import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FiMap } from "react-icons/fi";
import Select from "react-select";

const cities = [
  {
    value: 0,
    label: "Select a City",
  },
  {
    value: 1,
    label: "New York",
  },
  {
    value: 2,
    label: "Los Angeles",
  },
  {
    value: 3,
    label: "Chicago",
  },
  {
    value: 4,
    label: "Phoenix",
  },
  {
    value: 5,
    label: "Washington",
  },
  {
    value: 6,
    label: "Boston",
  },
  {
    value: 7,
    label: "Philadelphia",
  },
  {
    value: 8,
    label: "Baltimore",
  },
  {
    value: 9,
    label: "Seattle",
  },
  {
    value: 10,
    label: "San Francisco",
  },
];
const states = [
  {
    value: 0,
    label: "Select a State",
  },
  {
    value: 1,
    label: "California",
  },
  {
    value: 2,
    label: "Florida",
  },
  {
    value: 3,
    label: "Texas",
  },
  {
    value: 4,
    label: "Hawaii",
  },
  {
    value: 5,
    label: "Arizona",
  },
  {
    value: 6,
    label: "Michigan",
  },
  {
    value: 7,
    label: "New Jersey",
  },
  {
    value: 8,
    label: "Georgia",
  },
  {
    value: 9,
    label: "South Carolina",
  },
  {
    value: 10,
    label: "Montana",
  },
];
const AddLocation = () => {
  const [selectedCity, setCity] = useState(null);
  const [selectedState, setState] = useState(null);
  const [addr, setAddr] = useState("");
  const [title] = useState("Add Location");

  const handleChangeCity = (s) => {
    setCity(s);
  };
  const handleChangeState = (v) => {
    setState(v);
  };
  const _done = () => {
    console.log(addr, " addr");
    console.log(selectedCity, selectedState);
  };
  return (
    <>
      <div className="billing-form-item">
        <div className="billing-title-wrap">
          <h3 className="widget-title pb-0">{title}</h3>
          <div className="title-shape margin-top-10px"></div>
        </div>
        <div className="billing-content">
          <div className="contact-form-action">
            <form method="post">
              <div className="row">
                <div className="col-lg-12">
                  <div className="input-box">
                    <label className="label-text">Address</label>
                    <div className="form-group">
                      <span className="la form-icon">
                        <FiMap />
                      </span>
                      <input
                        className="form-control"
                        type="text"
                        name="name"
                        placeholder="Item address"
                        value={addr}
                        onChange={(e) => setAddr(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="input-box">
                    <label className="label-text">State</label>
                    <div className="form-group">
                      <Select
                        value={selectedState}
                        onChange={handleChangeState}
                        placeholder="Select a State"
                        options={states}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="input-box">
                    <label className="label-text">City</label>
                    <div className="form-group">
                      <Select
                        value={selectedCity}
                        onChange={handleChangeCity}
                        placeholder="Select a City"
                        options={cities}
                      />
                    </div>
                  </div>
                </div>

                {/* <div className="col-lg-6">
                    <label className="label-text">Country</label>
                    <div className="form-group">
                      <SelectCountry />
                    </div>
                  </div> */}
              </div>
              <Button onClick={_done}>Done</Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddLocation;
