const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
const userSchema = mongoose.Schema({
        name:{type: String, required: [true,'Please enter your name.']},
        age:{type: Number, required: [true,'Please enter your age.']},
        gender: {
            type: String,
            required: [false],
            validate: {
                validator: function(value) {
                    return ['male', 'female'].includes(value.toLowerCase());
                },
                message: 'Gender must be either "male" or "female".'
            }
        },
        isSmoke:{type: Boolean, required: [true]},
        isDiabetic:{type: Boolean, required: [true]},
        incomePerAnnum: {type: Number, default: 0},
        mail: {type: String, required: [true], unique: true},
        password: {
            type: String,
            required: [true],
            validate: {
                validator: function (value) {
                    // Password must contain at least one digit
                    return /\d/.test(value);
                },
                message: 'Password must contain at least one digit.'
            }
        }
    },
    {
        timestamps: true
    }
);
userSchema.pre('save', async function(next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        this.password = bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});
const users = mongoose.model('User', userSchema);
module.exports = users;