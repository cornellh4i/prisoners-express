import exportedData from "../util/records_new.json";
import React, { useState } from "react";
import { Checkbox, FormGroup, FormControlLabel, Grid } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ArtworkCard from "./ArtworkCard.js";
import JournalCard from "./JournalCard.js";
import PoetryCard from "./PoetryCard.js";
import ChapbookCard from "./ChapbookCard.js";
import Navbar from "./Navbar.js";
import Masonry from "@mui/lab/Masonry";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const data = exportedData.filter((entry) => entry["Display"] == true);
const authors = data.map(
	(entry) => entry["Author Name"] + " " + entry["Last Name"]
);
const uniqueAuthors = [...new Set(authors)].map((entry) => ({ label: entry }));

export default function FeaturedPage() {
	const [show, setShow] = useState(false);

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
							getOptionLabel={(option) => option.label}
							sx={{ width: 250 }}
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
									{option.label}
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

			<div className="featured-container">
				<Masonry
					columns="auto"
					spacing={1}
					defaultColumns={4}
					defaultSpacing={1}
				>
					{data.map((entry) => {
						const type = entry["Program (category)"];
						switch (type) {
							case "Art":
								return (
									<ArtworkCard cardData={entry} show={show} />
								);
							case "Journal":
								return (
									<JournalCard cardData={entry} show={show} />
								);
							case "Poetry":
								return (
									<PoetryCard cardData={entry} show={show} />
								);
							case "Chapbook":
								return (
									<ChapbookCard
										cardData={entry}
										show={show}
									/>
								);
							default:
								return null;
						}
					})}
				</Masonry>
			</div>

			<button onClick={() => setShow(true)}>Show Modal</button>
		</div>
	);
}
