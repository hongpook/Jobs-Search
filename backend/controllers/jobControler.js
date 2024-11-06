const jobService = require('../services/jobServices');
const cloudinary = require('../config/cloudinary')

const createJobController = async (req, res) => {
    try {
        const data = req.body;  
        const files = req.files; 

        if (files && files.imageUrl) {
            if (files.imageUrl[0]) {
                const imageResult = await cloudinary.uploader.upload(files.imageUrl[0].path, {
                    folder: 'imgJobs',  
                });
                data.imageUrl = imageResult.secure_url; 
            }
        }

        const job = await jobService.createJob(data, files);

        res.status(201).json(job);
    } catch (error) {
        console.error('Error creating job:', error);
        res.status(400).json({ error: error.message });
    }
};


const getAllJobsController = async (req, res) => {
    try {
        const jobs = await jobService.getAllJobs();
        res.status(200).json(jobs);
    } catch (error) {
        console.error('Error in getAllJobsController:', error);
        res.status(500).json({ message: error.message });
    }
};

const getJobByIdController = async (req, res) => {
    try {
        const job = await jobService.getJobById(req.params.id);
        res.status(200).json(job);
    } catch (error) {
        console.error('Error in getJobByIdController:', error);
        res.status(500).json({ message: error.message });
    }
};

const updateJobController = async (req, res) => {
    try {
        const { id } = req.params; 
        const data = req.body;  
        const files = req.files;  

        const updatedJob = await jobService.updateJob(id, data, files);

        res.status(200).json(updatedJob); 
    } catch (error) {
        res.status(400).json({ error: error.message });  
    }
};


const deleteJobController = async (req, res) => {
    try {
        const { id } = req.params;  

        const result = await jobService.deleteJob(id);

        res.status(200).json(result);
    } catch (error) {
        console.error('Error in deleteJobController:', error);
        res.status(500).json({ message: error.message });  
    }
};



module.exports = {
    createJobController,
    getAllJobsController,
    getJobByIdController,
    updateJobController,
    deleteJobController,
};
