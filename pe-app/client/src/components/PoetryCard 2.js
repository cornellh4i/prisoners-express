import React, { useState } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
// import mailicon from "./mail.png";
// import greyrectangle from "./grey_rectangle.jpeg"
import Modal from "./Modal.js";


export default function PoetryCard() {
  const [show, setShow] = useState(false)
  return (
    <div onClick={() => setShow(true)} style={{}}>
      <Card
        style={{
          width: 332,
          backgroundColor: "white",
        }}
      >
        <CardContent>
          <Typography
            style={{ fontSize: 20, fontWeight: "bold" }}
            variant="h4"
            component="h2"
          >
            Title
            {/* <img src={greyrectangle} width="140" height="130" align="right" alt="poem"></img> */}
          </Typography>

          <Typography
            style={{ fontSize: 14 }}
            color="textSecondary"
            gutterBottom
            variant="h3"
          >
            Author
          </Typography>

          <Typography
            style={{ fontSize: 14 }}
            color="textSecondary"
            gutterBottom
            variant="h3"
          >
            Date
          </Typography>

          <br></br>
          <br></br>
          <Typography variant="body2" component="p">
            Tag #1, Tag #2
          </Typography>

          {/* <img src={mailicon} width="20" height="20" align="left" alt="mail icon"></img> */}
        </CardContent>
      </Card>
      <Modal onClose={() => setShow(false)} show={show} />
    </div >
  );
}