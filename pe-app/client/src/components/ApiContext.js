import React, { useContext, useState, useEffect, createContext } from "react";

const APIContext = createContext();

function APIContextProvider({ children }) {
	// Initialize state
	const [data, setData] = useState([]);

	// Fetch data
	useEffect(() => {
		fetch(process.env.REACT_APP_API).then((response) =>
			setData(response.json())
		);
	}, []);

	return <APIContextProvider value={{ data }}>{children}</APIContextProvider>;
}

export default APIContextProvider;

export function useAPI() {
	const context = useContext(APIContext);
	if (context === undefined) {
		throw new Error("Context must be used within a Provider");
	}
	return context;
}
