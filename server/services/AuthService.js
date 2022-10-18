const createError = require('http-errors');
const UserModel = require('../models/user');
const UserModelInstance = new UserModel();
const bcrypt = require('bcryptjs')

module.exports = class AuthService {

  async register(data) {

    const { email } = data;

    try {
      // Check if user already exists
      const user = await UserModelInstance.findByEmail(email);
      console.log("finished search")
      // If user already exists, reject
      if (user) {
        throw createError(409, 'Email already in use');
      }

      // User doesn't exist, create new user record
      return await UserModelInstance.create(data);

    } catch(err) {
      throw createError(500, err);
    }

  };

  async login(data) {

    const { email, password } = data;
    
    try {
     
      // Check if user exists
      const user = await UserModelInstance.findByEmail(email);
      
      // If no user found, reject
      if (!user) {
        return null;
      }

      // Check for matching passwords
      const passwordCheck = await bcrypt.compare(password, user.password)    
      if (!passwordCheck) {
        return 'Incorrect username or password';
      }

      return user;

    } catch(err) {
      throw createError(500, err);
    }

  };

  async storeSession(sessionID) {
    //create timestamp
    const TimeStamp = new Date()
    //combine into an object
    const data = {TimeStamp, sessionID}
    try {
      //send session Id and timestamp to database
      const response = await UserModelInstance.storeSession(data)
      if (response) {
        return true
      }else return false
    }catch (err) {
      throw new Error(err)
    }
    
  }

}