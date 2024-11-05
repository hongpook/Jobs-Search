// controllers/jobsController.js
const jobsService = require('../services/jobServices');

const createJob = async (req, res) => {
    try {
        const jobData = req.body;
        const newJob = await jobsService.createJob(jobData);
        return res.status(201).json(newJob);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Error creating job');
    }
};

const getAllJobs = async (req, res) => {
    try {
        const jobs = await jobsService.getAllJobs();
        return res.status(200).json(jobs);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Error retrieving jobs');
    }
};

const getJobById = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await jobsService.getJobById(id);
        if (!job) {
            return res.status(404).send('Job not found');
        }
        return res.status(200).json(job);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Error retrieving job');
    }
};

const updateJob = async (req, res) => {
    try {
        const { id } = req.params;
        const jobData = req.body;
        const updatedJob = await jobsService.updateJob(id, jobData);
        return res.status(200).json(updatedJob);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Error updating job');
    }
};

const deleteJob = async (req, res) => {
    try {
        const { id } = req.params;
        await jobsService.deleteJob(id);
        return res.status(204).send(); // No content
    } catch (err) {
        console.error(err);
        return res.status(500).send('Error deleting job');
    }
};

module.exports = {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob,
};
