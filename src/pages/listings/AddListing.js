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

function AddListing() {
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
  // show login modal if user isnot logged in
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
              <PhotoUploader />
              <GeneralInfo />

              <AddLocation />

              {/* <AddFullDetails /> */}

              {/* <Amenities /> */}

              {/* <OpeningHours /> */}

              <AddPrice />
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

export default AddListing;
