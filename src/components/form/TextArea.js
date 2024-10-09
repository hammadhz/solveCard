import React from "react";
import classNames from "classnames";
import { cva } from "class-variance-authority";
import { ReactSVG } from "react-svg";

const TextAreaVariants = cva(
  /* button base style */
  `flex justify-center items-center font-inter outline-none`,
  {
    variants: {
      /* button colors */
      intent: {
        primary: "bg-primary ",
        secondary: "bg-primary",
        default: "bg-primary",
      },

      /* button sizes */
      size: {
        sm: ["text-sm", "py-2", "px-2", "w-[450px]"],
        md: ["text-base", "py-2", "px-4"],
        lg: ["text-base", "py-4", "px-4"],
      },

      /* button roundness */
      roundness: {
        square: "rounded-none",
        "round-sm": "rounded-md",
        "round-md": "rounded-lg",
        "round-lg": "rounded-3xl",
      },
    },

    // defaults
    defaultVariants: {
      intent: "default",
      size: "lg",
      roundness: "round-lg",
    },
  }
);

const TextArea = ({
  intent,
  size,
  roundness,
  eventAction,
  classes,
  placeholder,
  value,
  maxLength,
  minLength,
  cols,
  rows,
  name,
}) => {
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={eventAction}
      className={classNames(
        TextAreaVariants({ intent, size, roundness }),
        classes
      )}
      cols={cols}
      rows={rows}
      maxLength={maxLength}
      minLength={minLength}
    ></textarea>
  );
};

export default TextArea;
