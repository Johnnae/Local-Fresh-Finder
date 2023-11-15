import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      marketCount
      savedMarkets {
        Id
        farmer
        bio
        title
        image
        link
      }
    }
  }
`;

export const QUERY_MARKETS = gql`
  query getMarkets($companyName: String!) {
    markets(marketId: $marketId) {
      _id
      listingName
      listingAddress
    }
  }
`;