import ChapbookCard from "./ChapbookCard.js";
import React, { useEffect, useState } from "react";
import { Checkbox, FormGroup, FormControlLabel, Grid } from "@material-ui/core";
import Navbar from "./Navbar.js";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function ChapbookPage() {
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
				d.filter((entry) => entry["Program (category)"] === "Chapbook")
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

	const handleNoResponseChange = (event) => {
		setNoResponse(!showNoResponse);
	};

	const handleResponseChange = (event) => {
		setResponses(!showResponses);
	};

	return (
		<div>
			<Navbar />
			<FormGroup style={{ display: "inline-block" }}>
				<FormControlLabel
					control={
						<Autocomplete
							multiple
							limitTags={2}
							options={uniqueAuthors}
							getOptionLabel={(option) => option}
							sx={{ width: 250 }}
							size="small"
							defaultValue={uniqueAuthors}
							onChange={(event, newValue) => {
								setSelectedAuthors(newValue);
							}}
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
									/>
									{option}
								</li>
							)}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Selected Artists"
								/>
							)}
						/>
					}
				/>
				<FormControlLabel
					control={
						<Checkbox
							defaultChecked
							style={{ color: "#DD9933" }}
							onChange={handleNoResponseChange}
						/>
					}
					label="0 responses"
				/>
				<FormControlLabel
					control={
						<Checkbox
							defaultChecked
							style={{ color: "#DD9933" }}
							onChange={handleResponseChange}
						/>
					}
					label="1+ responses"
				/>
			</FormGroup>
			<Grid container justify="center" spacing={2}>
				{data.map((entry) => {
					const author =
						entry["Author Name"] + " " + entry["Last Name"];
					let responses;
					if (entry["Responses"]) {
						responses = entry["Responses"].length;
					} else {
						responses = 0;
					}
					if (
						selectedAuthors.includes(author) &&
						((showNoResponse && responses === 0) ||
							(showResponses && responses > 0))
					) {
						return (
							<Grid item xs={4}>
								<ChapbookCard
									cardData={entry}
									show={show}
									responses={responses}
								/>
							</Grid>
						);
					}
				})}
			</Grid>
			<button onClick={() => setShow(true)}>Show Modal</button>
		</div>
	);
}
