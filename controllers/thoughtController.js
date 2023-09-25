const { User, Thought } = require('../models');

module.exports = {
    // get all users
    async getThoughts(req, res) {
        try {
          const thought = await Thought.find();
          res.status(200).json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
    },

    // get single thought by Id
    async getSingleThought(req, res) {
        try {
          const thought = await Thought.findOne({ _id: req.params.thoughtId});
  
          // cannot find user
          if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
          }
  
          res.status(200).json(thought);
  
        } catch (err) {
          res.status(500).json(err);
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

          res.status(200).json({thought, user});
          
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
            return res.status(404).json({ message: 'No user with that ID' });
          }
          res.status(200).json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
    },

    // delete user
    async deleteThought(req, res) {
      try {
        const thought = await Thought.findOneAndDelete( 
          { _id: req.params.thoughtId},
        );
        // cannot find user
        if (!thought) {
          return res.status(404).json({ message: 'No thought with that ID' });
        }
        res.status(200).json( thought);
      } catch (err) {
        res.status(500).json(err);
      }
    },
      
    // reactions -------------------------------------
    // add reaction 
    async addReaction(req, res) {
        try {
          // update thought to have new reaction
          const thought = await Thought.findOneAndUpdate(
            // find by user id
            { _id: req.params.thoughtId},
            // add friend by in params, addToSet makes sure it appends to array
            { $addToSet: { reactions: req.body }},
            // show updated info on return
            {new: true}
          );
          // cannot find user
          if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
          }
          res.status(200).json(thought);
        } catch (err) {
          res.status(500).json(err);
          //console.log(err);
        }
    },

    // delete reaction
    async deleteReaction(req, res) {
        try {
          const thought = await Thought.findOneAndUpdate(
            // find by user id
            { _id: req.params.thoughtId},
            // add friend by in params, pull deletes from array
            { $pull: { reactions: { reactionId: req.params.reactionId }}},
            // show updated info on return
            {new: true}
          );
          // cannot find thought
          if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
          }
  
          res.status(200).json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
      },
};