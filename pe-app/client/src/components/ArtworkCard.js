import React, { useState } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

import Modal from "./Modal.js";
import "../css/ArtworkCard.css";

export default function ArtworkCard(props) {
  const { cardData, responses } = props;
  const [show, setShow] = useState(false)
  let image;
  let imgSrc;

  if (cardData["Attachments"][0]["thumbnails"]) {
    imgSrc = cardData["Attachments"][0]["thumbnails"]["large"][
      "url"
    ];
    image = (
      <img
        src={
          imgSrc
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
    imgSrc = '';
    //this should be the source of some empty image
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
      <Modal onClose={() => setShow(false)} show={show}
        cardData={cardData} imgSrc={imgSrc} responses={responses} dates={dates} />
      <Card
        style={{
          width: 340,
          backgroundColor: "white",
        }}
      >
        <CardContent>
          {image}
          {/* <img src={cardworkimg} width="330" height="255" align="center" alt="cardwork"></img> */}
          <Typography
            style={{ fontSize: 20, fontWeight: "bold" }}
            variant="h4"
            component="h2"
          >
            {cardData["Title"]}
          </Typography>

          <Typography
            style={{ fontSize: 14 }}
            color="textSecondary"
            gutterBottom
            variant="h3"
          >
            {cardData["Author Name"] +
              " " +
              cardData["Last Name"]}
          </Typography>
          <br></br>
          <Typography variant="body2" component="p">
            {dates[
              parseInt(
                cardData[
                  "Last modified time"
                ].split("-")[1]
              ) - 1
            ] +
              " " +
              cardData["Last modified time"].split(
                "-"
              )[0]}
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
      </Card>
    </div >
  );
}