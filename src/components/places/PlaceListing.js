import React from "react";
import PicketCard from "./PicketCard";

function PlaceListing({ listitems }) {
  return (
    <>
      {listitems.map((item) => (
        <PicketCard item={item} key={item.id} />
      ))}
    </>
  );
}

export default PlaceListing;
