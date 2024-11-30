import { Application } from "../models/application.model.js";
import { job } from "../models/job.model.js";
//import { populate } from "dotenv";

export const applyJob = async(req,res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if(!jobId){
            return res.status(400).json({
                message : "job id is required. ",
                success : false
            })
        };
        //check if the user has already applied for the job
        const existingApplication = await Application.findOne({job : jobId, applicant : userId});

        if(existingApplication){
            return res.status(400).json({
                message: "you have already applied for this job.",
                success : false
            })
        }
        //check if the jobs exists
        const job = await job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message: "job not found.",
                success : false
            })
        }
        //create a new application
        const newApplication = await Application.create({
            job : jobId,
            applicant : userId,

        })

        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message: "job applied successfully.",
            success : true
        })


       

        
    } catch (error) {
        console.log(error);
        
        
    }

};
export const getAppliedJobs = async (req,res) => {
    try {
        const userId = req.id;
        const application = await Application.find({applicant : userId}).sort({createdAt: -1}).populate({
            path : 'job',
            options : {sort :{createdAt: -1}},
            populate :{
                path : 'company',
                options : {sort :{createdAt: -1}},


            }
        });
        if(!application){
            return res.status(404).json({
                message : "No Applications.",
                success: false
            })
        };
        return res.status(200).json({
            application,
            success: true
        })

        
    } catch (error) {
        console.log(error);
        
        
    }
}
export const getApplicants = async(req,res) => {
    try {
        const jobId = req.params.id;
        const job = await job.findById(jobId).populate({
            path : 'applications',
            ooptions : {sort :{createdAt: -1}},
            populate : {
                path: 'applicant'
            }

        });
        if(!job){
            return res.status(404).json({
                message: "job not found.",
                success : false
            })
        };
        return res.status(200).json({
            job,
            success : true
        });
        
    } catch (error) {
        console.log(error);
        
        
    }
}
export const updateStatus = async(req,res) => {
    try {
        const {status}  = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message: "status is required",
                success : false
            })

        };
        //find the application by application id
        const application = await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(404).json({
                message: "application not found",
                success : false
            })

        };
        // update the status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "status updated succefully.",
            success : true
        });
        
    } catch (error) {
        console.log(error);
        
        
    }
}