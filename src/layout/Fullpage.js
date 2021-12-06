import Foot from "./Foot";
import Head from "./Head";

const Fullpage = ({ children }) => {
  return (
    <>
      <Head />
      {children}
      <Foot />
    </>
  );
};

export default Fullpage;
