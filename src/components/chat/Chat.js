import React from "react";
import Footer from "../common/footer/Footer";
import GeneralHeader from "../common/GeneralHeader";
import ScrollTopBtn from "../common/ScrollTopBtn";

const Chat = () => {
  return (
    <main className="booking-confirmation-page">
      <GeneralHeader />
      <section className="booking-confirm-area padding-top-200px padding-bottom-140px overflow-hidden">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="booking-confirm-page text-center">
                <div className="section-heading pt-3">
                  <h2 className="sec__title pt-0 mb-2 before-none">Title</h2>
                  {/* <p className="sec__desc">
                    You'll receive a confirmation email at mail@example.com
                  </p> */}
                </div>
                {/* <div className="btn-box padding-top-30px">
                  <Button text="view Invoice" url="/invoice" />
                </div> */}

                <p>Messages</p>
                <textarea rows={3} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <ScrollTopBtn />
    </main>
  );
};

export default Chat;
