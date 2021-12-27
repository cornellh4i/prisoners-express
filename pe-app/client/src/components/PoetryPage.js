import exportedData from "../util/records_new.json";
import React, { useState } from "react";
import PoetryCard from "./PoetryCard.js";
import Modal from "./Modal.js";
import { Checkbox, FormGroup, FormControlLabel, Grid } from "@material-ui/core";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Navbar from "./Navbar.js";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const data = exportedData.filter(
	(entry) => entry["Program (category)"] == "Poetry"
);


const authors = data.map((entry) =>
	(entry["Author Name"] + " " + entry["Last Name"]));
const uniqueAuthors = [... new Set(authors)];
export default function Cards() {
	const [show, setShow] = useState(false);
	const [selectedAuthors, setAuthors] = React.useState(uniqueAuthors);
	const [showNoResponse, setNoResponse] = React.useState(true);
	const [showResponses, setResponses] = React.useState(true);

	const handleNoResponseChange = (event) => {
		setNoResponse(!showNoResponse);
	}

	const handleResponseChange = (event) => {
		setResponses(!showResponses);
	}

	return (
		<div>
			<Navbar />
			<FormGroup style={{ display: "inline-block" }}>
				<FormControlLabel control={
					<Autocomplete
						multiple
						limitTags={2}
						options={uniqueAuthors}
						getOptionLabel={(option) => option}
						sx={{ width: 250 }}
						size="small"
						defaultValue={uniqueAuthors}
						onChange={(event, newValue) => {
							setAuthors(newValue);
						}}
						renderOption={(props, option, { selected }) => (
							<li {...props}>
								<Checkbox
									icon={icon}
									checkedIcon={checkedIcon}
									style={{ marginRight: 8, color: "#DD9933" }}
									checked={selected}
								/>
								{option}
							</li>
						)}
						renderInput={(params) => <TextField {...params} label="Selected Authors" />} />
				}
				/>
				<FormControlLabel
					control={
						<Checkbox defaultChecked style={{ color: "#DD9933" }}
							onChange={handleNoResponseChange} />
					}
					label="0 responses"
				/>
				<FormControlLabel
					control={
						<Checkbox defaultChecked style={{ color: "#DD9933" }}
							onChange={handleResponseChange} />
					}
					label="1+ responses"
				/>
			</FormGroup>
			<Grid container justify="center" spacing={2}>
				{data.map((entry) => {
					const author = entry["Author Name"] + " " + entry["Last Name"];
					let responses;
					if (entry["Responses"]) {
						responses = entry["Responses"].length;
					} else {
						responses = 0;
					}
					if (selectedAuthors.includes(author) &&
						((showNoResponse && responses == 0) || (showResponses && responses > 0))) {
						return (
							<Grid item xs={4}>
								<PoetryCard cardData={entry} show={show} responses={responses} />
							</Grid>
						);
					}
				})}
			</Grid>

			<button onClick={() => setShow(true)}>Show Modal</button>

		</div>
	);
}
