import React, { useState } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
// import mailicon from "./mail.png";
// import artworkimg from "./Rectangle.png";
import Modal from "./Modal.js";
import "../css/ArtworkCard.css";

export default function ArtworkCard(cardData) {
  const [show, setShow] = useState(false)
  let image;

  let artData = cardData.cardData
  console.log('artData', artData)
  if (artData["Attachments"][0]["thumbnails"]) {
    image = (
      <img
        src={
          artData["Attachments"][0]["thumbnails"]["large"][
          "url"
          ]
        }
        alt="prisoner art"
        style={{
          // width: "84px",
          height: "200px",
          display: 'block',
          margin: 'auto',
          paddingBottom: "10px",
        }}
      />
    );
  } else {
    image = <img></img>;
  }


  let responses;
  if (artData["Responses"]) {
    responses = artData["Responses"].length;
  } else {
    responses = 0;
  }

  const dates = [
    "January",
    "Feburary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="Card" onClick={() => setShow(true)} style={{}}>
      <Card
        style={{
          width: 340,
          backgroundColor: "white",
        }}
      >
        <CardContent>
          {image}
          {/* <img src={artworkimg} width="330" height="255" align="center" alt="artwork"></img> */}
          <Typography
            style={{ fontSize: 20, fontWeight: "bold" }}
            variant="h4"
            component="h2"
          >
            {artData["Title"]}
          </Typography>

          <Typography
            style={{ fontSize: 14 }}
            color="textSecondary"
            gutterBottom
            variant="h3"
          >
            {artData["Author Name"] +
              " " +
              artData["Last Name"]}
          </Typography>
          <br></br>
          <Typography variant="body2" component="p">
            {dates[
              parseInt(
                artData[
                  "Last modified time"
                ].split("-")[1]
              ) - 1
            ] +
              " " +
              artData["Last modified time"].split(
                "-"
              )[0]}
            {/* <img src={mailicon} width="20" height="20" align="right" alt="mail icon"></img> */}
          </Typography>
          <Typography
            style={{
              fontFamily: "Open Sans",
              fontStyle: "normal",
              fontWeight: "normal",
              fontSize: "11.3494px",
              paddingTop: "20px",
              paddingLeft: "16px",
              color: "#828282",
            }}
          >
            {responses + " Responses"}
          </Typography>
        </CardContent>
        <Modal onClose={() => setShow(false)} show={show} />
      </Card>
    </div >
  );
}