import React from "react";
import { Button } from "reactstrap";

import { translate } from "components/Helpers";

const ContactUsButton = props => {
  return (
    <div
      className={
        props.slug === "Home"
          ? "col-sm-12 col-xl-12 col-12 feedback-btn text-center"
          : "col-sm-6 col-xl-6 col-6 feedback-btn text-center"
      }
    >
      <Button
        className={
          props.slug === "Home"
            ? "text-center btn btn-secondary px-4"
            : "text-center btn btn-secondary"
        }
        onClick={() => props.contactus()}
      >
        {translate("Contact Us")}
      </Button>
    </div>
  );
};

export default ContactUsButton;
