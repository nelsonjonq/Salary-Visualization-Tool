import React from "react";

import { Dropdown } from "react-bootstrap";

const Filters = (props) => {
  const restauraunt = props.restauraunt;
  const employmentType = props.employmentType;
  const gender = props.gender;

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {restauraunt || "Select Restaurant"}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={props.onChangeRestaurant}>
            {"Gamine"}
          </Dropdown.Item>
          <Dropdown.Item onClick={props.onChangeRestaurant}>
            {"Hookfish"}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          {employmentType || "Select Employment Type"}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={props.onChangeEmploymentType}>
            {"Part Time"}
          </Dropdown.Item>
          <Dropdown.Item onClick={props.onChangeEmploymentType}>
            {"Full Time"}
          </Dropdown.Item>
          <Dropdown.Item onClick={props.onChangeEmploymentType}>
            {"Contractor"}
          </Dropdown.Item>
          <Dropdown.Item onClick={props.onChangeEmploymentType}>
            {"All"}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown>
        <Dropdown.Toggle variant="danger" id="dropdown-basic">
          {gender || "Select Gender"}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={props.onChangeGender}>{"Male"}</Dropdown.Item>
          <Dropdown.Item onClick={props.onChangeGender}>
            {"Female"}
          </Dropdown.Item>
          <Dropdown.Item onClick={props.onChangeGender}>{"All"}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default Filters;
