const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: [true, 'Text is required'],
            minLength: 1,
            maxLength: 280
        },
        createdAt: {

        },
        username: {
            type: String,
            required: [true, 'Username is required']
        },
        //reactions: [reactionSchema] //temp until reaction model is made
    },
    {
        toJSON: {
            //need virtuals for reaction count
            virtuals: true,
        },
        id: false,
    }
);

//create friend count virtual
thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        //size of friend list is the how many frie
        return this.reactions.length;
    })

// Initialize our Thought model
const  Thought = model('thought', thoughtSchema);

module.exports = Thought;