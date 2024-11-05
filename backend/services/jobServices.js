// services/jobsService.js
const db = require('../models/index');

const createJob = async (jobData) => {
    return await db.Jobs.create(jobData);
};

const getAllJobs = async () => {
    return await db.Jobs.findAll();
};

const getJobById = async (id) => {
    return await db.Jobs.findByPk(id);
};

const updateJob = async (id, jobData) => {
    const job = await db.Jobs.findByPk(id);
    if (!job) {
        throw new Error('Job not found');
    }
    return await job.update(jobData);
};

const deleteJob = async (id) => {
    const job = await db.Jobs.findByPk(id);
    if (!job) {
        throw new Error('Job not found');
    }
    return await job.destroy();
};

module.exports = {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob,
};
