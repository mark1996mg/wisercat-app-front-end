import React, { useState } from "react";
import Modal from "@mui/material/Modal";

export const FilterDialog = ({ handleOpen, handleClose }) => {
  const [filterName, setFilterName] = useState("");
  const [option, setOption] = useState("AMOUNT");
  const [condition, setCondition] = useState("EQUALS");
  const [inputValue, setInputValue] = useState("");
  const [criteriaRows, setCriteriaRows] = useState([
    { id: 1, option: "AMOUNT", condition: "EQUALS", inputValue: "" },
  ]);

  if (!handleOpen) {
    return null;
  }

  const filter = {
    name: filterName,
    filterCriteria: criteriaRows.map((row) => ({
      filterOption: row.option,
      condition: row.condition,
      searchValue: row.inputValue,
    })),
  };

  const postDataToServer = () => {
    fetch("http://localhost:8090/bookFilter/addFilter", {
      method: "POST",
      body: JSON.stringify(filter),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (response.status === 200) {
          console.log("Filter saved successfully");
          handleClose();
          window.location.reload();
      } else {
          console.log("Problems with savign filter");
      }
    })
  }


  const createNewCriteria = () => {
    const newRow = {
      id: criteriaRows.length + 1,
      option: "AMOUNT",
      condition: "EQUALS",
      inputValue: "",
    };
    setCriteriaRows([...criteriaRows, newRow]);
  };
  const deleteCriteria = (id) => {
    const rows = criteriaRows.filter((row) => row.id !== id);
    setCriteriaRows(rows);
  };

  const handleOptionChange = (e, rowId) => {
    const selectedOption = e.target.value;
    setCriteriaRows((rows) =>
      rows.map((row) =>  row.id == rowId ? { ...row, option: selectedOption } : row)
    );
    setOption(selectedOption);

    if (("AMOUNT", "DATE").includes(selectedOption)) {
      setCondition("EQUALS");
    } else {
      setCondition("STARTS_WITH");
    }
  };

  const handleConditionChange = (e, rowId) => {
    const selectedCondition = e.target.value;
    setCriteriaRows((rows) =>
      rows.map((row) =>  row.id == rowId ? { ...row, condition: selectedCondition } : row)
    );
    setCondition(selectedCondition);
  };

  const handleInputValueChange = (e, rowId) => {
    const searchInputValue = e.target.value;
    setCriteriaRows((rows) =>
      rows.map((row) => row.id == rowId ? { ...row, inputValue: searchInputValue } : row)
    );
    setInputValue(searchInputValue);
  };

  return (
    <Modal id="filterDialog" open={handleOpen} onClose={handleClose}>
      <div id="filterDialogContainer">
        <div id="filterDialogBar">
          <p id="dialogBarButton">Filter</p>
          <button id="closeButton" onClick={handleClose}>×</button>
        </div>
        <div id="filterDialogInputs">
          <div id="filterName">
            <h4>Filter name</h4>
            <input type="text" onChange={(e) => setFilterName(e.target.value)}></input>
          </div>
          <div>
          {criteriaRows.map((row) => (
            <div id="filterCriteria" key={row.id}>
              <h4>Criteria</h4>
              <div id="filterOption">
                <select id="filterOptionSelection" value={row.option} onChange={(e) => handleOptionChange(e, row.id)}>
                  <option value="TITLE">Title</option>
                  <option value="AUTHOR">Author</option>
                  <option value="GENRE">Genre</option>
                  <option value="DATE">Publishing date</option>
                  <option value="AMOUNT">Copies sold</option>
                </select>
              </div>
              <div id="filterCondition">
                <select id="filterConditionSelection" value={row.condition} onChange={(e) => handleConditionChange(e, row.id)}>
                  {(() => {
                    if (row.option == "AMOUNT") {
                      return (
                        <>
                          <option value="EQUALS">Equals</option>
                          <option value="MORE">More</option>
                          <option value="LESS">Less</option>
                        </>
                      );
                    } else if (row.option == "DATE") {
                      return (
                        <>
                          <option value="EQUALS">Equals</option>
                          <option value="AFTER">After</option>
                          <option value="BEFORE">Before</option>
                        </>
                      );
                    } else {
                      return (
                        <>
                          <option value="STARTS_WITH">Starts with</option>
                          <option value="CONTAINS">Contains</option>
                          <option value="EXACT_MATCH">Exact match</option>
                        </>
                      );
                    }
                  }) ()}
                </select>
              </div>
              <div id="searchInput">
                {(() => {
                  if (row.option == "AMOUNT") {
                    return (<><input type="number" onChange={(e) => handleInputValueChange(e, row.id)}></input></>);
                  } else if (row.option == "DATE") {
                    return (<><input type="date" onChange={(e) => handleInputValueChange(e, row.id)}></input></>);
                  } else {
                    return (<><input type="text" onChange={(e) => handleInputValueChange(e, row.id)}></input></>);
                  }
                }) ()}
              </div>
              <button id="deleteCriteriaButton" onClick={() => deleteCriteria(row.id)}>-</button>
            </div>
          ))}
          </div>
          <div id="addRowButton"><button id="addCriteriaButton" onClick={createNewCriteria}>+ ADD</button></div>
          <div id="saveOrCancelButtons">
            <button id="closeModal" onClick={handleClose}>Cancel</button>
            <button id="saveFilter" onClick={postDataToServer}>Save</button>
          </div>
        </div>
      </div>

    </Modal>
  );
};
