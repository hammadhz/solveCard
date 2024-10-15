import React from "react";
import { cva } from "class-variance-authority";
import { ReactSVG } from "react-svg";
import classNames from "classnames";
import { Link } from "react-router-dom";

const NavLinkVariants = cva(
  /* button base style */
  `flex justify-center items-center font-inter cursor-pointer`,
  {
    variants: {
      /* button colors */
      intent: {
        primary:
          "inline-block bg-gradient-to-r from-tertiary-green-60 to-tertiary-green-70  text-white",
        secondary: "inline-block bg-white border-[1px] border-black",
        default:
          "inline-block bg-gradient-to-r from-tertiary-green-30 from-0% to-tertiary-green-50 to-100%",
      },

      /* button sizes */
      size: {
        cr: ["size-16"],
        sm: ["text-sm", "py-3", "px-2"],
        md: ["text-base", "py-2", "px-9"],
        lg: ["text-base", "py-2", "px-12"],
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
      size: "md",
      roundness: "round",
    },
  }
);

const NavLink = ({
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
        NavLinkVariants({ intent, size, roundness }),
        classes
      )}
    >
      {iconLeft && <ReactSVG src={iconLeft} />}
      {content}
      {iconRight && <ReactSVG src={iconRight} />}
    </Link>
  );
};

export default NavLink;
