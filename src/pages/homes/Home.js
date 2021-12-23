import React, { useContext, useEffect } from "react";
import GeneralHeader from "../../components/common/GeneralHeader";
import BannerOne from "../../components/banner/banner1/BannerOne";
import ClientLogo from "../../components/sliders/ClientLogo";
import NewsLetter from "../../components/other/cta/NewsLetter";
import Footer from "../../components/common/footer/Footer";
import ScrollTopBtn from "../../components/common/ScrollTopBtn";
import SectionsHeading from "../../components/common/SectionsHeading";
import CtaOne from "../../components/other/cta/CtaOne";
import LatestBlog from "../../components/blogs/LatestBlog";
import Button from "../../components/common/Button";
import PlaceOne from "../../components/places/PlaceOne";
import sectiondata from "../../store/store";
import { UserContext } from "../../context/UserProvider";
import { getLive } from "../../store/api/post";
import { POSTS_SET } from "../../context/actions";

function Home() {
  const [state, dispatch] = useContext(UserContext);
  useEffect(() => {
    async function getData() {
      const d = await getLive();
      if (!d.ok) {
        console.log(d, " error");
      }
      dispatch({ type: POSTS_SET, data: d?.data });
    }
    getData();
  }, []);
  return (
    <main className="home-1">
      <GeneralHeader />
      <BannerOne />
      <section className="card-area text-center padding-bottom-100px">
        <div className="container">
          <PlaceOne places={state.posts} />
        </div>
      </section>
      <section className="cta-area section-bg column-sm-center padding-top-80px padding-bottom-80px">
        {sectiondata.calltoactions.cta1.shapes.map((img, index) => {
          return (
            <img
              src={img.img}
              key={index}
              alt="Cta Symble"
              className="symble-img"
            />
          );
        })}
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-9 text-left">
              <SectionsHeading
                title="DoorPicker is a leading innovative marketplace"
                titleClass=" mb-3 font-size-28"
                descClass=" font-size-17"
                desc="we connects buyers and sellers to give you the best bang for your bucks"
              />
            </div>
            <div className="col-lg-3">
              <div className="btn-box">
                <Button text="Join DoorPicker" url="/sign-up" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="blog-area padding-top-100px padding-bottom-80px">
        <div className="container">
          <div className="row section-title-width section-title-ml-mr-0">
            <div className="col-lg-8">
              <SectionsHeading
                title="Bestsellers"
                desc="Our most searched items"
              />
            </div>
            <div className="col-lg-4">
              <div className="btn-box h-100 d-flex align-items-center justify-content-end">
                <Button
                  text={sectiondata.latestarticles.btntext}
                  url={sectiondata.latestarticles.btnurl}
                  className=" margin-top-100px"
                />
              </div>
            </div>
          </div>

          <LatestBlog latestarticles={sectiondata.latestarticles.items} />
        </div>
      </section>

      {/* CTA 2 */}
      <section className="cta-area cta-area3 padding-top-100px padding-bottom-100px section-bg">
        <CtaOne />
      </section>

      {/* Client Logo */}
      <ClientLogo logos={sectiondata.clientlogos} />

      {/* NewsLetter */}
      <NewsLetter newsLetterContent={sectiondata.calltoactions.newsletters} />

      {/* Footer */}
      <Footer />

      <ScrollTopBtn />
    </main>
  );
}

export default Home;
