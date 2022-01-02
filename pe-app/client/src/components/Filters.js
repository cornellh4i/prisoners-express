import React, { useState } from "react";
import { Checkbox, FormGroup, FormControlLabel, Button } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { makeStyles } from "@material-ui/core/styles";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const useStyles = makeStyles({
  checkbox: {
    marginRight: 8, color: "#DD9933"
  },
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

export default function Filters(props) {
  const classes = useStyles();
  const { uniqueData,
    showNoResponse,
    showResponses,
    setNoResponse,
    setResponses,
    setAuthors,
    category } = props;

  const handleNoResponseChange = (event) => {
    setNoResponse(!showNoResponse);
  }

  const handleResponseChange = (event) => {
    setResponses(!showResponses);
  }

  const resetFilters = (event) => {
    setNoResponse(true);
    setResponses(true);
    setAuthors(uniqueData);
  }


  return (
    <FormGroup style={{ display: "inline-block", paddingLeft: '3%' }}>
      <FormControlLabel control={
        <Autocomplete
          multiple
          limitTags={2}
          options={uniqueData}
          getOptionLabel={(option) => option}
          sx={{ width: 250 }}
          size="small"
          defaultValue={uniqueData}
          onChange={(event, newValue) => {
            setAuthors(newValue);
          }}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                className={classes.checkbox}
                checked={selected}
              />
              {option}
            </li>
          )}
          renderInput={(params) => <TextField {...params}
            label={category == "Art" ? "Selected Artists" : "Selected Authors"} />} />
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
    </FormGroup >
  );
}
