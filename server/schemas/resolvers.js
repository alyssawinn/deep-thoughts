const { User, Thought } = require('../models');

const resolvers = {
    Query: {
        //get all thoughts by username
        thoughts: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Thought.find(params).sort({ createdAt: -1 });
        },

        //get all thoughts by thought id
        thought: async (parent, { _id }) => {
            return Thought.findOne({ _id });
        },

        //get all users
        users: async () => {
            return User.find()
            .select('-__v -password')
            .populate('friends')
            .populate('thoughts');
        },

        //get user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
            //omit Mongoose-specific __v property and user's password information
            .select('-__v -password')
            //populate fields for friends and thoughts to get any associated data in return
            .populate('friends')
            .populate('thoughts');
        }
    }
};

module.exports = resolvers;