import React, { useState } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
// import mailicon from "./mail.png";
import Modal from "./Modal.js";


export default function EssayCard() {
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
          </Typography>

          <Typography
            style={{ fontSize: 14 }}
            color="textSecondary"
            gutterBottom
            variant="h3"
          >
            Author
          </Typography>
          <br></br>
          <Typography variant="body2" component="p">
            Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem
            Ipsum Lorem Ipsu...
          </Typography>
          <br></br>
          <Typography variant="body2" component="p">
            Month, Year
            {/* <img src={mailicon} width="20" height="20" align="right" alt="mail icon"></img> */}
          </Typography>
        </CardContent>
      </Card>
      <Modal onClose={() => setShow(false)} show={show} />
    </div >
  );
}