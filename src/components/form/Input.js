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
        primary: "bg-primary placeholder:text-sm placeholder:font-normal",
        secondary: "bg-primary",
        default: "bg-primary",
      },

      /* button sizes */
      size: {
        sm: ["text-sm", "py-3", "px-3", "w-[450px]"],
        md: ["text-base", "py-3", "px-3"],
        lg: ["text-base", "py-2", "px-3"],
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
  icon: Icon,
  placeholder,
  reactSvgIcon,
  maxLength,
  minLength,
  parentDivH,
  positionIcon,
  nameField,
  selector,
  register,
  iconClass,
  iconAction,
  custom,
  name,
  value,
  readOnly,
}) => {
  return (
    <div className={`relative ${parentDivH}`}>
      {register && (
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
          readOnly={readOnly}
        />
      )}
      {custom && (
        <input
          type={type}
          name={name}
          value={value}
          onChange={eventAction}
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
      )}
      {Icon && (
        <div className={`${positionIcon}`}>
          <Icon className={`${iconClass}`} onClick={iconAction} />
        </div>
      )}
      {reactSvgIcon && (
        <div className={`${positionIcon}`}>
          <ReactSVG src={reactSvgIcon} />
        </div>
      )}
    </div>
  );
};

export default Input;
