const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const createError = require('http-errors');
const jwt = require("../lib/jwt.lib");

//Login
const login = async (email, textPlainPassword) => {
    //verify email
    const user = await User.findOne({email});
    if(!user) throw createError(401, "No Authorized");
    
    //verify password
    const isValidPassword = await bcrypt.compare(textPlainPassword, user.password);
    if(!isValidPassword) throw createError(401, "No Authorized");
       
    const token = jwt.sign({ id: user._id });
    return token;
}

module.exports = { login }