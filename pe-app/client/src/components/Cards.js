import exportedData from "../util/records_new.json";
import JournalCard from "./JournalCard";
import ChapbookCard from "./ChapbookCard";

export default function Cards() {
	return (
		<div>
			{exportedData.map((entry) => {
				return <JournalCard cardData={entry} />;
				//<ChapbookCard cardData={entry} />;
			})}
		</div>
	);
}
