import React from "react";
import { AppBar, Toolbar, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	logo: {
		cursor: "pointer",
	},
	link: {
		textDecoration: "none",
		color: "gray",
		font: "Open Sans",
		fontSize: "18px",
		fontsize: "2vh",
		fontWeight: "700",
		marginRight: theme.spacing(20),
		"&:hover": {
			borderBottom: "1px solid black",
			color: "black",
		},
	},
	selected: {
		textDecoration: "none",
		color: "black",
		font: "Open Sans",
		fontSize: "18px",
		fontsize: "2vh",
		fontWeight: "700",
		marginRight: theme.spacing(20),
		"&:hover": {
			borderBottom: "1px solid black",
		},
	}
}));

function Navbar(props) {
	const classes = useStyles();
	const { category } = props;
	console.log('category', category);
	return (
		<AppBar
			position="static"
			style={{ background: "transparent", boxShadow: "none", padding: "1%" }}
		>
			<Toolbar>
				<div className={classes.navlinks}>
					<Link to="/" className={category == 'Featured' ? classes.selected : classes.link}>
						Featured
					</Link>
					<Link to="/art" className={category == 'Art' ? classes.selected : classes.link}>
						Art
					</Link>
					<Link to="/journal" className={category == 'Journal' ? classes.selected : classes.link}>
						Journals
					</Link>
					<Link to="/poetry" className={category == 'Poetry' ? classes.selected : classes.link}>
						Poetry
					</Link>
					<Link to="/chapbook" className={category == 'Chapbook' ? classes.selected : classes.link}>
						Chapbooks
					</Link>
				</div>
			</Toolbar>
		</AppBar>
	);
}
export default Navbar;
