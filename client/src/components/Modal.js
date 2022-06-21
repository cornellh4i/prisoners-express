import React, { useEffect, useState } from "react";
import "../css/Modal.css";
import Gallery from "./Carousel.js";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

function check(data) {
  return data !== undefined ? data : "";
}

const Modal = (props) => {
  const { imgSrc, responses, dates, worksByAuthor } = props;
  const { data, show, id, close } = props;

  if (show !== id) {
    return null;
  }
  console.log(data)
  return (
    <div className="modal-backdrop" onClick={close}>
      <div className={worksByAuthor.length > 1 ? "modal-content" : "modal-content-small"} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <button onClick={close} className="button">
            <CloseRoundedIcon
              fontSize="large"
              style={{
                backgroundColor: "transparent",
                color: "gray",
              }}
            />
          </button>
        </div>
        <div className="modal-body">
          <img
            src={imgSrc}
            alt="prisoner art"
            className={worksByAuthor.length > 1 ? "modal-image" : "modal-image-small"}
          />
          <div className={(check(data["Title"])).length > 24 ? "modal-title-small" : "modal-title"}>{check(data["Title"])}</div>
          <div className="modal-author">
            {check(data["Author Name"]) +
              " " +
              check(data["Last Name"])}
          </div>
          <div className="modal-address">
            {"Mailing Address:" +
              "\n" +
              check(data["Author Name"]) +
              " " +
              check(data["Last Name"]) +
              ", ID: ---" + check(data["Prisoner ID"]) +
              "\n" +
              check(data["Room Number"]) +
              " " +
              check(data["Pre-Address"]) +
              "\n" +
              check(data["Address"]) +
              " " +
              check(data["City"]) +
              ", " +
              check(data["State"]) +
              " " +
              check(data["Zip"])}
          </div>
          <div className="modal-date">
            {dates[
              parseInt(
                check(data["Last modified time"]).split("-")[1]
              ) - 1
            ] +
              " " +
              check(data["Last modified time"]).split("-")[0]}

            {" " + responses + " Responses"}
          </div>
        </div>

        <div>
          <Gallery imgSrc={imgSrc} worksByAuthor={worksByAuthor} />
        </div>
      </div>
    </div>
  );
};
export default Modal;
