const { User, Thought } = require('../models');

module.exports = {
    // get all users
    async getUsers(req, res) {
      try {
        const users = await User.find();
        res.json(users);
      } catch (err) {
        res.json(err);
      }
    },

    // get single user by Id
    async getSingleUser(req, res) {
      try {
        const user = await User.findOne({ _id: req.params.userId})
          // show __v which is the version key, it only increments when an array was updated
          .select('-__v')
          .populate('thoughts')
          .populate('friends');

        // cannot find user
        if (!user) {
          return res.json({ message: 'No user with that ID' });
        }

        res.json(user);

      } catch (err) {
        res.json(err);
        console.log(err);
      }
    },

    // create a new user 
    async createUser(req, res) {
        try {
          const user = await User.create(req.body);
          
          res.json(user);
        } catch (err) {
          res.json(err);
        }
    },

    // update user
    async updateUser(req, res) {
      try {
        const user = await User.findOneAndUpdate(
          // find by id
          { _id: req.params.userId},
          // update with req json 
          req.body,
          // show updated info on return
          {new: true}
        );
        // cannot find user
        if (!user) {
          return res.json({ message: 'No user with that ID' });
        }
        res.json(user);
        
      } catch (err) {
        res.json(err);
      }
    },
    
    // delete user
    async deleteUser(req, res) {
      try {
        const user = await User.findOneAndDelete( 
          { _id: req.params.userId},
        );
        // cannot find user
        if (!user) {
          return res.json({ message: 'No user with that ID' });
        }
        res.json(user);
      } catch (err) {
        res.json(err);
      }
    },

    // friends functions ------------------
    // add friend
    async addFriend(req, res) {
      try {
        const user = await User.findOneAndUpdate(
          // find by user id
          { _id: req.params.userId},
          // add friend by in params, addToSet makes sure it appends to array
          { $addToSet: { friends: req.params.friendId }},
          // show updated info on return
          {new: true}
        );
        // cannot find user
        if (!user) {
          return res.json({ message: 'No user with that ID' });
        }
        res.json(user);
      } catch (err) {
        //res.json(err);
        console.log(err);
      }
    },

    // delete friend
    async deleteFriend(req, res) {
      try {
        const user = await User.findOneAndUpdate(
          // find by user id
          { _id: req.params.userId},
          // add friend by in params, pull deletes from array
          { $pull: { friends: req.params.friendId }},
          // show updated info on return
          {new: true}
        );
        // cannot find user
        if (!user) {
          return res.json({ message: 'No user with that ID' });
        }

        res.json(user);
      } catch (err) {
        res.json(err);
      }
    },
};