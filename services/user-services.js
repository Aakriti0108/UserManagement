const User = require("../models/user");
let ObjectId = require("mongoose").Types.ObjectId;

class UserService{

    getUser = async ( userId ) => {
        try {
            return await User.findById(ObjectId(userId));
        } catch (error) {
            console.log(error);
        }
    }

    getAllUsers = async () =>{
        try{
            return await User.find().select('_id name email phone profession');
        }catch(error) {
            console.log(error);
        }
    }

    findUserByEmail = async (email) => {
        try{
            return await User.find({email : email});
        }catch(error){
            console.log(error);
        }
    }
    
    addUser = async (name, email, passwordHash, phone, profession) => {
        try {
            return await User.create({name : name, email : email, password : passwordHash, phone : phone, profession : profession});
        } catch (error) {
            console.log(error);
        }
    }
    
    updateUserPassword = async (userId, password) => {
        try {
            let user = await User.findOne({ _id : ObjectId(userId)});
            user.password = password;
            return await user.save();
        } catch (error) {
            console.log(error);
        }
    } 

    updateUser = async (userId, name, phone, profession) => {
        try {
            let user = await User.findOne({ _id : ObjectId(userId)});
            user.name = name;
            user.phone = phone;
            user.profession = profession;
            return await user.save();
        } catch (error) {
            console.log(error);
        }
    }
    
    deleteUser = async (userId) => {
        try {
            let result = await User.deleteOne({ _id : new ObjectId(userId)})
            return result;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = UserService;