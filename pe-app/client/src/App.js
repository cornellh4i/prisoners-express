import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./css/App.css";
import Home from "./components/Home.js";

function App() {
	return (
		<BrowserRouter>
			<div>
				<Switch>
					<Route exact path="/" component={Home} />
					{/* <Route path="/about" component={About} /> */}
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
