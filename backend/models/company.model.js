import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: {
        type : String,
        required :true,
        unique : true
    },
    description: {
        type : String,
    },
    location: {
        type : String,
     },
     logo: {
         type : String, // url to company
     },
     userId: {
        type : mongoose.Schema.Types.ObjectId,
        required :true
    }

},{timestamps:true});
export const company = mongoose.model("company", companySchema);

