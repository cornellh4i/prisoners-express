import React from "react";
import "../css/Modal.css";
// import artworkimg from "./Rectangle.png";
import { Card, CardContent, Typography } from "@material-ui/core";
import Gallery from "./Carousel.js";

const Modal = (props) => {
  const { image, responses, dates } = props;
  const data = props.artData;

  if (!props.show) {
    return null;
  }
  return (
    <div className="modal" onClick={props.onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>

        <div className="modal-body">
          {image}
        </div>

        <div className="modal-title">
          {data["Title"]}
        </div>
        <div className="modal-author">
          {data["Author Name"] +
            " " +
            data["Last Name"]}
        </div>
        <div className="modal-date">
          {dates[
            parseInt(
              data[
                "Last modified time"
              ].split("-")[1]
            ) - 1
          ] +
            " " +
            data["Last modified time"].split(
              "-"
            )[0]}

        </div>
        <div className="modal-date">
          {responses + " Responses"}
        </div>
        <div className="modal-footer">
          <button onClick={props.onClose} className="button">Close</button>
        </div>
      </div>
      {/* <Gallery /> */}
    </div>
  )
}
export default Modal;