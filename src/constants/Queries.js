import gql from "graphql-tag";

/**
 * Create getAllCompanies query. It will return all of the comapnies and their offices.
 * (offices will be in the company object)
 */
export const GET_ALL_COMPANIES = gql`
  query {
    companies {
      id
      name
      age
      offices {
        id
        location
        age
        company
      }
    }
  }
`;

/**
 * Add a new company to apollo server. It will create company and return its new id
 * @param {*} company
 * @retrurn {*} id of the created company
 */
export const addCompany = (company) => {
  return {
    mutation: gql`
      mutation($name: String!, $age: Int!) {
        add_company(name: $name, age: $age) {
          id
        }
      }
    `,
    variables: {
      name: company.name,
      age: company.age,
    },
  };
};

/**
 * Add a new office to apollo server. It will create office and return its new id
 * @param {*} office
 * @retrurn {*} id of the created office
 */
export const addOffice = (office) => {
  return {
    mutation: gql`
      mutation($location: String, $age: Int, $company_id: ID!) {
        add_office(location: $location, age: $age, company_id: $company_id) {
          id
        }
      }
    `,
    variables: {
      location: office.location,
      age: office.age,
      company_id: office.company,
    },
  };
};
