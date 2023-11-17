import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      farmer {
        _id
        email
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
  mutation saveMarket($marketData: marketInput!) {
    saveMarket(marketData: $marketData) {
      _id
      email
      phone
      website
      bio
      companyName
      savedMarkets {
        marketId
        updateTime
        listing_name
        listing_address
      }
    }
  }
`;
export const REMOVE_MARKET = gql`
  mutation removeMarket($marketId: ID!) {
    removeMarket(marketId: $marketId) {
      _id
      email
      phone
      website
      bio
      companyName
      savedMarkets {
        marketId
        updateTime
        listing_name
        listingAddress
      }
    }
  }
`;

