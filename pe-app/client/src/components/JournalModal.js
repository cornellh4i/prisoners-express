import React from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { makeStyles } from "@material-ui/core/styles";
import "../css/Modal.css";
import { Grid } from "@material-ui/core";

function check(data) {
	return data !== undefined ? data : "";
}

const useStyles = makeStyles({
	journalModalContent: {
		height: '90%',
		width: '50%',
		backgroundColor: "#fff",
	},
	journalModalAuthor: {
		fontSize: "5vh",
		paddingBottom: "1%",
		fontFamily: "'Open Sans', sans-serif",
		fontStyle: "normal",
	},
	journalModalDate: {
		fontSize: "14px",
		fontFamily: "'Open Sans', sans-serif",
		fontStyle: "normal",
		paddingBottom: "1%",
		color: "#828282",
	},
	journalModalAddress: {
		fontSize: "14px",
		fontFamily: "'Open Sans', sans-serif",
		fontStyle: "normal",
		whiteSpace: "pre-line",
	},
	journalModalBody: {
		padding: "7%",
	},
	journalImages: {
		paddingTop: "2%",
	},
	journalImage: {
		display: "block",
		marginLeft: "auto",
		marginRight: "auto",
		marginBottom: 0,
		width: "30%",
		textAlign: "center",
	},
	journalDates: {

	},

});

const JournalModal = (props) => {
	const { modalData, responses, mostRecentDate, author, mailingAddr } = props;
	const classes = useStyles();
	if (!props.show) {
		return null;
	}
	return (
		<div className="modal" onClick={props.onClose}>
			<div className={classes.journalModalContent} onClick={(e) => e.stopPropagation()}>
				<div className="modal-header">
					<button onClick={props.onClose} className="button">
						<CloseRoundedIcon
							fontSize="large"
							style={{
								backgroundColor: "transparent",
								color: "gray",
							}}
						/>
					</button>
				</div>
				<div className={classes.journalModalBody}>
					<div className={classes.journalModalAuthor}>
						{author}
					</div>

					<div className={classes.journalModalDate}>
						{"Last updated " + mostRecentDate +
							", " + responses + " Responses"}
					</div>

					<div className={classes.journalModalAddress}>
						{"Mailing Address:" + mailingAddr}
					</div>
					<Grid container
						justify="center"
						spacing={1}
						alignItems="flex-end" className={classes.journalImages}>
						{modalData.map((entry) => {
							return (
								<Grid item className={classes.journalImage}>
									{entry.image}
									{entry.date}
								</Grid>
							)
						})}
					</Grid>

				</div>
			</div>
		</div >
	);
};
export default JournalModal;
