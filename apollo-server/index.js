const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`

# Feel free to change any type if required
# I THINK company must be a string in order to work witg given data

type Company {
  id: ID!
  name: String
  age: Int
}

type Office {
  id: ID!
  location: String
  age: Int
  company: ID! 
}

type CompanyWithOffices {
	id: ID!
 	name: String
 	age: Int
 	offices: [Office]
}

type Query {
  company(id: ID!): Company
  companies_older_than(age: Int): [Company]
  company_at(location: String): Company
  companies: [CompanyWithOffices]
}

type Mutation {
  add_company(name: String, age: Int): Company!
  add_office(location: String, age: Int, company_id: ID): Office!
}
`;

// Feel free to add new data

const companies = [
  {
    id: '1',
    name: 'Retina',
    age: 3,
  },
  {
    id: '2',
    name: 'Google',
    age: 25,
  }
];

const offices = [
   {
    id: '1',
    location: 'Ankara',
    age: 3,
    company: '1'
   },
   {
    id: '2',
    location: 'Berlin',
    age: 25,
    company: '2'
   },
   {
    id: '3',
    location: 'Barcelona',
    age: 12,
    company: '2'
   },  
   {
    id: '4',
    location: 'US',
    age: 6,
    company: '2'
   }
]

var nextCompany = 3;
var nextOffice = 5;

// Resolvers were added as examples, feel free to modify, remove or refactor

const resolvers = {
  Query: {
    company(parent, args) {
      return companies.find(user => user.id === args.id);
    },
    companies_older_than(parent, args){
      return companies.filter(user => user.age > args.age);
    },
    company_at(parent, args){
      return companies.find(company => company.id === offices.find(office => office.location === args.location).company)
    },
    companies(){
    		const officeCompanyMap = new Map();
    		offices.forEach(office => {officeCompanyMap.has(office.company) ? officeCompanyMap.get(office.company).push(office) : officeCompanyMap.set(office.company,[office])})
	    	return companies.map(company=> {return {...company, offices: officeCompanyMap.get(company.id) || [] }});
    }
  },
  Mutation: {
    add_company (parent, args)  {
      var company = {
        id: '' + nextCompany++,
        name: args.name,
        age: args.age,
      };
      companies.push(company);
      return company;
    },
    add_office (parent, args) {
      var office = {
        id: '' + nextOffice++,
        location: args.location,
        age: args.age,
        company: args.company_id,
      }
      offices.push(office);
      return office;
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({port: 8099}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
