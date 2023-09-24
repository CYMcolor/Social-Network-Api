const { Schema, model } = require('mongoose');


const reactionSchema = new Schema(
    {
        
    },
    {
        toJSON: {
            //need virtuals for reaction count
            virtuals: true,
        },
        id: false,
    }
);


// Initialize our Reaction model
const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;