import React, { useEffect, useState } from "react";
import PoetryCard from "./PoetryCard.js";
import { Grid } from "@material-ui/core";
import Modal from "./Modal.js";
import Navbar from "./Navbar.js";
import Filters from "./Filters.js";
import rectangle from "./greyrectangle.jpeg";

function check(data) {
	return typeof data !== "undefined" ? data : "";
}

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

export default function Cards() {
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
				d.filter((entry) => entry["Program (category)"] === "Poetry")
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
	return (
		<div>
			<Navbar category="Poetry" />
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
							((showNoResponse && responses === 0) ||
								(showResponses && responses > 0))
						) {
							return (
								<Grid item>
									<PoetryCard
										cardData={entry}
										responses={responses}
										imgSrc={imgSrc}
										openModal={() => setShow(index)}
									/>
									<Modal
										close={() => setShow(-1)}
										show={show}
										data={entry}
										imgSrc={imgSrc}
										responses={responses}
										dates={dates}
										worksByAuthor={worksByAuthor[author]}
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
