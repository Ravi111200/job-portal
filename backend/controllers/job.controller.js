import { company } from "../models/company.model.js";
import { job } from "../models/job.model.js";

export const postJob = async(req,res) => {
    try {
        const {title, description, requirements, salary, jobType, experience, position, companyID} = req.body;
        const userId = req.id;

        if(!title || !description || !requirements || !salary || !jobType || !experience || !companyID || !position ){
            return res.status(400).json({
                message : "Something is missing.",
                success : false
    
            })
        };
        const job = await job.create({
            title,
            description,
            requirements : requirements.split(","),
            salary : Number(salary),
            location,
            jobType,
            experiencelevel : experience,
            position,
            company: companyID,
            created_by : userId
        })
        return res.status(201).json({
            message: "New job is created successfully.",
            job,
            success: true
        })

    } catch (error) {
        console.log(error);
        
        
    }
}
export const getAllJobs = async(req,res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or:[
                {title : {$ragex: keyword,$option : "i"}},
                {description : {$ragex: keyword,$option : "i"}}

            ]
        };
        const jobs = await job.find(query).populate({
            path : "company"
        }).sort({createdAt : -1});
        if(!jobs){
            return res.status(404).json({
                message: "jobs not found.",
                success:false
            })
        };
        return res.status(200).json({
            jobs,
            success : true 
        })
        
    } catch (error) {
        console.log(error);
        
        
    }
}
export const getJobById = async(req,res) => {
    try {
        const jobId = req.params.id;
        const job = await job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message: "jobs not found.",
                success:false
            })

        };
        return res.status(200).json({
            job,
            success: true
        })
        
    } catch (error) {
        console.log(error);
        
        
    }
}
export const getAdminJobs = async(req,res) => {
    try {
        const adminId = req.id;
        const jobs = await job.find({created_by : adminId});
        if(!jobs){
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        }
        return res.status(200).json({
            jobs,
            success: true
        })
        
    } catch (error) {
        console.log(error);
        
        
    }
}


