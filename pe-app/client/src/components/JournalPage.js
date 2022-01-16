import JournalCard from "./JournalCard.js";
import React, { useEffect, useState } from "react";
import { Checkbox, FormGroup, FormControlLabel, Grid } from "@material-ui/core";
import Navbar from "./Navbar.js";
import Filters from "./Filters.js";
import rectangle from "./greyrectangle.jpeg";
import JournalModal from "./JournalModal.js"

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

function checkDate(data) {
	return data !== undefined ? dates[parseInt(data.split("-")[1]) - 1] + " " + data.split("-")[0] : "";
}

function checkLoc(data1, data2) {
	if (data1 === undefined && data2 === undefined) {
		return "";
	} else if (data1 === undefined) {
		return data2;
	} else if (data2 === undefined) {
		return data1;
	} else {
		return data1 + ", " + data2;
	}
}

export default function JournalPage() {
	const [selectedAuthors, setSelectedAuthors] = useState([]);
	const [uniqueAuthors, setUniqueAuthors] = useState([]);
	const [showNoResponse, setNoResponse] = useState(true);
	const [showResponses, setResponses] = useState(true);
	const [data, setData] = useState([]);
	const [show, setShow] = useState('');

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

	const getMailingAddr = (worksBySameAuthor) => {
		return worksBySameAuthor == undefined ? "" :
			"\n" +
			check(worksBySameAuthor[0]["Author Name"]) +
			" " +
			check(worksBySameAuthor[0]["Last Name"]) +
			", ID:" +
			"\n" +
			check(worksBySameAuthor[0]["Room Number"]) +
			" " +
			check(worksBySameAuthor[0]["Pre-Address"]) +
			"\n" +
			check(worksBySameAuthor[0]["Address"]) +
			" " +
			check(worksBySameAuthor[0]["City"]) +
			", " +
			check(worksBySameAuthor[0]["State"]) +
			" " +
			check(worksBySameAuthor[0]["Zip"])
	}

	const getLocation = (worksBySameAuthor) => {
		return worksBySameAuthor == undefined ? "" :
			checkLoc(
				worksBySameAuthor[0]["City"],
				worksBySameAuthor[0]["State"]
			);
	}

	const getModalData = (worksBySameAuthor) => {
		let mostRecentDate = worksBySameAuthor == null ? "" :
			checkDate(worksBySameAuthor[0]["Last modified time"]);
		let modalData = [];
		let responses = 0;
		let imgSrc = rectangle;
		let blankImage = (
			<img
				src={imgSrc}
				alt="grey recentangle"
				style={{
					height: "30vh",
					padding: "1vw",
				}}
			/>
		);

		let image = blankImage;

		if (worksBySameAuthor !== null) {
			worksBySameAuthor.map((entry) => {
				let imgSrc = rectangle;
				if (check(entry["Attachments"][0]["thumbnails"])) {
					imgSrc = entry["Attachments"][0]["thumbnails"]["large"]["url"];

					image = <img src={imgSrc}
						alt="prisoner journal entry"
						style={{
							height: "30vh",
							padding: "1vw",
						}} />
				} else {
					image = blankImage;
				}

				if (entry["Responses"]) {
					responses = entry["Responses"].length;
				}
				const date = checkDate(entry["Last modified time"])
				const obj = { image: image, date: date }
				modalData.push(obj);

				let recent = mostRecentDate.split(" ");
				let dateArr = date.split(" ")

				if (parseInt(dateArr[1]) > parseInt(recent[1])) {
					mostRecentDate = date
				}
				else if (dates.indexOf(dateArr[0]) > dates.indexOf(recent[0])) {
					mostRecentDate = date
				}
			})
		}

		return {
			mostRecentDate: mostRecentDate,
			responses: responses,
			modalData: modalData
		};
	}

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
			<div style={{ padding: "3%", paddingRight: '5%', paddingLeft: '5%', }}>
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
							const { modalData, responses, mostRecentDate } =
								getModalData(worksByAuthor);
							const mailingAddr = getMailingAddr(worksByAuthor);
							const location = getLocation(worksByAuthor);
							console.log(responses, mostRecentDate, author);
							return (
								<Grid item xs>
									<JournalCard author={author}
										showNoResponse={showNoResponse} showResponses={showResponses}
										selectedAuthors={selectedAuthors}
										responses={responses}
										mostRecentDate={mostRecentDate}
										location={location}
										openModal={() => setShow(author)}
									/>
									<JournalModal
										onClose={() => setShow('')}
										show={show}
										modalData={modalData}
										responses={responses}
										mostRecentDate={mostRecentDate}
										author={author}
										mailingAddr={mailingAddr}
									/>
								</ Grid>
							);
						})
					}
				</Grid>
			</div>
		</div>
	);
}
