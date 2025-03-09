import React from "react";
import { cva } from "class-variance-authority";
import { ReactSVG } from "react-svg";
import classNames from "classnames";
import { Link } from "react-router-dom";

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
        sm: ["text-sm", "py-3", "px-4"],
        md: ["text-base", "py-2", "px-9"],
        lg: ["text-base", "py-3", "px-9"],
        xlg: ["text-base", "py-3", "px-20", "font-semibold"],
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
  style,
  iconLeft,
  iconRight,
  classes,
  loading,
  disabled
}) => {
  return (
    <button
      style={style}
      type={type}
      className={classNames(
        ButtonVariants({ intent, size, roundness }),
        classes,
        disabled ? "cursor-not-allowed" : ""
      )}
      onClick={eventAction}
    >
      {loading ? (
        <span className="size-6 border-2 border-white border-b-transparent rounded-full inline-block box-border animate-spin"></span>
      ) : (
        <>
          {iconLeft && <ReactSVG src={iconLeft} />}
          {children}
          {iconRight && <ReactSVG src={iconRight} />}
        </>
      )}
    </button>
  );
};

const ButtonLink = ({
  intent,
  size,
  roundness,
  content,
  eventAction,
  type,
  iconLeft,
  iconRight,
  classes,
  href,
}) => {
  return (
    <Link
      to={href}
      className={classNames(
        ButtonVariants({ intent, size, roundness }),
        classes
      )}
    >
      {iconLeft && <ReactSVG src={iconLeft} />}
      {content}
      {iconRight && <ReactSVG src={iconRight} />}
    </Link>
  );
};

export default Button;
