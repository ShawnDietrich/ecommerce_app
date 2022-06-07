const passport = require('passport');
const LocalStrategy = require('passport-local');
const AuthService = require('../services/AuthService');
const AuthServiceInstance = new AuthService();
const UserModel = require('../models/user');
const User = new UserModel()

/**
 * @param {*} app 
 * @returns 
 */
module.exports = (app) => {

  // Initialize passport
  app.use(passport.initialize());  
  app.use(passport.session());
  app.use(passport.authenticate('session'))
  // Set method to serialize data to store in cookie
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  // Set method to deserialize data stored in cookie and attach to req.user
  passport.deserializeUser((id, done) => {
    const authUser =  User.findById(id)
    if(authUser) {
      return done(null, user);
    }
    
  });

  // Configure local strategy to be use for local login
  
  passport.use(new LocalStrategy(
    async (username, password, done) => {
      try {
        const user = await AuthServiceInstance.login({ email: username, password });
        return done(null, user);
      } catch(err) {
        return done(err);
      }
    }
  ));

  return passport;

}
