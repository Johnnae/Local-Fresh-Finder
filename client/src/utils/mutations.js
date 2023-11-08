import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    # Use the login mutation and pass in the email and password variables as arguments to the mutation
    login(email: $email, password: $password) {
      # When the mutation is complete, return the token and user object
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    # Use the addUser mutation and pass in the required variables (username, email, password) as arguments to the mutation
    addUser(username: $username, email: $email, password: $password) {
      # When the mutation is complete, return the token and user object
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($bookData: bookInput!) {
    # Use the saveBook mutation and pass in the required variable (input) as an argument to the mutation
    saveBook(bookData: $bookData) {
      # When the mutation is complete, return the updated user object
      _id
      username
      email
      bookCount
      savedBooks {
        # Make sure that the savedBooks field returns an array of books!
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    # Use the removeBook mutation and pass in the required variable (bookId) as an argument to the mutation
    removeBook(bookId: $bookId) {
      # When the mutation is complete, return the updated user object
      _id
      username
      email
      bookCount
      savedBooks {
        # Make sure that the savedBooks field returns an array of books!
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;