const db = require('../models/index');

const createApplication = async (candidateId, jobId) => {
    try {
        const application = await db.Applications.create({
            candidateId,
            jobId,
            status: 'Pending', 
            applicationDate: new Date(), 
        });
        return application;
    } catch (error) {
        throw new Error(`Error creating application: ${error.message}`);
    }
};

const getAllApplications = async () => {
    try {
        const applications = await db.Applications.findAll({
            include: [
                {
                    model: db.Candidates,
                    as: 'candidate',
                    attributes: ['fullName', 'email'],
                },
                {
                    model: db.Jobs,
                    as: 'job',
                    attributes: ['title'],
                },
            ],
        });
        return applications;
    } catch (error) {
        throw new Error(`Error fetching applications: ${error.message}`);
    }
};

const getApplicationById = async (applicationId) => {
    try {
        const application = await db.Applications.findByPk(applicationId, {
            include: [
                {
                    model: db.Candidates,
                    as: 'candidate',
                    attributes: ['fullName', 'email'],
                },
                {
                    model: db.Jobs,
                    as: 'job',
                    attributes: ['title'],
                },
            ],
        });
        if (!application) {
            throw new Error('Application not found');
        }
        return application;
    } catch (error) {
        throw new Error(`Error fetching application: ${error.message}`);
    }
};

const updateApplication = async (applicationId, updates) => {
    try {
        const application = await db.Applications.findByPk(applicationId);
        if (!application) {
            throw new Error('Application not found');
        }

        Object.assign(application, updates);
        await application.save();
        return application;
    } catch (error) {
        throw new Error(`Error updating application: ${error.message}`);
    }
};

const deleteApplication = async (applicationId) => {
    try {
        const application = await db.Applications.findByPk(applicationId);
        if (!application) {
            throw new Error('Application not found');
        }

        await application.destroy();
        return application;
    } catch (error) {
        throw new Error(`Error deleting application: ${error.message}`);
    }
};

module.exports = {
    createApplication,
    getAllApplications,
    getApplicationById,
    updateApplication,
    deleteApplication,
};
