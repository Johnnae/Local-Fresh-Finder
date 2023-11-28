import { gql } from '@apollo/client';

export const GET_ME = gql`
  query farmer($farmerId: ID!) {
    farmer(farmerId: $farmerId) {
      _id
      email
      phone
      website
      bio
      companyName
      savedMarkets {
        _id
        listingName
        locationAddress
      }
    }
  }
`;

export const QUERY_MARKETS = gql`
  query markets {
    markets {
      _id
      listingName
      locationAddress
    }
  }
`;

