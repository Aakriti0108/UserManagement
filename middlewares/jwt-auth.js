const jwt = require('jsonwebtoken');
const UserService = require("../services/user-services");

const userServices = new UserService();
exports.authenticateToken = async (req, res, next) => {
    try{
        const token = req.headers['authorization'];
        //console.log("(Middleware) Headers : ", req.headers);
        if (token == null){
            throw undefined;
        }
        if(req.user == null){
            const  userId = String(jwt.verify(token, process.env.TOKEN_SECRET));
            const user = await userServices.getUser(userId);
            req.user = user;
        }
        next();
    }catch(err){
        console.log(err);
        res.status(404).json({success : false, data : "Token or User Authentication Error!"});
    }
}