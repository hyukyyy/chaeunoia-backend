const passport = require("passport");
const local = require("./localStrategy");
const User = require("../models/user");

module.exports = () => {
  // passport.serializeUser((user, done) => {
  //   done(null, user.id);
  // });

  // passport.deserializeUser((id, done) => {
  //   User.findOne({ id })
  //     .then((user) => done(null, user))
  //     .catch((e) => done(e));
  // });

  local();
};
