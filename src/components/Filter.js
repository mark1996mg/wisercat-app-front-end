import React, { useEffect, useState } from "react";
import { FilterDialog } from "./FilterDialog";

export default function Filter() {
  const [filters, setFilters] = useState([]);
  const [isModalOpen, setModalToOpen] = useState(false);
  const openModal = () => setModalToOpen(true);
  const closeModal = () => setModalToOpen(false);
  const getFilters = () => {
    fetch("http://localhost:8090/bookFilter/filters")
      .then(response => response.json())
      .then(data => setFilters(data))
      .catch(error => console.error("Error: ", error));
  };

  useEffect(() => {
    getFilters();
  }, []);

  return (
    <div>
      <h1>Book Filter App!</h1>
      <button onClick={openModal}>Add new filter</button>
      {filters.map(filter => (
        <div id="filter" key={filter.id}>
          <h3>{filter.name}</h3>
          <table id="filterTable">
            <thead>
              <tr>
                <th>Criteria option</th>
                <th>Criteria condition</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {filter.filterCriteria.map(criteria => (
                <tr key={criteria.id}>
                  <td>{criteria.filterOption}</td>
                  <td>{criteria.condition}</td>
                  <td>{criteria.searchValue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      <FilterDialog handleOpen={isModalOpen} handleClose={closeModal} />
    </div>
  );
};
