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
import { addPicket, findLoc } from "../../store/api/post";
import { UserContext } from "../../context/UserProvider";

function AddListing() {
  const [bread] = useState(breadcrumbimg);
  const [locale, setLocation] = useState(null);
  const [state, dispatch] = useContext(UserContext);
  const hist = useHistory();
  useEffect(() => {
    async function Location() {
      const loc = await findLoc();
      setLocation(loc);
    }
    Location();
  }, []);
  const addPost = () => {
    if (!state?.user?.auth) {
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
