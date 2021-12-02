import exportedData from "../util/records_new.json";
import JournalCard from "./JournalCard";
import ChapbookCard from "./ChapbookCard";
import Modal from "./Modal"

export default function Cards() {
	return (
		<div>
			{exportedData.map((entry) => {
				return <JournalCard cardData={entry} />
        // return <Modal cardData={entry} />;
				// return <ChapbookCard cardData={entry} />;
			})}
		</div>
	);
}
