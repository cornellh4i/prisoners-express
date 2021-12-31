import React from "react";
import "../css/Modal.css";
// import artworkimg from "./Rectangle.png";
import { Card, CardContent, Typography } from "@material-ui/core";
import Gallery from "./Carousel.js";
import "../css/CardStyling.css";

function check(data) {
  return typeof data !== 'undefined' ? data : ""
}

const Modal = (props) => {
  const { imgSrc, responses, dates } = props;
  const data = props.artData;

  if (!props.show) {
    return null;
  }
  return (
    <div className="modal" onClick={props.onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-body">
          <img
            src={imgSrc}
            alt="prisoner art"
            style={{
              height: "70%",
              display: "block",
              margin: "auto",
              position: "relative",
            }}
          />
          <div className="modal-title">{check(data["Title"])}</div>
          <div className="modal-author">
            {check(data["Author Name"]) + " " + check(data["Last Name"])}
          </div>
          <div className="modal-address">
            {"Mailing Address:" +
              "\n" +
              check(data["Author Name"]) +
              " " +
              check(data["Last Name"]) +
              ", ID:" +
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
              parseInt((check(data["Last modified time"])).split("-")[1]) -
              1
            ] +
              " " +
              check(data["Last modified time"]).split("-")[0]}

            {" " + responses + " Responses"}
          </div>
        </div>

        <div>
          <Gallery imgSrc={imgSrc} />
        </div>
        <div className="modal-footer">
          <button onClick={props.onClose} className="button">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
export default Modal;
