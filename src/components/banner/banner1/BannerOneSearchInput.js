import React, { useContext } from "react";
import { FiSearch } from "react-icons/fi";
import SelectCountry from "../../common/SelectCountry";
import Select from "react-select";
import { UserContext } from "../../../context/UserProvider";
import { POSTS_SEARCH } from "../../../context/actions";

export default function BannerOneSearchInput(props) {
  const [state, dispatch] = useContext(UserContext);
  const c = state.postsCopy;
  const categories = props.data.map((c) => {
    return { value: c, label: c };
  });
  console.log(state.postsCopy);
  console.log(state.posts);
  // useEffect(() => {
  //   function getFilteredArray() {
  //     if (searchText.length === 0 && selectedCategory === "all") {
  //       return courses;
  //     }
  //     return _.filter(courses, (item) => {
  //       const cc = item?.category?.split(",");
  //       const cat = cc ? cc[0] : "generic";
  //       if (selectedCategory !== "all" && cat !== selectedCategory) {
  //         return false;
  //       }
  //       return item.courseName.toLowerCase().includes(searchText.toLowerCase());
  //     });
  //   }

  //   if (courses) {
  //     setFilteredData(getFilteredArray());
  //   }
  // }, [courses, searchText, selectedCategory]);
  const _search = (e) => {
    e.preventDefault();
    const { value } = e.target;
    if (value.length === 0) {
      console.log(value, " val", value.length, typeof value);
      dispatch({ type: POSTS_SEARCH, data: state.postsCopy });
    }
    const res = state.posts.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    dispatch({ type: POSTS_SEARCH, data: res });
  };
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
                  placeholder="Search for items?"
                  onChange={_search}
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
