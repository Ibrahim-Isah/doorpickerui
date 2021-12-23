import React from "react";
import BannerOneHeroHeading from "./BannerOneHeroHeading";
import BannerOneSearchInput from "./BannerOneSearchInput";
import BannerOneCategories from "./BannerOneCategories";
import sectiondata from "../../../store/store";
import * as cats from "../../../utils/category.json";
const highlights = cats.category.map((c) => c.cat);
export default function BannerOne() {
  return (
    <>
      <section
        className="hero-wrapper"
        style={{
          backgroundImage:
            "url(" + sectiondata.herobanners.banner1.bgimage + ")",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/* Banner One Hero Heading */}
              <BannerOneHeroHeading
                title={sectiondata.herobanners.banner1.title}
                content={sectiondata.herobanners.banner1.content}
                titleHighlight={highlights}
              />
              <BannerOneSearchInput data={highlights} />

              {/* Banner One Categories */}
              {/* <BannerOneCategories
                title={sectiondata.categories.featuredcategories.title}
                items={highlights}
                connector={sectiondata.categories.featuredcategories.connector}
              /> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
