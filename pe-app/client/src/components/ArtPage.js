import exportedData from "../util/records_new.json";
import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import Filters from "./Filters.js";
import ArtworkCard from "./ArtworkCard.js";
import Navbar from "./Navbar.js";

const data = exportedData.filter(
	(entry) => entry["Program (category)"] == "Art"
);

const authors = data.map((entry) =>
	(entry["Author Name"] + " " + entry["Last Name"]));
const uniqueAuthors = [... new Set(authors)];

export default function ArtPage() {
	const [show, setShow] = useState(false);
	const [selectedAuthors, setAuthors] = React.useState(uniqueAuthors);
	const [showNoResponse, setNoResponse] = React.useState(true);
	const [showResponses, setResponses] = React.useState(true);

	return (
		<div>
			<Navbar category="Art" />
			<Filters uniqueData={uniqueAuthors}
				setNoResponse={setNoResponse}
				setResponses={setResponses}
				setAuthors={setAuthors}
				showNoResponse={showNoResponse}
				showResponses={showResponses}
				category="Art" />
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
									<ArtworkCard cardData={entry} show={show} responses={responses} />
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
