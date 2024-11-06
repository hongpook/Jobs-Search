// services/jobsService.js
const db = require('../models/index');
const cloudinary = require("../config/cloudinary")

const createJob = async (data, files) => {
    try {
        // Kiểm tra xem có file hình ảnh không
        if (files && files.imageUrl && files.imageUrl[0]) {
            const imageResult = await cloudinary.uploader.upload(files.imageUrl[0].path, {
                folder: 'imgJobs',  
            });
            data.imageUrl = imageResult.secure_url;  
        }

        const job = await db.Jobs.create(data); 
        return job; 
    } catch (error) {
        console.error('Error during upload:', error);
        throw new Error('Error creating job: ' + error.message);  
    }
};

const getAllJobs = async () => {
    return await db.Jobs.findAll();
};

const getJobById = async (id) => {
    return await db.Jobs.findByPk(id);
};
const updateJob = async (id, data, files) => {
    try {
        if (files && files.imageUrl && files.imageUrl[0]) {
            const imageResult = await cloudinary.uploader.upload(files.imageUrl[0].path, {
                folder: 'imgJobs',  
            });
            data.imageUrl = imageResult.secure_url;  
        }

        const job = await db.Jobs.update(data, {
            where: { id },  
            returning: true,  
        });

        if (job[0] === 0) {
            throw new Error('Job not found');
        }

        return job[1][0];  
    } catch (error) {
        console.error('Error during update:', error);
        throw new Error('Error updating job: ' + error.message);  
    }
};

const deleteJob = async (id) => {
    try {
        const job = await db.Jobs.findByPk(id);

        if (!job) {
            throw new Error('Job not found');
        }

        await job.destroy();
        return { message: 'Job deleted successfully' };
    } catch (error) {
        console.error('Error during job deletion:', error);
        throw new Error('Error deleting job: ' + error.message);
    }
};


module.exports = {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob,
};
