import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import ArtworkCard from "./ArtworkCard.js";
import Navbar from "./Navbar.js";
import Filters from "./Filters.js";

export default function ArtPage() {
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
				d.filter((entry) => entry["Program (category)"] === "Art")
			)
			.then((d) => {
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
			<Navbar category="Art" />
			<Filters
				uniqueData={uniqueAuthors}
				setNoResponse={setNoResponse}
				setResponses={setResponses}
				setAuthors={setSelectedAuthors}
				showNoResponse={showNoResponse}
				showResponses={showResponses}
				category="Art"
			/>
			<div style={{ padding: "3%" }}>
				<Grid
					container
					justify="center"
					spacing={3}
					alignItems="center"
				>
					{data.map((entry) => {
						const author =
							entry["Author Name"] + " " + entry["Last Name"];
						const worksByAuthor = data.filter(function (value) { return value["Author Name"] === entry["Author Name"] && value["Last Name"] === entry["Last Name"] && value["Title"] !== entry["Title"] });
						console.log("ARRAY" + worksByAuthor);
						let responses;
						if (entry["Responses"]) {
							responses = entry["Responses"].length;
						} else {
							responses = 0;
						}
						if (
							selectedAuthors.includes(author) &&
							((showNoResponse && responses == 0) ||
								(showResponses && responses > 0))
						) {
							return (
								<Grid item>
									<ArtworkCard
										cardData={entry}
										worksByAuthor={worksByAuthor}
										show={show}
										responses={responses}
									/>
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
