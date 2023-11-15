// This is defining the queries that can be performed on your API. In this case, there are three queries: users, user, and me. The users query returns an array of User objects, the user query returns a single User object based on the provided username, and the me query returns the User object of the currently authenticated user.
const typeDefs = `

  type Query  {
      
      me: Farmer
      markets: [Market]!
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

  >>>>>>> Stashed changes
  type Market {
      marketId: String!
      updateTime: String
      listingName: String!
      listingAddress: String!
    }
  type Mutation {
      login(email: String!, password: String!): Auth
      addFarmer(companyName: String!, email: String!, password: String! ): Auth
      saveMarket(marketData: marketInput): Farmer
      removeMarket(marketId: ID!): Farmer
    } 

  type Auth { 
    token: ID!
    user: Farmer
  }
    
  input marketInput {
    marketId: String!
    updateTime: String
    listingName: String!
    listingAddress: String!
  } 
`;
module.exports = typeDefs;
