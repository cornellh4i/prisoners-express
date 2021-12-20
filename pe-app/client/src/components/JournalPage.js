import exportedData from "../util/records_new.json";
import JournalCard from "./JournalCard.js";
import React, { useState } from "react";
import { Checkbox, FormGroup, FormControlLabel, Grid } from "@material-ui/core";
import Navbar from "./Navbar.js";
import Modal from "./Modal.js";

export default function JournalPage() {
	const [show, setShow] = useState(false);
	const data = exportedData.filter(
		(entry) => entry["Program (category)"] == "Journal"
	);

	return (
		<div>
			<Navbar />
			<FormGroup style={{ display: "inline-block" }}>
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
							<JournalCard cardData={entry} />
						</Grid>
					);
					//<ChapbookCard cardData={entry} />;
				})}
			</Grid>
			<button onClick={() => setShow(true)}>Show Modal</button>
			<Modal onClose={() => setShow(false)} show={show} />
		</div>
	);
}
