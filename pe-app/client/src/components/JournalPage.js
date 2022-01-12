import exportedData from "../util/records_new.json";
import JournalCard from "./JournalCard.js";
import React, { useEffect, useState } from "react";
import { Checkbox, FormGroup, FormControlLabel, Grid } from "@material-ui/core";
import Navbar from "./Navbar.js";
import Modal from "./Modal.js";
import Filters from "./Filters.js";

export default function JournalPage() {
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
				d.filter((entry) => entry["Program (category)"] === "Journal")
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
			<Navbar category="Journal" />
			<Filters
				uniqueData={uniqueAuthors}
				setNoResponse={setNoResponse}
				setResponses={setResponses}
				setAuthors={setSelectedAuthors}
				showNoResponse={showNoResponse}
				showResponses={showResponses}
				category="Poetry"
			/>
			<div style={{ padding: "3%" }}>
				<Grid
					container
					justify="center"
					spacing={3}
					alignItems="center"
				>
					{
						uniqueAuthors.map((author) => {
							const worksByAuthor = data.filter((entry) =>
								entry["Author Name"] + " " + entry["Last Name"] == author);
							console.log('worksByAuthor', worksByAuthor);
							return (
								<JournalCard worksBySameAuthor={worksByAuthor} author={author}
									showNoResponse={showNoResponse} showResponses={showResponses}
									selectedAuthors={selectedAuthors} />
							);
						})
					}
				</Grid>
			</div>

		</div>
	);
}
