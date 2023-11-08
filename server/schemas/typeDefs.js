// This is defining the queries that can be performed on your API. In this case, there are three queries: users, user, and me. The users query returns an array of User objects, the user query returns a single User object based on the provided username, and the me query returns the User object of the currently authenticated user.

const typeDefs = `#graphql
type Query  {
    
    me: User
  }
type User  { 
    _id: ID
    username: String
    email: String
    farmerCount: Int
    savedFarmers: [Farmer] 
} 
type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addFarmer(farmerText: String!): Farmer
   
    removeFarmer(farmerId: ID!): User

    
  } 
type farmer {
    farmerId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  } 
  type Auth { 
    token: ID!
    user: User
  } 
`;
module.exports = typeDefs;
