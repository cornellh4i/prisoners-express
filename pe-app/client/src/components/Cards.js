import React from "react";
import exportedData from "../util/records_new.json"
import SingleCard from "./SingleCard";
  

export default function Cards() {
  return (
    <div>
      <h4>🧢</h4>
      <SingleCard cardData = {exportedData[0]}/>
      {/* // {
      //   exportedData.forEach((entry)=>{
      //     // console.log(entry);
      //     <SingleCard props={entry}/>
      //   })
      // } */}
  
    </div>
  );
}