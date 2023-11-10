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
        description
        title
        image
        link
      }
    }
  }
`;