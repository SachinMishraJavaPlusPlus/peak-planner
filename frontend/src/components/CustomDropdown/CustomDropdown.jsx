// import React, { useState } from "react";
// import { Dropdown, Form } from "react-bootstrap";
// import "../CustomDropdown/customdropdown.css";

// const CustomDropdown = ({ label, options, onSelect }) => {
//   const [value, setValue] = useState("");
//   const [selectedValue, setSelectedValue] = useState("");

//   const handleClick = (selecedVal) => {
//     setSelectedValue(selecedVal);
//     onSelect(selecedVal);
//   };

//   return (
//     <>
//       <label className="item-search-label"> {label}</label>
//       <Dropdown className="dropdown-custom" onSelect={handleClick}>
//         <Dropdown.Toggle id="dropdown-custom-components">
//          <span>{selectedValue ? selectedValue : "Search..."}</span> 
//         </Dropdown.Toggle>

//         <Dropdown.Menu>
//           <Form.Control
//             autoFocus
//             className=" my-1"
//             placeholder="Search..."
//             onChange={(e) => setValue(e.target.value)}
//             value={value}
//           />
//           <ul className="list-unstyled">

//             {options
//               .filter(
//                 (option) =>
//                   !value || option.toLowerCase().startsWith(value.toLowerCase())
//               )
//               .map((option, index) => (
//                 <li  key={index}>

//                 <Dropdown.Item eventKey={option}>
//                   {option}
//                 </Dropdown.Item>
//                 </li>
//               ))}
//           </ul>
//         </Dropdown.Menu>
//       </Dropdown>
      
//     </>
//   );
// };

// export default CustomDropdown;












// import React, { useState, useEffect } from "react";
// import { Dropdown, Form } from "react-bootstrap";
// import "../CustomDropdown/customdropdown.css";

// const CustomDropdown = ({ label, options, onSelect, reset }) => {
//   const [value, setValue] = useState("");
//   const [selectedValue, setSelectedValue] = useState("");

//   useEffect(() => {
//     if (reset) {
//       setValue(""); // Reset the input value
//       setSelectedValue(""); // Reset the selected value
//     }
//   }, [reset]);

//   const handleClick = (selectedVal) => {
//     setSelectedValue(selectedVal);
//     onSelect(selectedVal);
//   };

//   return (
//     <>
//       <label className="item-search-label">{label}</label>
//       <Dropdown className="dropdown-custom" onSelect={handleClick}>
//         <Dropdown.Toggle id="dropdown-custom-components">
//           <span>{selectedValue ? selectedValue : "Search..."}</span>
//         </Dropdown.Toggle>

//         <Dropdown.Menu>
//           <Form.Control
//             autoFocus
//             className="my-1"
//             placeholder="Search..."
//             onChange={(e) => setValue(e.target.value)}
//             value={value}
//           />
//           <ul className="list-unstyled">
//             {options
//               .filter(
//                 (option) =>
//                   !value || option.toLowerCase().startsWith(value.toLowerCase())
//               )
//               .map((option, index) => (
//                 <li key={index}>
//                   <Dropdown.Item eventKey={option}>{option}</Dropdown.Item>
//                 </li>
//               ))}
//           </ul>
//         </Dropdown.Menu>
//       </Dropdown>
//     </>
//   );
// };

// export default CustomDropdown;




import React, { useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import "./customdropdown.css";

const CustomDropdown = ({ label, options, onSelect, selectedValue, reset }) => {
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState(selectedValue || ""); // Use selectedValue as initial value if provided

  const handleClick = (selectedVal) => {
    setSelected(selectedVal);
    onSelect(selectedVal);
  };

  // Filter options based on user input
  const filteredOptions = options.filter(
    (option) =>
      !value || option.toLowerCase().startsWith(value.toLowerCase())
  );

  return (
    <>
      <label className="item-search-label">{label}</label>
      <Dropdown className="dropdown-custom" onSelect={handleClick}>
        <Dropdown.Toggle id="dropdown-custom-components">
          <span>{selected ? selected : "Search..."}</span>
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ maxHeight: "200px", overflowY: "auto" }}>
          {/* Input box for search */}
          <Form.Control
            autoFocus
            className="my-1"
            placeholder="Search..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <ul className="list-unstyled">
            {filteredOptions.slice(0, 10).map((option, index) => (
              <li key={index}>
                <Dropdown.Item eventKey={option}>{option}</Dropdown.Item>
              </li>
            ))}
          </ul>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default CustomDropdown;
