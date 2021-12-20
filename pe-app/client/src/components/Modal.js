import React from "react";
import "../css/Modal.css";
// import artworkimg from "./Rectangle.png";
import { Card, CardContent, Typography } from "@material-ui/core";
import Gallery from "./Carousel.js";

const Modal = props => {
  if (!props.show) {
    return null;
  }
  return (
    <div className="modal" onClick={props.onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>

        <div className="modal-body">

          {/* <img src={artworkimg} align="center" alt="artwork"></img> */}



        </div>
        <div className="modal-tags">
          tag
        </div>
        <div className="modal-title">
          Title!
        </div>
        <div className="modal-author">
          author
        </div>
        <div className="modal-date">
          date, responses
        </div>
        <div className="modal-footer">
          <button onClick={props.onClose} className="button">Close</button>
        </div>
      </div>
      {/* <Gallery/> */}
    </div>
  )
}
export default Modal;