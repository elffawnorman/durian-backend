const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema


const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
        },
        password: {
            type: String,
        },
        role: {
            type: String,
            default: 'user'
        },
        firstname: {
            type: String
        },
        lastname: {
            type: String
        },
        email: {
            type: String
        },

        tel: {
            type: String
        },
        enabled: {
            type: Boolean,
            default: true
        },
        address: {
            type: String
        },
        wishlist: [{
            type: ObjectId,
            ref: 'product'
        }]
    },
    { timestamps: true }
);

module.exports = User = mongoose.model('users', UserSchema);