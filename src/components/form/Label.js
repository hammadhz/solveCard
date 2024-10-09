import React from "react";
import classNames from "classnames";

const Label = ({ content, labelFor, classes }) => {
  return (
    <label
      htmlFor={labelFor}
      className={classNames(
        "font-inter font-normal text-base text-black",
        classes
      )}
    >
      {content}
    </label>
  );
};

export default Label;
