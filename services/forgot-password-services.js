const ForgotPasswordRequest = require("../models/forgot-password-request");
let ObjectId = require("mongoose").Types.ObjectId;

class ForgotPasswordRequestService {

    getForgotPasswordRequestByUuid = async (uuid) => {
        try {
            return await ForgotPasswordRequest.findOne({ uuid : uuid });
        } catch (error) {
            console.log(error);
        }
    }

    saveForgotPasswordRequest = async (forgotPasswordRequest) => {
        try {
            return await ForgotPasswordRequest.create(forgotPasswordRequest);
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = ForgotPasswordRequestService;