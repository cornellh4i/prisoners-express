import React from "react";
import exportedData from "../util/records_new.json"
import JournalCard from "./JournalCard";
import ChapbookCard from "./ChapbookCard";
  

export default function Cards() {
  return (
    <div>
      <h4></h4>
      <JournalCard cardData = {exportedData[0]}/>
      <ChapbookCard cardData = {exportedData[0]}/>
      {/* // {
      //   exportedData.forEach((entry)=>{
      //     // console.log(entry);
      //     <SingleCard props={entry}/>
      //   })
      // } */}
  
    </div>
  );
}