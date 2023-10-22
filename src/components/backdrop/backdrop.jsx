import React from "react";
import classes from "./backdrop.module.css";

const Backdrop = ({ isBackdrop, backdropHandler }) => {
  return isBackdrop ? (
    <div className={classes.mainContainer} onClick={backdropHandler}></div>
  ) : null;
};

export default Backdrop;