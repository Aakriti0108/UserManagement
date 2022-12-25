const UserService = require("../services/user-services");
const jwt = require('jsonwebtoken'); //require('crypto').randomBytes(64).toString('hex') --> type in node
const bcrypt = require('bcrypt');
const saltRounds = 10;
let ObjectId = require("mongoose").Types.ObjectId;


const userService = new UserService();
function generateAccessToken(userId) {
    return jwt.sign(userId, process.env.TOKEN_SECRET, {});
}

exports.getAllUsers = async (req, res, next) => {
    try {
        let users = await userService.getAllUsers();
        res.json({ success : true, data : users});
    } catch (error) {
        console.log(error);
        res.status(500).json({success : false, data : "Internal Server Error!"});
    }
}

exports.loginUserByEmailAndPassword = async (req, res, next) => {
    try {
        let body = req.body;
        let users = await userService.findUserByEmail(body.email);
        let user = null;
        if(users.length>0){
            for(let i=0;i<users.length;i++){
                let isSamePassword = await bcrypt.compare(body.password, users[i].password);
                if(isSamePassword){
                    user = users[i];
                    break;
                }
            }
        }
        if(user){
            const token = generateAccessToken(user._id.toString());
            res.json({success : true, token : token});
        }else{
            res.status(404).json({success : false, data : "Email or Password Invalid!"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({success : false, data : "Internal Server Error!"});
    }
}

exports.addUser = async (req, res, next ) => {
    try {

        let body = req.body;
        let passwordHash = await bcrypt.hash(body.password, saltRounds);
        let response  = await userService.addUser(body.name, body.email, passwordHash, body.phone, body.profession);
        res.json({success : true, data : response});
        
    } catch (error) {
        console.log(error);
        res.status(404).json({success : false, data : error});
    }
}

exports.checkUserExists = async (req, res, next) => {
    try{
        let body = req.body;
        let users = await userService.findUserByEmail(body.email);
        if(users.length>0){
            res.json({success: true});
        }else{
            res.json({success : false, data : "User Not Found!"});
        }

    }catch(error){
        console.log(error);
        res.status(500).json({success : false, data : "Server Error"})
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        let body = req.body;
        let result = await userService.updateUser(body.userId, body.name, body.phone, body.profession);
        res.json({success : true});
    } catch (error) {
        console.log(error);
        res.status(500).json({success : false, data : "Server Error"})
    }
} 

exports.deleteUser = async (req, res, next) => {
    try {
        let body = req.body;
        let result = await userService.deleteUser(body.userId);
        res.json({ success : true})
    } catch (error) {
        console.log(error);
        res.status(500).json({success : false, data : "Server Error"})
    }
}