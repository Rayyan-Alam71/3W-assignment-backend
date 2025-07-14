import mongoose, { Document } from "mongoose";

// Define the user interface
export interface UserSchemaType extends Document {
  username: string;
  points: number;
}

// Define the user interface
export interface ClaimPointsHistorySchemaType extends Document {
  userId : mongoose.Types.ObjectId,
  claimedPoints : Number | number
  claimedAt : Date
}
