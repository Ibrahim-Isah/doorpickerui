import React, { useContext, useState, useEffect, useCallback } from "react";
import { GiftedChat } from "react-web-gifted-chat";
import * as firebaseApi from "../../store/api/firebaseApi";
import { UserContext } from "../../context/UserProvider";
import Footer from "../common/footer/Footer";
import GeneralHeader from "../common/GeneralHeader";
import ScrollTopBtn from "../common/ScrollTopBtn";

const styles = {
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    height: "100vh",
  },
  conversationList: {
    display: "flex",
    flex: 1,
  },
  chat: {
    display: "flex",
    flex: 3,
    flexDirection: "column",
    borderWidth: "1px",
    borderColor: "#ccc",
    borderRightStyle: "solid",
    borderLeftStyle: "solid",
  },
  converationDetails: {
    display: "flex",
    flex: 1,
  },
};
const Chat = (props) => {
  const [state] = useContext(UserContext);
  const { post } = props.location.state;
  const [messages, setMessages] = useState([
    {
      id: "770c3554-bcc4-46e9-b2e2-7fc63123456",
      createdAt: new Date(),
      text: "Still available?",
      user: {
        _id: 1,
        name: "Femi jo",
      },
    },
  ]);
  const { user } = state;
  const _msgs = (ms) => {
    //const m = Object.values(ms);
    let newm = [];
    if (ms?.msgs?.length > 0) {
      newm = ms.msgs.filter((msg) => {
        return msg.user._id === user.id || msg.user._id === +post.ownerId;
      });
      newm.sort((a, b) => b.createdAt - a.createdAt);
    }
    newm.forEach((n) => (n.createdAt = n.createdAt.toDate()));
    setMessages(newm);
  };
  useEffect(() => {
    post?.id && firebaseApi.getChat(post?.id, _msgs);
  }, [post]);
  const _send = useCallback(
    (msg = []) => {
      const data = [...messages, msg[0]];
      firebaseApi.storeChat(
        {
          msgs: data,
        },
        post?.id
      );
    },
    [post]
  );
  return (
    <main className="booking-confirmation-page">
      <GeneralHeader />

      <section className="booking-confirm-area padding-top-200px padding-bottom-140px overflow-hidden">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="booking-confirm-page text-center">
                <div className="section-heading pt-3">
                  <h2 className="sec__title pt-0 mb-2 before-none">
                    {post?.title}
                  </h2>
                </div>
              </div>
              <div className="App" style={styles.container}>
                <div style={styles.conversationList}>Converstions</div>
                <div style={styles.chat}>
                  <GiftedChat
                    user={{ id: 1 }}
                    messages={messages}
                    onSend={_send}
                  />
                </div>
                <div style={styles.converationDetails}>
                  Conversation details
                </div>
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
