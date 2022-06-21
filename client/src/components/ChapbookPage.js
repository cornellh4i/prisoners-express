import ChapbookCard from "./ChapbookCard.js";
import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import Navbar from "./Navbar.js";
import Filters from "./Filters.js";
import Modal from "./Modal.js";
import rectangle from "./greyrectangle.jpeg";

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

function check(data) {
	return data !== undefined ? data : "";
}

export default function ChapbookPage() {
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
				d.filter((entry) => entry["Program (category)"] === "Chapbook")
			)
			.then((d) => {
				console.log(d);
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
			<Navbar category="Chapbook" />
			<Filters
				uniqueData={uniqueAuthors}
				setNoResponse={setNoResponse}
				setResponses={setResponses}
				setAuthors={setSelectedAuthors}
				showNoResponse={showNoResponse}
				showResponses={showResponses}
				category="Chapbook"
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
						if (check(entry["Attachments"][0]["thumbnails"])) {
							imgSrc = entry["Attachments"][0]["thumbnails"]["large"]["url"];
							image = (
								<img src={imgSrc} alt="prisoner poetry"
									style={{
										height: "22vh",
										maxHeight: "100%",
										maxWidth: "10vw",
									}} />
							);
						} else {
							imgSrc = rectangle;
							image = (
								<img
									src={imgSrc}
									alt="grey rectangle"
									style={{
										height: "22vh",
										maxHeight: "100%",
										maxWidth: "10vw",
									}}
								/>
							);
						}
						let pdf;
						if (entry["Attachments"] &&
							entry["Attachments"][0] &&
							entry["Attachments"][0]["url"]) {
							pdf = entry["Attachments"][0]["url"];
						} else {
							pdf = "";
						}
						if (
							selectedAuthors.includes(author) &&
							((showNoResponse && responses === 0) ||
								(showResponses && responses > 0))
						) {
							return (
								<Grid item>
									<ChapbookCard
										cardData={entry}
										show={show}
										responses={responses}
										imgSrc={imgSrc}
										openModal={() => setShow(index)}
									/>
									<Modal
										close={() => setShow(-1)}
										show={show}
										data={entry}
										imgSrc={imgSrc}
										pdf={pdf}
										worksByAuthor={worksByAuthor[author]}
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
