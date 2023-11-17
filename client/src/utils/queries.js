import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      website
      bio
      companyName
      savedMarkets {
        _id
        listingName
        listingAddress
      }
    }
  }
`;

export const QUERY_MARKETS = gql`
  query queryMarkets($listingName: String!) {
    markets(listingName: $listing_name) {
      _id
      listingName
      listingAddress
    }
  }
`;

