import React, { useState } from "react";
import GeneralHeader from "../components/common/GeneralHeader";
import Breadcrumb from "../components/common/Breadcrumb";
import LoginBox from "../components/other/account/LoginBox";
import Footer from "../components/common/footer/Footer";
import ScrollTopBtn from "../components/common/ScrollTopBtn";
import breadcrumbimg from "../assets/images/bread-bg.jpg";

function Login(props) {
  const [bread] = useState(breadcrumbimg);
  return (
    <main className="login-page">
      {/* Header */}
      <GeneralHeader />

      {/* Breadcrumb */}
      <Breadcrumb CurrentPgTitle="Login" img={bread} />

      <section className="form-shared padding-top-40px padding-bottom-100px">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mx-auto">
              <LoginBox
                title="Login to your account"
                subtitle="with your social network"
                from={props.location?.state?.from}
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

export default Login;
