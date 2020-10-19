// Get static properties for company table's column
export const CompanyColumns = [
  {
    key: "name",
    sortable: false,
    placeholder: "Company Name",
  },
  {
    key: "age",
    sortable: true,
    type: "number",
    placeholder: "Age",
    range: { min: 1, max: 10000 },
  },
];

// Get static properties for office table's column
export const OfficeColumns = [
  {
    key: "location",
    sortable: false,
    placeholder: "Location",
  },
  {
    key: "age",
    sortable: true,
    type: "number",
    placeholder: "Age",
    range: { min: 1, max: 10000 },
  },
];
