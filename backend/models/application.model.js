import mongoose from "mongoose";

const appliacationSchema = new mongoose.Schema({
    job : {
        type : mongoose.Schema.Types.ObjectId,
        Ref : 'job',
        required : true
    },
    applicant : {
        type: mongoose.Schema.Types.ObjectId,
        Ref : 'user',
        required : true
    },
    status : {
        type : String,
        enum : ['pending', 'accepted','rejected'],
        default:' pending'
    }
},{timestamps:true});
export const Application = mongoose.model("Application", appliacationSchema);