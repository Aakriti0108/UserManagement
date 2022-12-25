const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const ForgotPasswordRequest = mongoose.model("forgotpasswordrequest",mongoose.Schema({
    userId : {
        type : ObjectId,
        required : true
    },
    uuid : {
        type : String,
        required : true
    },
    isActive : {
        type : String,
        required : true,
        default : true
    }
}));


module.exports = ForgotPasswordRequest;