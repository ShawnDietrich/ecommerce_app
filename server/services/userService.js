const createError = require('http-errors')
const UserModel = require('../models/user')
const UserModelInstance = new UserModel();

module.exports = class UserService {

    async get(data) {
        const {id} = data

        try {
            //Check if user already exists 
            const user = ""

            //if user doesn't exist, reject 
            if(!user) {
                throw createError(404, 'User record not found');
            }
            return user

        } catch (err) {
            throw err
        }
    }

    async update(data) {
        try{
            //check if user already exists
            const user = ""
            return user
        }catch (err) {
            throw err
        }
    }
}