import React, { useState } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import rectangle from "./greyrectangle.jpeg";

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

const useStyles = makeStyles({
  card: {
    boxShadow: "0px 0px 10px 5px rgba(0, 0, 0, 0.1)",
    borderRadius: "20px",
  },
  cardcontent: {
    padding: "1.5vw",
  },
  image: {
    height: "30vh",
    display: "block",
    margin: "auto",
    paddingBottom: "2vh",
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
  info: {
    marginLeft: "1vw",
  },
});

function check(data) {
  return data !== undefined ? data : "";
}

function checkDate(data) {
  return data !== undefined ? dates[parseInt(data.split("-")[1]) - 1] + " " + data.split("-")[0] : "";
}

export default function ArtworkCard(props) {
  const classes = useStyles();

  const [show, setShow] = useState(false);
  const [imgWidth, setImgWidth] = useState(0);

  const onImgLoad = ({ target: img }) => {
    setImgWidth(img.offsetWidth);
  };

  const handleClickAway = () => {
    setShow(false);
  };
  const handleClick = () => {
    setShow((prev) => !prev);
  };

  const { cardData, openModal, imgSrc, responses } = props;

  const image = imgSrc == rectangle ? <img
    src={imgSrc}
    alt="grey rectangle"
    className={classes.image}
  /> : <img
    onLoad={onImgLoad}
    src={imgSrc}
    alt="prisoner art"
    className={classes.image}
  />;


  return (
    <div className="Card" onClick={openModal} style={{}}>
      <Card
        className={classes.card}
        style={{ width: imgWidth > 300 ? "100%" : "22vw" }}
      >
        <CardContent className={classes.cardcontent}>
          {image}

          <div className={classes.info}>
            <Typography className={classes.title}>
              {check(cardData["Title"])}
            </Typography>

            <Typography className={classes.author}>
              {check(cardData["Author Name"]) +
                " " +
                check(cardData["Last Name"])}
            </Typography>
            <Typography className={classes.date}>
              {checkDate(cardData["Last modified time"])}
            </Typography>
            <Typography className={classes.response}>
              {responses + " Responses"}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
