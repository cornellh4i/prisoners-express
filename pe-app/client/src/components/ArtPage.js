import exportedData from "../util/records_new.json";
import React, { useState } from "react";
import { Checkbox, FormGroup, FormControlLabel, Grid } from "@material-ui/core";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ArtworkCard from "./ArtworkCard.js";
import Navbar from "./Navbar.js";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const data = exportedData.filter(
	(entry) => entry["Program (category)"] == "Art"
);
const authors = data.map((entry) =>
	(entry["Author Name"] + " " + entry["Last Name"]));
const uniqueAuthors = [... new Set(authors)].map((entry) => ({ label: entry }));

export default function ArtPage() {
	const [show, setShow] = useState(false);

	return (
		<div>
			<Navbar />
			<FormGroup style={{ display: "inline-block" }}>
				<FormControlLabel control={
					<Autocomplete
						multiple
						limitTags={2}
						options={uniqueAuthors}
						getOptionLabel={(option) => option.label}
						sx={{ width: 250 }}
						renderOption={(props, option, { selected }) => (
							<li {...props}>
								<Checkbox
									icon={icon}
									checkedIcon={checkedIcon}
									style={{ marginRight: 8, color: "#DD9933" }}
									checked={selected}
									defaultChecked
								/>
								{option.label}
							</li>
						)}
						renderInput={(params) => <TextField {...params} label="Selected Artists" />} />
				}
				/>
				<FormControlLabel
					control={
						<Checkbox defaultChecked style={{ color: "#DD9933" }} />
					}
					label="0 responses"
				/>
				<FormControlLabel
					control={
						<Checkbox defaultChecked style={{ color: "#DD9933" }} />
					}
					label="1+ responses"
				/>
			</FormGroup>
			<Grid container justify="center" spacing={2}>
				{data.map((entry) => {
					// return <JournalCard cardData={entry} />;
					return (
						<Grid item xs={4}>
							<ArtworkCard cardData={entry} show={show} />
						</Grid>
					);
					//<ChapbookCard cardData={entry} />;
				})}
			</Grid>
			<button onClick={() => setShow(true)}>Show Modal</button>
		</div>
	);
}
