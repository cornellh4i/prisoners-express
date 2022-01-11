import React from "react";
import "../css/JournalModal.css";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

function check(data) {
	return data !== undefined ? data : "";
}

const Modal = (props) => {
	const { modalData, responses, mostRecentDate, author, mailingAddr } = props;

	if (!props.show) {
		return null;
	}
	return (
		<div className="modal" onClick={props.onClose}>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
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
				<div className="modal-body">
					<div className="modal-author">
						{author}
					</div>
					<div className="modal-address">
						{"Mailing Address:" + mailingAddr}
					</div>
					<div className="modal-date">
						{mostRecentDate}

						{" " + responses + " Responses"}
					</div>
					<div className="images">
						{modalData.map((entry) => {
							return (
								<div>
									<div className="modal-image">
										{entry.image}
									</div>
									<div className="image-caption">
										{entry.date}
									</div>
								</div>
							)
						})}
					</div>

				</div>
			</div>
		</div>
	);
};
export default Modal;
