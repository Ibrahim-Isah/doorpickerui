import React from "react";
import { FiSearch } from "react-icons/fi";
import SelectCountry from "../../common/SelectCountry";
import Select from "react-select";

export default function BannerOneSearchInput(props) {
  const categories = props.data.map((c) => {
    return { value: c, label: c };
  });
  return (
    <>
      <div className="main-search-input">
        <div className="main-search-input-item">
          <div className="contact-form-action">
            <form action="#">
              <div className="form-group mb-0">
                <span className="form-icon">
                  <FiSearch />
                </span>
                <input
                  className="form-control"
                  type="text"
                  placeholder="What are you looking for?"
                />
              </div>
            </form>
          </div>
        </div>

        <div className="main-search-input-item location">
          <SelectCountry />
        </div>

        <div className="main-search-input-item category">
          <Select placeholder="Select a Category" options={categories} />
        </div>

        <div className="main-search-input-btn">
          <button className="button theme-btn" type="submit">
            Search
          </button>
        </div>
      </div>
    </>
  );
}
