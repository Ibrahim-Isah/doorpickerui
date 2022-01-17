import React, { useContext, useEffect, useState } from "react";
import GeneralHeader from "../../components/common/GeneralHeader";
import Breadcrumb from "../../components/common/Breadcrumb";
import GeneralInfo from "../../components/addlisting/GeneralInfo";
import AddLocation from "../../components/addlisting/AddLocation";
import PhotoUploader from "../../components/addlisting/PhotoUploader";
import AddPrice from "../../components/addlisting/AddPrice";
import Footer from "../../components/common/footer/Footer";
import ScrollTopBtn from "../../components/common/ScrollTopBtn";
import breadcrumbimg from "../../assets/images/bread-bg.jpg";
import { userDrafts } from "../../store/api/post";
import { UserContext } from "../../context/UserProvider";
import { DRAFT_SET, POSTS_DRAFT } from "../../context/actions";
import { Dropdown, SplitButton } from "react-bootstrap";
import { Tab, Tabs } from "react-bootstrap";

function ControlledTabs() {
  const [state, dispatch] = useContext(UserContext);
  const [key, setKey] = useState("home");
  const [bread] = useState(breadcrumbimg);

  // useEffect(() => {
  //   async function Location() {
  //     const loc = {}; //await findLoc();
  //     setLocation(loc);
  //   }
  //   Location();
  // }, []);
  // };
  useEffect(() => {
    async function myDrafts() {
      const drafts = await userDrafts(state?.user?.id);
      dispatch({ type: POSTS_DRAFT, data: drafts?.data });
    }
    state?.user?.id && myDrafts();
  }, [state.user, dispatch]);

  return (
    <main className="add-listing">
      <GeneralHeader />
      <Breadcrumb
        CurrentPgTitle="Add Picket"
        MenuPgTitle="Listings"
        img={bread}
      />
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
              <Tabs
                id="controlled-tab"
                activeKey={key}
                onSelect={(k) => (state.user?.id ? setKey(k) : setKey("home"))}
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
            </div>
          </div>
        </div>
      </section>
      <Footer />

      <ScrollTopBtn />
    </main>
  );
}

export default ControlledTabs;
