import React from "react";
import Modal from '@mui/material/Modal';

export const FilterDialog = ({ handleOpen, handleClose }) => {
  if (!handleOpen) {
    return null;
  }

  return (
    <Modal id="modal" open={handleOpen} onClose={handleClose}>
      <div id="modalContainer">
        <button id="closeButton" onClick={handleClose}>X</button>
        <div id="filterName">
          <h4>Filter name</h4>
          <input type="text"></input>
        </div>
        <div id="filterCriteria">
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
          <button id="deleteCriteriaButton">Delete</button>
        </div>
        <button id="addCriteriaButton">Add row</button>
      </div>

    </Modal>
  );
};
