const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, 'Username is required'],
            //calls .trim()
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            //match email regex: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
            //or validate 
            validate: {
                validator: function(v) {
                    /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v)
                },
                message: 'Must be a valid email'
            }
        },
        thoughts: [{
            //type: Schema.Types.ObjectId // temp until thought model is made
            //ref: 'Thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
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

//create friend count virtual
userSchema
    .virtual('friendCount')
    .get(function () {
        //size of friend list is the how many frie
        return this.friends.length;
    })

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;