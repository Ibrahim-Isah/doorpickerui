import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import GeneralHeader from "../../components/common/GeneralHeader";
import Breadcrumb from "../../components/common/Breadcrumb";
import GeneralInfo from "../../components/addlisting/GeneralInfo";
import AddLocation from "../../components/addlisting/AddLocation";
import PhotoUploader from "../../components/addlisting/PhotoUploader";
import AddPrice from "../../components/addlisting/AddPrice";
import Footer from "../../components/common/footer/Footer";
import ScrollTopBtn from "../../components/common/ScrollTopBtn";
import breadcrumbimg from "../../assets/images/bread-bg.jpg";
import { addPicket, findLoc, userDrafts } from "../../store/api/post";
import { UserContext } from "../../context/UserProvider";
import { DRAFT_SET, POSTS_DRAFT } from "../../context/actions";
import {
  ButtonGroup,
  Dropdown,
  DropdownButton,
  SplitButton,
} from "react-bootstrap";
import { Tab, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { renderSync } from "node-sass";

/* function AddListing() {
  const [bread] = useState(breadcrumbimg);
  const [state, dispatch] = useContext(UserContext);
  const hist = useHistory();
  // get my drafts, load it in a drop down. and make the latest one default.
  // useEffect(() => {
  //   async function Location() {
  //     const loc = await findLoc();
  //     setLocation(loc.data);
  //   }
  //   Location();
  // }, []);
  console.log(state.drafts, "users");
  useEffect(() => {
    async function myDrafts() {
      const drafts = await userDrafts(state?.user?.id || 2);
      dispatch({ type: POSTS_DRAFT, data: drafts?.data });
    }
    myDrafts();
    //state?.user?.id && myDrafts();
  }, [state.user]);
  const addPost = () => {
    if (!state?.user?.id) {
      alert("You are not logged in");
      hist.push({ pathname: "/login", state: { from: "add-listing/new" } });
    }
    //const obj = { location: locale };
    //addPicket(obj);
    //create a post
  };
  
  return (
    <main className="add-listing">
      {/* Header */
// <GeneralHeader />

{
  /* Breadcrumb */
}
//  <Breadcrumb
//   CurrentPgTitle="Add Listing"
//   MenuPgTitle="Listings"
//    img={bread}
//  />
{
  /* Add Listing */
}

//     <section className="add-listing-area padding-top-40px padding-bottom-100px">
//      <div className="container">
//        <div className="row">
//          <div className="col-lg-9 mx-auto">

//        <PhotoUploader/>

//        <GeneralInfo/>

//        <AddLocation/>
//
//       <AddPrice/>

{
  /* <AddFullDetails /> */
}

{
  /* <Amenities /> */
}

{
  /* <OpeningHours /> */
}

//       <div className="billing-form-item p-0 border-0 mb-0 shadow-none">
//         <div className="billing-content p-0">
//         <div className="custom-checkbox d-block mr-0">
//         <input type="checkbox" id="privacy" />
//            <label htmlFor="privacy">
//             I Agree to DoorPicker's
//            <Link to="#" className="color-text">
//             Privacy Policy
//          </Link>
//       </label>
//      </div>
//     <div className="custom-checkbox d-block mr-0">
//        <input type="checkbox" id="terms" />
//       <label htmlFor="terms">
//        I Agree to DoorPicker's
//       <Link to="#" className="color-text">
//        Terms of Services
//     </Link>
//  </label>
//        </div>
//       <div className="btn-box mt-4">
//            <button onClick={addPost} className="theme-btn border-0">
//             submit picket
//          </button>

//        </div>
//     </div>
//       </div>

//     </div>
//     </div>
//      </div>
//   </section>

{
  /* Newsletter */
}
{
  /* <NewsLetter newsLetterContent={sectiondata.calltoactions.newsletters} /> */
}

{
  /* Footer */
}
//     <Footer />

//     <ScrollTopBtn />
//   </main>
//  );
// }

function ControlledTabs() {
  const [state, dispatch] = useContext(UserContext);
  const [key, setKey] = useState("home");
  const [bread] = useState(breadcrumbimg);
  const [locale, setLocation] = useState(null);
  useEffect(() => {
    async function Location() {
      const loc = await findLoc();
      setLocation(loc);
    }
    Location();
  }, []);
  const addPost = () => {
    const obj = { location: locale };
    addPicket(obj);
    //create a post
  };

  return (
    <main className="add-listing">
      {/* Header */}
      <GeneralHeader />

      {/* Breadcrumb */}
      <Breadcrumb
        CurrentPgTitle="Add Listing"
        MenuPgTitle="Listings"
        img={bread}
      />
      {/* Add Listing */}

      <section className="add-listing-area padding-top-40px padding-bottom-100px">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 mx-auto">
              <div style={{ marginBottom: "8px" }}>
                <SplitButton
                  align={{ lg: "start" }}
                  title="My Drafts"
                  id="my-drafts"
                >
                  {state?.drafts.map((m) => (
                    <Dropdown.Item
                      eventKey={m.id}
                      onSelect={() => dispatch({ type: DRAFT_SET, data: m })}
                    >
                      {m.title}
                    </Dropdown.Item>
                  ))}
                </SplitButton>
              </div>
              {/* <PhotoUploader />
              <GeneralInfo />

              <AddLocation /> */}

              {/* <AddFullDetails /> */}

              <Tabs
                id="controlled-tab"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
              >
                <Tab eventKey="home" title="Add Photo">
                  <PhotoUploader next={() => setKey("profile")} />
                </Tab>
                <Tab eventKey="profile" title="General Info">
                  <GeneralInfo next={() => setKey("contact")} />
                </Tab>
                <Tab eventKey="contact" title="Add Location">
                  <AddLocation next={() => setKey("pricing")} />
                </Tab>
                <Tab eventKey="pricing" title="Add Pricing">
                  <AddPrice />
                </Tab>
              </Tabs>
              {key === "pricing" && (
                <div className="billing-form-item p-0 border-0 mb-0 shadow-none">
                  <div className="billing-content p-0">
                    <div className="custom-checkbox d-block mr-0">
                      <input type="checkbox" id="privacy" />
                      <label htmlFor="privacy">
                        I Agree to DoorPicker's
                        <Link to="#" className="color-text">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                    <div className="custom-checkbox d-block mr-0">
                      <input type="checkbox" id="terms" />
                      <label htmlFor="terms">
                        I Agree to DoorPicker's
                        <Link to="#" className="color-text">
                          Terms of Services
                        </Link>
                      </label>
                    </div>
                    <div className="btn-box mt-4">
                      <button onClick={addPost} className="theme-btn border-0">
                        submit picket
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      {/* <NewsLetter newsLetterContent={sectiondata.calltoactions.newsletters} /> */}

      {/* Footer */}
      <Footer />

      <ScrollTopBtn />
    </main>
  );
}

export default ControlledTabs;

// export default AddListing;
