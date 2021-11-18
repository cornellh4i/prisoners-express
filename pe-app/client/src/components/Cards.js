import React from "react";
import exportedData from "../util/records_new.json";
import SingleCard from "./SingleCard";

export default function Cards() {
	return (
		<div>
			{exportedData.map((entry) => {
				return <SingleCard cardData={entry} />;
			})}
		</div>
	);
}
