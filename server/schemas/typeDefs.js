// This is defining the queries that can be performed on your API. In this case, there are three queries: users, user, and me. The users query returns an array of User objects, the user query returns a single User object based on the provided username, and the me query returns the User object of the currently authenticated user.
const typeDefs = `

  type Query  {
      
      farmer(farmerId: ID!): Farmer
      markets: [Market]!
      market(marketId: ID!): Market
    }

  type Farmer  { 
      _id: ID!
      email: String!
      phone: String!
      website: String
      bio: String
      companyName: String!
      savedMarkets: [Market] 
  } 
  
  type Market {
      _id: ID!
      listingName: String!
      locationAddress: String!
    }
  type Mutation {
      login(email: String!, password: String!): Auth
      addFarmer(email: String!, password: String!, phone: String!, website: String, bio: String, companyName: String!): Auth
      saveMarket(farmerId: ID!, marketId: ID!): Farmer
      removeMarket(marketId: ID!, farmerId: ID!): Farmer

    } 

  type Auth { 
    token: ID!
    farmer: Farmer
  }
    
  input marketInput {
    marketId: String!
    updateTime: String
    listingName: String!
    locationAddress: String!
  } 
`;
module.exports = typeDefs;
