import React, { useEffect, useState } from "react";
import { Chip, Checkbox, FormGroup, FormControlLabel, Button } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { makeStyles } from "@material-ui/core/styles";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
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

  console.log('unique data', uniqueData);
  const [defaultAuthors, setDefaultAuthors] = useState(uniqueData);
  const [selectedAuthors, setSelectedAuthors] = useState(uniqueData);
  const [authorsScroll, setAuthorsScroll] = useState(false);

  useEffect(() => {
    setDefaultAuthors(uniqueData)
    setSelectedAuthors(uniqueData)
  }, [uniqueData]);


  const resetFilters = (event) => {
    setNoResponse(true);
    setResponses(true);
    setAuthors(uniqueData);
    setSelectedAuthors(uniqueData)
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
          onChange={(event, newValue, reason) => {
            setAuthors(newValue);
            setSelectedAuthors(newValue);
          }}
          value={selectedAuthors}
          renderTags={(value, getTagProps) => {
            const numTags = value.length;
            if (authorsScroll) {
              return (
                <div className="d-flex" style={{ maxHeight: '20vh', overflow: 'auto' }}>
                  {value.map((option, index) => (
                    <Chip
                      color="gray"
                      label={option}
                      size="small"
                      {...getTagProps({ index })}
                    />
                  ))}
                </div>
              );
            } else {
              return (
                value.map((option, index) => (
                  <Chip
                    color="gray"
                    label={option}
                    size="small"
                    {...getTagProps({ index })}
                  />
                )));
            }
          }}
          onFocus={() => setAuthorsScroll(true)}
          onBlur={() => setAuthorsScroll(false)}
          renderOption={(props, option, { selected }) => (
            <div style={{ maxHeight: '20vh', overFlowY: "auto" }}>
              <li {...props} >
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  className={classes.checkbox}
                  checked={selected}
                  style={{ color: "#DD9933" }}
                />
                {option}
              </li>
            </div>
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
