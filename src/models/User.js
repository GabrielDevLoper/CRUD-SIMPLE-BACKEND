const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    passwordHash: String,
    roles: {
        type: [String],
        default: [],
        required: true
    },
});

UserSchema.pre('save', async function() {
    if(this.password) {
        this.passwordHash = await bcrypt.hash(this.password, 8);
    }
    this.password = undefined;
});

module.exports = mongoose.model('User', UserSchema);