import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';

const CheckboxDropdown = () => {
  let selectedItems = [];

  const handleCheckboxChange = (item) => {
    const isSelected = selectedItems.includes(item);
    console.log(item, isSelected)

    if (isSelected) {
        selectedItems = selectedItems.filter((selected) => selected !== item);
    } else {
        selectedItems.push(item);
    }
  };

  const checkboxItems = ['Элемент 1', 'Элемент 2', 'Элемент 3'];

  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        Фильтры
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {checkboxItems.map((item, index) => (
          <Dropdown.Item key={index} style={{display: 'flex', justifyContent: 'space-between'}}>
                {item}
                <input
                type="checkbox"
                checked={selectedItems.includes(item)}
                onChange={() => handleCheckboxChange(item)}
                ></input>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CheckboxDropdown;
