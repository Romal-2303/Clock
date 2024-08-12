import { CSSProperties, useEffect, useState } from "react";
import classes from "./Button.module.scss";

interface ButtonProps {
  btnText: string;
  shape: "Circular" | "Rectangular";
  btnStyles?: CSSProperties;
  btnClickHandler?: () => void;
}

const Button = ({
  btnText = "Click Me",
  shape = "Rectangular",
  btnStyles = {},
  btnClickHandler,
}: ButtonProps) => {
  return (
    <div
      style={btnStyles}
      className={
        shape === "Circular"
          ? `${classes["button-container"]} ${classes["button-container-circular"]}`
          : classes["button-container"]
      }
      onClick={btnClickHandler}
    >
      {btnText}
    </div>
  );
};

export default Button;
