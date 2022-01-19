import React, { useState, useEffect } from "react";
import { Checkbox, FormGroup, FormControlLabel, Button } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ArtworkCard from "./ArtworkCard.js";
import JournalCard from "./JournalCard.js";
import PoetryCard from "./PoetryCard.js";
import ChapbookCard from "./ChapbookCard.js";
import Navbar from "./Navbar.js";
import rectangle from "./greyrectangle.jpeg";
import Masonry from "@mui/lab/Masonry";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "./Modal.js";

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

function check(data) {
  return typeof data !== "undefined" ? data : "";
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const categories = ["Art", "Poetry", "Chapbook"]
const useStyles = makeStyles({
  resetButton: {
    color: "black",
    border: "solid gray 1px",
    backgroundColor: "none",
    "&:hover": {
      border: "solid black 1px",
      backgroundColor: "#DD9933",
    }
  },
});

export default function FeaturedPage() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(categories);
  const [showNoResponse, setNoResponse] = useState(true);
  const [showResponses, setResponses] = useState(true);

  const classes = useStyles();

  useEffect(() => {
    fetch(process.env.REACT_APP_API)
      .then((response) => response.json())
      .then((d) => d.filter((entry) => entry["Display"] === true))
      .then((d) => {
        // console.log(d);
        setData(d);
      });
  }, []);

  const handleNoResponseChange = (event) => {
    setNoResponse(!showNoResponse);
  }

  const handleResponseChange = (event) => {
    setResponses(!showResponses);
  }

  const resetFilters = (event) => {
    setNoResponse(true);
    setResponses(true);
    setSelectedCategories(categories);
  }

  return (
    <div>
      <Navbar category="Featured" />
      <FormGroup style={{ display: "inline-block", paddingLeft: "3%" }}>
        <FormControlLabel
          control={
            <Autocomplete
              multiple
              limitTags={2}
              options={categories}
              getOptionLabel={(option) => option}
              sx={{ width: 250 }}
              onChange={(event, newValue, reason) => {
                setSelectedCategories(newValue);
              }}
              value={selectedCategories}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{
                      marginRight: 8,
                      color: "#DD9933",
                    }}
                    checked={selected}
                    defaultChecked
                  />
                  {option}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Selected Categories"
                />
              )}
            />
          }
        />
        <FormControlLabel
          control={
            <Checkbox defaultChecked style={{ color: "#DD9933" }}
              onChange={handleNoResponseChange}
              checked={
                showNoResponse
              } />
          }
          label="0 responses"
        />
        <FormControlLabel
          control={
            <Checkbox defaultChecked style={{ color: "#DD9933" }}
              onChange={handleResponseChange}
              checked={
                showResponses} />
          }
          label="1+ responses"
        />
        <Button className={classes.resetButton} onClick={resetFilters}>
          Reset
        </Button>
      </FormGroup>

      <div style={{ padding: "3%" }}>
        <Masonry
          columns="auto"
          spacing={1}
          defaultColumns={4}
          defaultSpacing={1}
        >
          {data.map((entry, index) => {
            const type = entry["Program (category)"];
            let imgSrc = rectangle;
            if (check(entry["Attachments"][0]["thumbnails"])) {
              imgSrc = entry["Attachments"][0]["thumbnails"]["large"]["url"];
            }
            let responses;
            if (entry["Responses"]) {
              responses = entry["Responses"].length;
            } else {
              responses = 0;
            }

            if (selectedCategories.includes(type) &&
              ((showNoResponse && responses === 0) ||
                (showResponses && responses > 0))) {
              switch (type) {
                case "Art":
                  return (
                    <div>
                      <ArtworkCard cardData={entry} responses={responses} imgSrc={imgSrc}
                        openModal={() => setShow(index)} />
                      <Modal
                        close={() => setShow(-1)}
                        show={show}
                        worksByAuthor={[]}
                        data={entry}
                        imgSrc={imgSrc}
                        responses={responses}
                        dates={dates}
                        id={index}
                      />
                    </div>

                  );
                case "Poetry":
                  return (
                    <div>
                      <PoetryCard
                        cardData={entry}
                        responses={responses}
                        imgSrc={imgSrc}
                        openModal={() => setShow(index)}
                      />
                      <Modal
                        close={() => setShow(-1)}
                        show={show}
                        data={entry}
                        imgSrc={imgSrc}
                        responses={responses}
                        dates={dates}
                        worksByAuthor={[]}
                        id={index}
                      />
                    </div>
                  );
                case "Chapbook":
                  return (
                    <div>
                      <ChapbookCard
                        cardData={entry}
                        show={show}
                        responses={responses}
                        imgSrc={imgSrc}
                        openModal={() => setShow(index)}
                      />
                      <Modal
                        close={() => setShow(-1)}
                        show={show}
                        data={entry}
                        imgSrc={imgSrc}
                        worksByAuthor={[]}
                        responses={responses}
                        dates={dates}
                        id={index}
                      />
                    </div>
                  );
                default:
                  return null;
              }
            }
          })}
        </Masonry>
      </div>
    </div>
  );
}
