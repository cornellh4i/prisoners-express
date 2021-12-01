import exportedData from "../util/records_new.json";
import JournalCard from "./JournalCard";
import ChapbookCard from "./ChapbookCard";
import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import EssayCard from "./EssayCard.js";
import ArtworkCard from "./ArtworkCard.js";
import PoetryCard from "./PoetryCard.js";
import Modal from "./Modal.js";

export default function Cards() {
	const [show, setShow] = useState(false)
	const artData = exportedData.filter((entry) =>
		entry["Program (category)"] == "Art")

	return (
		<div>
			{artData.map((entry) => {
				// return <JournalCard cardData={entry} />;
				return <ArtworkCard cardData={entry} />;
				//<ChapbookCard cardData={entry} />;
			})}
			<Grid container justify="center" spacing={4}>
				<Grid item xs={4}>
					<EssayCard />
				</Grid>

				<Grid item xs={4}>
					<EssayCard />
				</Grid>

				<Grid item xs={4}>
					<EssayCard />
				</Grid>

				<Grid item xs={4}>
					<PoetryCard />
				</Grid>

				<Grid item xs={4}>
					<PoetryCard />
				</Grid>

				<Grid item xs={4}>
					<PoetryCard />
				</Grid>
			</Grid>
			<button onClick={() => setShow(true)}>Show Modal</button>
			<Modal onClose={() => setShow(false)} show={show} />
		</div>
	);
}
