import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
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
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_CONTACT = gql`
  mutation addContact($contactText: String!) {
    addContact(contactText: $contactText) {
      _id
      
      
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($contactId: ID!, $commentText: String!) {
    addComment(contactId: $contactId, commentText: $commentText) {
      _id
      contactText
      contactAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
