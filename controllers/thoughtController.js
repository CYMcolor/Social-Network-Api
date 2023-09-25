const { User, Thought } = require('../models');

module.exports = {
    // create a new thought 
    async createThought(req, res) {
        try {
          const thought = await Thought.create(req.body);
          // update associated User from the req.body
          const user = await User.findByIdAndUpdate(
            // find by username from req.body
            { username: req.body.username},
            // update with thought id
            { $addToSet: { thoughts: thought._id }},
            // show updated info on return
            {new: true}
          );
          
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
    },

};