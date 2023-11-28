import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      farmer {
        _id
        email
        phone
        website
        bio
        companyName
      }
    }
  }
`;
export const ADD_FARMER = gql`
  mutation addFarmer($email: String!, $password: String!, $phone: String!, $website: String, $bio: String, $companyName: String!) {
    addFarmer(email: $email, password: $password, phone: $phone, website: $website, bio: $bio, companyName: $companyName) {
      token
      farmer{
        _id
        email
        phone
        website
        bio
        companyName
      }
    }
  }
`;

export const SAVE_MARKET = gql`
  mutation saveMarket($farmerId: ID!, $marketId: ID!) {
    saveMarket(farmerId: $farmerId, marketId: $marketId) {
      _id
      savedMarkets {
        _id
      }
    }
  }
`;
export const REMOVE_MARKET = gql`
  mutation removeMarket($marketId: ID!, $farmerId: ID!) {
    removeMarket(marketId: $marketId, farmerId: $farmerId) {
      _id
      savedMarkets {
        _id
      }
    }
  }
`;

