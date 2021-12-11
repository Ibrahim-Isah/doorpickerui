import React, { useState } from "react";
import { Alert } from "react-bootstrap";

const GenAlert = (props) => {
  const { variant, msg, isAlert } = props?.alert || {};
  const [show, setShow] = useState(isAlert || false);

  return (
    <Alert
      show={show}
      variant={variant}
      dismissible
      onClose={() => setShow(false)}
    >
      {msg}
    </Alert>
  );
};

export default GenAlert;
