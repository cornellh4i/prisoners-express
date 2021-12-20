import React from "react";
import Cards from "./components/Cards";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ArtPage from "./components/ArtPage.js";
import ChapbookPage from "./components/ChapbookPage.js";
import PoetryPage from "./components/PoetryPage.js";
import JournalPage from "./components/JournalPage.js";
import EssayPage from "./components/EssayPage.js";

const font = "'Open Sans', sans-serif";
const theme = createTheme({
	typography: {
		fontFamily: font,
	},
});

export default function App() {
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<div>
					<Switch>
						<Route exact path="/" />
						<Route path="/art" component={ArtPage} />
						<Route path="/chapbook" component={ChapbookPage} />
						<Route path="/poetry" component={PoetryPage} />
						<Route path="/journal" component={JournalPage} />
						{/* <Route path="/essay" component={EssayPage} /> */}
					</Switch>
				</div>
			</BrowserRouter>
		</ThemeProvider>
	);
}
