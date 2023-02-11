const { AuthenticationError } = require('apollo-server-express');
const { User, Contact } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('contacts');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('contacts');
    },
    contacts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Contact.find(params).sort({ createdAt: -1 });
    },
    contact: async (parent, { contactId }) => {
      return Contact.findOne({ _id: contactId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('contacts');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addContact: async (parent, { contactText }, context) => {
      if (context.user) {
        const contact = await Contact.create({
          contactText,
          contactAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { contacts: contact._id } }
        );

        return contact;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeContact: async (parent, { contactId }, context) => {
      if (context.user) {
        const contact = await Contact.findOneAndDelete({
          _id: contactId,
          contactAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { contacts: contact._id } }
        );

        return contact;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
