import React from "react";
import classNames from "classnames";
import { cva } from "class-variance-authority";
import { ReactSVG } from "react-svg";

const InputVariants = cva(
  /* button base style */
  `flex justify-center items-center font-inter outline-none`,
  {
    variants: {
      /* button colors */
      intent: {
        primary: "bg-primary placehoder:text-base placeholder:font-normal",
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

const Input = ({
  intent,
  type,
  size,
  roundness,
  eventAction,
  classes,
  icon,
  placeholder,

  maxLength,
  minLength,
  parentDivH,
  positionIcon,
  nameField,
  selector,
  register,
}) => {
  return (
    <div className={`relative ${parentDivH}`}>
      <input
        type={type}
        {...register(nameField)}
        id={selector}
        placeholder={placeholder}
        className={classNames(
          InputVariants({ intent, size, roundness }),
          classes
        )}
        autoComplete="off"
        maxLength={maxLength}
        minLength={minLength}
      />
      {icon && (
        <div className={`${positionIcon}`}>
          <ReactSVG src={icon} />
        </div>
      )}
    </div>
  );
};

export default Input;
