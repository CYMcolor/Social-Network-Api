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

    // get single thought by Id
    async getSingleThought(req, res) {
        try {
          const thought = await Thought.findOne({ _id: req.params.thoughtId});
  
          // cannot find user
          if (!thought) {
            return res.json({ message: 'No thought with that ID' });
          }
  
          res.json(thought);
  
        } catch (err) {
          res.json(err);
          console.log(err);
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

    // update thought
    async updateThought(req, res) {
        try {
          const thought = await Thought.findOneAndUpdate(
            // find by id
            { _id: req.params.thoughtId},
            // update with req json 
            req.body,
            // show updated info on return
            {new: true}
          );
          // cannot find user
          if (!thought) {
            return res.json({ message: 'No user with that ID' });
          }
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
    },
      

};