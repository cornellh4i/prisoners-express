import exportedData from "../util/records_new.json";
import JournalCard from "./JournalCard.js";
import React, { useEffect, useState } from "react";
import { Checkbox, FormGroup, FormControlLabel, Grid } from "@material-ui/core";
import Navbar from "./Navbar.js";
import Modal from "./Modal.js";

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
			{
          		uniqueAuthors.map((author) => {
            		const worksByAuthor = data.filter((entry) => entry["Author Name"] + " " + entry["Last Name"] == author);
				console.log(worksByAuthor)
            	return (
             	 <Grid item xs={4}>
                		<JournalCard worksBySameAuthor = {worksByAuthor} author = {author} />
              	</Grid>
            );
          })
        }
			</Grid>
			<button onClick={() => setShow(true)}>Show Modal</button>
			<Modal onClose={() => setShow(false)} show={show} />
		</div>
	);
}
