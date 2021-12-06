import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

const ScrollToTop = (props) => {
  const location = useLocation();
  const locationRef = useRef("");
  useEffect(() => {
    if (location?.pathname !== locationRef.current) {
      locationRef.current = location.pathname;
      props.action();
    }
  });
  return null;
};

export default ScrollToTop;
