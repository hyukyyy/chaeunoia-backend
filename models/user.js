const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const passportLocalMongoose = require("passport-local-mongoose");

const user = new mongoose.Schema({
  id: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  createdAt: { type: Date, default: new Date() },
});

user.methods.verifyPassword = (candidatePassword, callback) => {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

// user.methods.verifyPassword = (candidatePassword, callback) => {
//   callback(null, candidatePassword === this.password);
// };

user.plugin(passportLocalMongoose, {
  usernameField: "id",
  passwordField: "password",
});

module.exports = mongoose.model("User", user);
