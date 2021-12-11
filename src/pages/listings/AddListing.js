import React, { useEffect, useState } from "react";
import GeneralHeader from "../../components/common/GeneralHeader";
import Breadcrumb from "../../components/common/Breadcrumb";
import GeneralInfo from "../../components/addlisting/GeneralInfo";
import AddLocation from "../../components/addlisting/AddLocation";
import PhotoUploader from "../../components/addlisting/PhotoUploader";
import AddPrice from "../../components/addlisting/AddPrice";
import Footer from "../../components/common/footer/Footer";
import ScrollTopBtn from "../../components/common/ScrollTopBtn";
import { Link } from "react-router-dom";
import breadcrumbimg from "../../assets/images/bread-bg.jpg";
import { addPicket, findLoc } from "../../store/api/post";

function AddListing() {
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
              <PhotoUploader />
              <GeneralInfo />

              <AddLocation />

              {/* <AddFullDetails /> */}

              {/* <Amenities /> */}

              {/* <OpeningHours /> */}

              <AddPrice />

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
