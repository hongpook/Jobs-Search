// controllers/applicationController.js
const applicationService = require('../services/applicationServices');

const createApplication = async (req, res) => {
    try {
        const { candidateId, jobId } = req.body;
        const application = await applicationService.createApplication(candidateId, jobId);
        return res.status(201).json(application);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getAllApplications = async (req, res) => {
    try {
        const applications = await applicationService.getAllApplications();
        return res.status(200).json(applications);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getApplicationById = async (req, res) => {
    try {
        const { id } = req.params;
        const application = await applicationService.getApplicationById(id);
        return res.status(200).json(application);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Cập nhật thông tin ứng tuyển
const updateApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body; // Nhận tất cả thông tin cần cập nhật từ req.body
        const application = await applicationService.updateApplication(id, updates);
        return res.status(200).json(application);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const deleteApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const application = await applicationService.deleteApplication(id);
        return res.status(204).json(application);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createApplication,
    getAllApplications,
    getApplicationById,
    updateApplication,
    deleteApplication,
};
