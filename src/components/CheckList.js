import React from "react";

const CheckList = ({checklist}) => {
  return (
    <div>
      {checklist.map((list) => (
        <div key={list.id}>
          <h5>{list.name}</h5>
        </div>
      ))}
    </div>
  );
};

export default CheckList;
