const { User, Thought } = require('../models');

module.exports = {
    // get all users
    async getUsers(req, res) {
      try {
        const users = await User.find();
        res.json(users);
      } catch (err) {
        res.status(500).json(err);
      }
    },

    // get single user by Id
    async getSingleUser(req, res) {
      try {
        const user = await User.findOne({ _id: req.params.userId})
          .select('-__v')
          //.populate({ path: 'thoughts', select: '-__v'})
          //.populate({ path: 'friends', select: '-__v'});

        // cannot find user
        if (!user) {
          return res.status(404).json({ message: 'No user with that ID' });
        }

        res.json(user);

      } catch (err) {
        res.status(500).json(err);
      }
    },

    // create a new user
    async createUser(req, res) {
        try {
          const user = await User.create(req.body);
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
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
        res.status(200).json(user);
        console.log(`Updated: ${result}`);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    
    // delete user
    async deleteUser(req, res) {
      try {
        const user = await User.findOneAndDelete( 
          { _id: req.params.userId},
        );
        res.status(200).json(user);
        console.log(`Deleted: ${result}`);
      } catch (err) {
        res.status(500).json(err);
      }
    },
};