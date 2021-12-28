import React from "react";
import { AppBar, Toolbar, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	logo: {
		cursor: "pointer",
	},
	link: {
		textDecoration: "none",
		color: "black",
		font: "Open Sans",
		fontSize: "18px",
		fontWeight: "700",
		marginRight: theme.spacing(20),
		"&:hover": {
			borderBottom: "1px solid white",
		},
	},
}));

function Navbar() {
	const classes = useStyles();
	return (
		<AppBar
			position="static"
			style={{ background: "transparent", boxShadow: "none" }}
		>
			<Toolbar>
				<div className={classes.navlinks}>
					<Link to="/" className={classes.link}>
						Featured
					</Link>
					<Link to="/art" className={classes.link}>
						Art
					</Link>
					<Link to="/journal" className={classes.link}>
						Journals
					</Link>
					<Link to="/poetry" className={classes.link}>
						Poetry
					</Link>
					<Link to="/chapbook" className={classes.link}>
						Chapbooks
					</Link>
				</div>
			</Toolbar>
		</AppBar>
	);
}
export default Navbar;
