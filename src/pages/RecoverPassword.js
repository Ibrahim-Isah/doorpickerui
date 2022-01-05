import React from "react";
import GeneralHeader from "../components/common/GeneralHeader";
import Breadcrumb from "../components/common/Breadcrumb";
import RecoverPassBox from "../components/other/account/RecoverPassBox";
import NewsLetter from "../components/other/cta/NewsLetter";
import Footer from "../components/common/footer/Footer";
import ScrollTopBtn from "../components/common/ScrollTopBtn";
import breadcrumbimg from "../assets/images/bread-bg.jpg";
import sectiondata from "../store/store";

const state = {
  breadcrumbimg: breadcrumbimg,
};
function RecoverPassword() {
  return (
    <main className="recover-pass-page">
      <GeneralHeader />

      <Breadcrumb
        CurrentPgTitle="Recover Password"
        MenuPgTitle="Pages"
        img={state.breadcrumbimg}
      />

      <RecoverPassBox />

      <Footer />

      <ScrollTopBtn />
    </main>
  );
}

export default RecoverPassword;
