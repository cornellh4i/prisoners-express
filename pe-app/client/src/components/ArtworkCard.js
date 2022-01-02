import React, { useState } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import ClickAwayListener from '@mui/material/ClickAwayListener';

import Modal from "./Modal.js";
import "../css/ArtworkCard.css";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    boxShadow: "0px 0px 10px 5px rgba(0, 0, 0, 0.1)",
    borderRadius: "20px",
    width: "314px",
  },
  image: {
    height: "200px",
    display: "block",
    margin: "auto",
    paddingBottom: "10px",
  },
  title: {
    fontFamily: "'Open Sans', sans-serif",
    fontSize: 20,
    fontWeight: "bold",
  },
  author: {
    fontFamily: "'Open Sans', sans-serif",
    fontStyle: "normal",
    fontSize: "14px",
  },
  date: {
    fontFamily: "'Open Sans', sans-serif",
    fontWeight: 400,
    fontStyle: "normal",
    fontSize: "11.35px",
    paddingTop: "5px",
    color: "#828282",
  },
  response: {
    fontFamily: "'Open Sans', sans-serif",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "11.35px",
    paddingTop: "20px",
    color: "#828282",
  },
});

function check(data) {
  return typeof data !== 'undefined' ? data : ""
}

export default function ArtworkCard(cardData) {
  const classes = useStyles();

<<<<<<< HEAD
  const [show, setShow] = useState(false);
  const handleClickAway = () => {
    setShow(false);
  };
  const handleClick = () => {
    setShow((prev) => !prev);
  };
  let image;
  let imgSrc;
  let artData = cardData.cardData;
  if (check(artData["Attachments"][0]["thumbnails"])) {
    imgSrc = artData["Attachments"][0]["thumbnails"]["large"]["url"];
    image = (
      <img src={imgSrc} alt="prisoner art" className={classes.image} />
    );
  } else {
    imgSrc = "https://28.cdn.ekm.net/ekmps/shops/simplycoatings2/images/axalta-ral-7040-window-grey-polyester-80-gloss-powder-coating-20kg-box--1759-p.jpg?v=1";
    image = (
      <img src={imgSrc} alt="grey recentangle" className={classes.image} />)
      ;
    //this should be the source of some empty image
  }
=======
	const [show, setShow] = useState(false);
	let image;
	let imgSrc;
	let artData = cardData.cardData;
	if (
		artData["Attachments"] &&
		artData["Attachments"][0] &&
		artData["Attachments"][0]["thumbnails"]
	) {
		imgSrc = artData["Attachments"][0]["thumbnails"]["large"]["url"];
		image = (
			<img src={imgSrc} alt="prisoner art" className={classes.image} />
		);
	} else {
		image = <img></img>;
		imgSrc = "";
		//this should be the source of some empty image
	}
>>>>>>> main

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
    <div>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <div className="Card" onClick={handleClick} style={{}}></div>
          {show ? (
            <Modal
              // show={show}
              // onClose={() => setShow(false)}
              artData={artData}
              imgSrc={imgSrc}
              responses={responses}
              dates={dates}
            />) : null}
        </div>
      </ClickAwayListener>
      <Card className={classes.card}>
        <CardContent>
          {image}
          <Typography className={classes.title}>
            {check(artData["Title"])}
          </Typography>

          <Typography className={classes.author}>
            {check(artData["Author Name"]) + " " + check(artData["Last Name"])}
          </Typography>
          <Typography className={classes.date}>
            {dates[
              parseInt((check
                (artData["Last modified time"])).split("-")[1]
              ) - 1
            ] +
              " " +
              check(artData["Last modified time"]).split("-")[0]}
          </Typography>
          <Typography className={classes.response}>
            {responses + " Responses"}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
