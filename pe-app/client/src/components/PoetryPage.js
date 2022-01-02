import React, { useEffect, useState } from "react";
import PoetryCard from "./PoetryCard.js";
import Modal from "./Modal.js";
import { Checkbox, FormGroup, FormControlLabel, Grid } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Navbar from "./Navbar.js";
import Filters from "./Filters.js";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function Cards() {
	const [show, setShow] = useState(false);
	const [selectedAuthors, setSelectedAuthors] = useState([]);
	const [uniqueAuthors, setUniqueAuthors] = useState([]);
	const [showNoResponse, setNoResponse] = useState(true);
	const [showResponses, setResponses] = useState(true);
	const [data, setData] = useState([]);

	useEffect(() => {
		fetch(process.env.REACT_APP_API)
			.then((response) => response.json())
			.then((d) =>
				d.filter((entry) => entry["Program (category)"] === "Poetry")
			)
			.then((d) => {
				console.log(d);
				setData(d);
				const authors = d.map(
					(entry) => entry["Author Name"] + " " + entry["Last Name"]
				);
				const authorSet = [...new Set(authors)];
				setSelectedAuthors(authorSet);
				setUniqueAuthors(authorSet);
			});
	}, []);
	return (

		<div>
			<Navbar category="Poetry" />
			<Filters uniqueData={uniqueAuthors}
				setNoResponse={setNoResponse}
				setResponses={setResponses}
				setAuthors={setSelectedAuthors}
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
