const { User, Thought } = require('../models');

module.exports = {
    // get all users
    async getThoughts(req, res) {
        try {
          const thought = await Thought.find();
          res.json(thought);
        } catch (err) {
          res.json(err);
        }
    },

    // create a new thought 
    async createThought(req, res) {
        try {
          const thought = await Thought.create(req.body);
          // update associated User from the req.body
          const user = await User.findOneAndUpdate(
            // find by username from req.body
            { _id: req.body.userId},
            // update with newly created thought
            { $addToSet: { thoughts: thought }},
            // show updated info on return
            { new: true}
          );

          res.json({thought, user});
          
        } catch (err) {
          res.status(500).json(err);
        }
    },

};