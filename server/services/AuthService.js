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
        throw createError(401, 'Incorrect username or password');
      }

      // Check for matching passwords
      const passwordCheck = await bcrypt.compare(password, user.password)    
      if (!passwordCheck) {
        throw createError(401, 'Incorrect username or password');
      }

      return user;

    } catch(err) {
      throw createError(500, err);
    }

  };

}