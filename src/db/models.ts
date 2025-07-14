import mongoose, { mongo, Schema } from "mongoose";
import { ClaimPointsHistorySchemaType, UserSchemaType } from "../types/index.js";


const UserSchema : Schema<UserSchemaType>=   new mongoose.Schema({
    username : String,
    points : {
        type : Number,
        default : 0
    }
})

const ClaimPointsHistorySchema : Schema<ClaimPointsHistorySchemaType> = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    claimedPoints : Number,
    claimedAt : {
        type : Date,
        default : Date.now()
    }
})

export const ClaimPointsHistory = mongoose.model('ClaimPointsHistory', ClaimPointsHistorySchema)
export const User = mongoose.model('User', UserSchema) 