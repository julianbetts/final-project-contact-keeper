const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    contacts: [Contact]!
  }

  type Contact {
    _id: ID
    contactText: String
    contactAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    contacts(username: String): [Contact]
    contact(contactId: ID!): Contact
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addContact(contactText: String!): Contact
    removeContact(contactId: ID!): Contact
  }
`;

module.exports = typeDefs;
