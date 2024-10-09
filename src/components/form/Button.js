import React from "react";
import { cva } from "class-variance-authority";
import { ReactSVG } from "react-svg";
import classNames from "classnames";

const ButtonVariants = cva(
  /* button base style */
  `flex justify-center items-center font-inter `,
  {
    variants: {
      /* button colors */
      intent: {
        primary:
          "bg-gradient-to-r from-tertiary-green-60 to-tertiary-green-70  text-white",
        secondary: "bg-white border-[1px] border-black",
        default:
          "bg-gradient-to-r from-tertiary-green-30 from-0% to-tertiary-green-50 to-100%",
      },

      /* button sizes */
      size: {
        cr: ["size-16"],
        sm: ["text-sm", "py-1", "px-2"],
        md: ["text-base", "py-1", "px-7"],
        lg: ["text-base", "py-1", "px-9"],
        xlg: ["text-base", "py-2", "px-20", "font-semibold"],
      },

      /* button roundness */
      roundness: {
        square: "rounded-none",
        round: "rounded-3xl",
        pill: "rounded-full",
      },
    },

    // defaults
    defaultVariants: {
      intent: "default",
      size: "medium",
      roundness: "round",
    },
  }
);

const Button = ({
  intent,
  size,
  roundness,
  children,
  eventAction,
  type,
  iconLeft,
  iconRight,
  classes,
}) => {
  console.log(eventAction);
  return (
    <button
      type={type}
      className={classNames(
        ButtonVariants({ intent, size, roundness }),
        classes
      )}
      onClick={eventAction}
    >
      {iconLeft && <ReactSVG src={iconLeft} />}
      {children}
      {iconRight && <ReactSVG src={iconRight} />}
    </button>
  );
};

export default Button;
