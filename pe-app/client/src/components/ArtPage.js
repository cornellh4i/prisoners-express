import exportedData from "../util/records_new.json";
import React, { useState } from "react";
import { Checkbox, FormGroup, FormControlLabel, Grid } from "@material-ui/core";
import EssayCard from "./EssayCard.js";
import ArtworkCard from "./ArtworkCard.js";
import PoetryCard from "./PoetryCard.js";
import Modal from "./Modal.js";
import Navbar from "./Navbar.js";

export default function ArtPage() {
	const [show, setShow] = useState(false);
	const data = exportedData.filter(
		(entry) => entry["Program (category)"] == "Art"
	);

	// initalizeState() {
	// 	this.setState({ cards: artData })
	// };

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
							<ArtworkCard cardData={entry} />
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
