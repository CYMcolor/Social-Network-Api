const { Schema,  Types } = require('mongoose');
const dayjs = require('dayjs');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()            
        },
        reactionBody: {
            type: String,
            required: [true, 'Reaction body is required'],
            maxLength: 280
        },
        username: {
            type: String,
            required: [true, 'Username is required'],
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // MMM is Jan-Dec format
            get: function () { dayjs().format('MMM DD YYYY') }
        },
    },
    {
        toJSON: {
            getters: true
        },
        id: false,
    }
);
//reactions are not models therfor no instialization

module.exports = reactionSchema;