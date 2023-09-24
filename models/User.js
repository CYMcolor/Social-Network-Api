const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            //calls .trim()
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            //match email
        },
        thoughts: [{
            // Schema.Types.ObjectId // temp until thought model is made
            //ref: 'Thought'
        }],
        friends: [{
            // Schema.Types.ObjectId // temp until thought model is made
            //ref: 'User'
        }]
    },
    {
        toJSON: {
            //need virtuals for friends count
            virtuals: true,
        },
        id: false,
    }
);

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;