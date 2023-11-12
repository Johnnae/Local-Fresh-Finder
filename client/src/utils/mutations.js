import { gql } from '@apollo/client';


export const SAVE_market = gql`
  mutation SaveMarket($marketData: marketInput!) {
    saveMarket(marketData: $marketData) {
      
      marketCount
      savedMarkets {
        marketId
        authors
        description
        title
        image
        link
      }
    }
  }
`;
export const REMOVE_market = gql`
  mutation RemoveMarket($marketId: ID!) {
    removeMarket(marketId: $marketId) {
      _id
      authors
      savedMarkets {
        marketId
        title
      }
    }
  }
`;
export const ADD_farmer = gql`
  mutation AddFarmer($farmername: String!, $email: String!, $password: String!) {
    addFarmer(farmername: $farmername, email: $email, password: $password) {
      _id
      farmername
      email
    }
  }
`; 
export const LOGIN_USER = gql`
  mutation removeFarmer($email: String!, $password: String!) {
    loginFarmer(email: $email, password: $password) {
      token
      farmer {
        _id
        farmerame
        email
      }
    }
  }
`;