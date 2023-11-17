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
        listing_name
        listingAddress
      }
    }
  }
`;

export const QUERY_MARKETS = gql`
  query queryMarkets($listing_name: String!) {
    markets(listing_name: $listing_name) {
      _id
      listing_name
      location_address
    }
  }
`;

