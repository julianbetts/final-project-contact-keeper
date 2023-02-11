import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      contacts {
        _id
        contactText
        createdAt
      }
    }
  }
`;

export const QUERY_CONTACTS = gql`
  query getContacts {
    contacts {
      _id
      contactText
      contactAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_CONTACT = gql`
  query getSingleContact($contactId: ID!) {
    contact(contactId: $contactId) {
      _id
      contactText
      contactAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      contacts {
        _id
        contactText
        contactAuthor
        createdAt
      }
    }
  }
`;
