const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema ({
    email: {
        type: String,
        required: true,
        unique: true
    },
});

userSchema.plugin(passportLocalMongoose); //To automatically add username and password, hash and salt fields to store the username and hashed password

module.exports = mongoose.model("User", userSchema);