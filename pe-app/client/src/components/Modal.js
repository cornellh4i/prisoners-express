import React from "react";
import "./modalstyle.css";
import { Card, CardContent, Typography } from "@material-ui/core";

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
          
        </div>
        <div className="modal-title">
          title place holder
        </div>
        <div className="modal-author">
          author place holder
        </div>
        <div className="modal-date">
          date, responses
        </div>
        <div className="modal-address">
          address place holder
        </div>
        <div className="modal-carasoul">
          carasoul
          {/* <Gallery /> */}
        </div>
        <div className="modal-footer">
          <button onClick={props.onClose} className="button">Close</button>
        </div>
      </div>
    </div>
  )
}
export default Modal;