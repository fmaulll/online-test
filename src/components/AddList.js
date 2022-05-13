import React, { useState } from "react";

const AddList = ({token}) => {
  const [checklistName, setChecklistName] = useState("");
  const fetchPostChecklist = () => {
    fetch("http://94.74.86.174:8080/api/checklist", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: checklistName,
      }),
    });
  };

  const checklistNameHandler = (e) => {
    setChecklistName(e.target.value);
    e.preventDefault()
  };

  const addNewChecklistHandler = (e) => {
    e.preventDefault()
      fetchPostChecklist()
  };
  return (
    <div>
      <input
        type="text"
        placeholder="input new checklist!"
        onChange={checklistNameHandler}
      />
      <button onClick={addNewChecklistHandler}>add new checklist!</button>
    </div>
  );
};

export default AddList;
