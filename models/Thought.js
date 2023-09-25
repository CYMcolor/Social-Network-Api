const { Schema, model } = require('mongoose');
const dayjs = require('dayjs');
const reactionSchema = require('./Reaction')

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: [true, 'Text is required'],
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // MMM is Jan-Dec format
            get: function () { dayjs().format('MMM DD YYYY') }
        },
        username: {
            type: String,
            required: [true, 'Username is required']
        },
        reactions: [reactionSchema], 
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
const  Thought = model('Thought', thoughtSchema);

module.exports = Thought;