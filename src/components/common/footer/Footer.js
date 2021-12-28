import React, { useEffect } from "react";
import Copyright from "./Copyright";
import FooterLeftWidget from "./FooterLeftWidget";
import FooterQuickLinkWidget from "./FooterQuickLinkWidget";
import FooterCategoryWidget from "./FooterCategoryWidget";
import FooterContactWidget from "./FooterContactWidget";
import sectiondata from "../../../store/store";
function tkTo() {
  var Tawk_API = Tawk_API || {},
    Tawk_LoadStart = new Date();
  (function () {
    var s1 = document.createElement("script"),
      s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = "https://embed.tawk.to/5a5cc768d7591465c706c2e4/default";
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    s0.parentNode.insertBefore(s1, s0);
  })();
}
function Footer() {
  return (
    <>
      <section className="footer-area section-bg padding-top-140px padding-bottom-60px">
        <div className="box-icon"></div>
        <div className="box-icon"></div>
        <div className="box-icon"></div>
        <div className="box-icon"></div>
        <div className="box-icon"></div>
        <div className="box-icon"></div>
        <div className="container">
          <div className="row">
            <FooterLeftWidget footerleftcnts={sectiondata.footerdata} />
            <FooterQuickLinkWidget
              footerquicklink={sectiondata.footerdata.footerquicklinks}
            />
            <FooterCategoryWidget
              footercategory={sectiondata.footerdata.footercategories}
            />
            <FooterContactWidget
              footercontact={sectiondata.footerdata.footercontact}
            />
          </div>

          {/* Copyright */}

          <Copyright />
          {tkTo()}
        </div>
      </section>
    </>
  );
}

export default Footer;
