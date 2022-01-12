import React from "react";

import PicketCard from "./PicketCard";

function PlaceOne({ places }) {
  return (
    <div className="mt-5">
      <div className="row">
        {places?.map((item) => (
          <PicketCard item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}

export default PlaceOne;
