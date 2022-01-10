import React, { useState } from "react";
import SignUpBox from "../components/other/account/SignUpBox";
import GeneralHeader from "../components/common/GeneralHeader";
import Breadcrumb from "../components/common/Breadcrumb";
import Footer from "../components/common/footer/Footer";
import ScrollTopBtn from "../components/common/ScrollTopBtn";
import breadcrumbimg from "../assets/images/bread-bg.jpg";

function SignUp() {
  const [breadc] = useState(breadcrumbimg);
  return (
    <main className="signup-page">
      <GeneralHeader />
      <Breadcrumb CurrentPgTitle="Sign Up" img={breadc} />

      <section className="form-shared padding-top-40px padding-bottom-100px">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mx-auto">
              <SignUpBox
                title="Create an account!"
                subtitle="with your social network"
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />

      <ScrollTopBtn />
    </main>
  );
}

export default SignUp;
