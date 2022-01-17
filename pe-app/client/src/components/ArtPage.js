import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import ArtworkCard from "./ArtworkCard.js";
import Navbar from "./Navbar.js";
import Filters from "./Filters.js";
import rectangle from "./greyrectangle.jpeg";
import Modal from "./Modal.js";

const dates = [
	"January",
	"Feburary",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

export default function ArtPage() {
	const [show, setShow] = useState(-1);
	const [selectedAuthors, setSelectedAuthors] = useState([]);
	const [uniqueAuthors, setUniqueAuthors] = useState([]);
	const [showNoResponse, setNoResponse] = useState(true);
	const [showResponses, setResponses] = useState(true);
	const [worksByAuthor, setWorksByAuthor] = useState({});

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

				let temp = {};
				authorSet.map((author) => {
					const works = d.filter(function (value) {
						return value["Author Name"] + " " + value["Last Name"] === author
					});
					temp[author] = works;
				});
				setWorksByAuthor(temp);
			});
	}, []);

	console.log('unique authors', uniqueAuthors);

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
					{data.map((entry, index) => {
						const author =
							entry["Author Name"] + " " + entry["Last Name"];

						let responses;
						if (entry["Responses"]) {
							responses = entry["Responses"].length;
						} else {
							responses = 0;
						}
						let imgSrc;
						if (entry["Attachments"] &&
							entry["Attachments"][0] &&
							entry["Attachments"][0]["thumbnails"]) {
							imgSrc = entry["Attachments"][0]["thumbnails"]["large"]["url"];
						} else {
							imgSrc = rectangle;
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
										responses={responses}
										imgSrc={imgSrc}
										openModal={() => setShow(index)}
									/>
									<Modal
										close={() => setShow(-1)}
										show={show}
										worksByAuthor={worksByAuthor[author]}
										data={entry}
										imgSrc={imgSrc}
										responses={responses}
										dates={dates}
										id={index}
									/>
								</Grid>
							);
						}
					})}
				</Grid>
			</div>
		</div>
	);
}
