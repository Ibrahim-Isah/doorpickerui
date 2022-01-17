import React from "react";

import PicketCard from "../places/PicketCard";

function LatestBlog({ latestarticles }) {
  return (
    <>
      <div className="row mt-5">
        {latestarticles.map((item, index) => (
          <PicketCard item={item} key={item.id + index} />
        ))}
      </div>
    </>
  );
}

export default LatestBlog;
