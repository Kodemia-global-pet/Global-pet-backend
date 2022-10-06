const User = require("../models/user.model");
const bcrypt = require("bcrypt");

//Use Cases = Handlers

const createUser = async (userData) => {
    const hashPassword = await bcrypt.hash(userData.password, 10);
    const user = User.create({...userData, password: hashPassword});
    return user;
}

const getUser = (id) => {
    const user = User.findById(id).populate({
        path: 'pets',
        model: 'pet',
        populate: {
            path: 'appointments',
            model: 'appointment',
            populate: {
                path: 'attachments',
                model: 'attachment'
            }
        }
      });
    return user;
}

const updateUser = async (id, userData) => {
    
    if(userData.password){
        const hashPassword = await bcrypt.hash(userData.password, 10);
        userData = {...userData, password: hashPassword}
    }

    const user = User.findByIdAndUpdate(id,userData);
    return user;
}
   
const deleteUser = (id) => {
    const user = User.findByIdAndDelete(id);
    return user;
}
   
const updateUserPets  = (id, petID) => {
    const pet = User.findByIdAndUpdate(id, { $addToSet: { pets : petID  } }, { returnDocument: "after" })
    return pet;
}

module.exports = { createUser, getUser, updateUser, deleteUser, updateUserPets }