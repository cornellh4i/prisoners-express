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
import Filters from "./Filters.js";

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

	return (
		<div>
			<Navbar category="Poetry" />
			<Filters uniqueData={uniqueAuthors}
				setNoResponse={setNoResponse}
				setResponses={setResponses}
				setAuthors={setAuthors}
				showNoResponse={showNoResponse}
				showResponses={showResponses}
				category="Poetry" />
			<div style={{ padding: '3%' }}>
				<Grid container justify="center" spacing={3} alignItems="center">
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
								<Grid item>
									<PoetryCard cardData={entry} show={show} responses={responses} />
								</Grid>
							);
						}
					})}
				</Grid>
			</div>
			<button onClick={() => setShow(true)}>Show Modal</button>

		</div>
	);
}
