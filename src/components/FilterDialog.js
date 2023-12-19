import React, { useState } from "react";
import Modal from '@mui/material/Modal';

export const FilterDialog = ({ handleOpen, handleClose }) => {
  const [criteriaRows, setCriteriaRows] = useState([
    { id: 1, option: 'TITLE', condition: 'STARTS_WITH', inputValue: '' },
  ]);

  if (!handleOpen) {
    return null;
  }

  const createNewCriteria = () => {
    const newRow = {
      id: criteriaRows.length + 1,
      option: 'TITLE',
      condition: 'STARTS_WITH',
      inputValue: '',
    };
    setCriteriaRows([...criteriaRows, newRow]);
  };

  const deleteCriteria = (id) => {
    const rows = criteriaRows.filter((row) => row.id !== id);
    setCriteriaRows(rows);
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
            <input type="text"></input>
          </div>
          <div>
          {criteriaRows.map((row) => (
            <div id="filterCriteria" key={row.id}>
              <h4>Criteria</h4>
              <div id="filterOption">
                <select id="filterOptionSelection">
                  <option value="TITLE">Title</option>
                  <option value="AUTHOR">Author</option>
                  <option value="GENRE">Genre</option>
                  <option value="DATE">Publishing date</option>
                  <option value="AMOUNT">Copies sold</option>
                </select>
              </div>
              <div id="filterCondition">
                <select id="filterConditionSelection">
                  <option value="STARTS_WITH">Starts with</option>
                  <option value="CONTAINS">Contains</option>
                  <option value="EXACT_MATCH">Exact match</option>
                  <option value="EQUALS">Equals</option>
                  <option value="MORE">More</option>
                  <option value="LESS">Less</option>
                  <option value="AFTER">After</option>
                  <option value="BEFORE">Before</option>
                </select>
              </div>
              <div id="searchInput">
                <input type="text"></input>
              </div>
              <button id="deleteCriteriaButton" onClick={() => deleteCriteria(row.id)}>-</button>
            </div>
          ))}
          </div>
          <div id="addRowButton"><button id="addCriteriaButton" onClick={createNewCriteria}>+ ADD</button></div>
          <div id="saveOrCancelButtons">
            <button id="closeModal" onClick={handleClose}>Cancel</button>
            <button id="saveFilter">Save</button>
          </div>
        </div>
      </div>

    </Modal>
  );
};
