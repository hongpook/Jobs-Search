// services/jobsService.js
const db = require('../models/index');
const { Op } = require("sequelize");
const removeAccents = require('remove-accents');
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
    return await db.Jobs.findAll({
        include: [{ model: db.Applications, as: 'applications' }]
    });
};

const getJobById = async (id) => {
    return await db.Jobs.findByPk(id, {
        include: [{ model: db.Applications, as: 'applications' }]
    });
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



const parseSalaryRange = (salaryRange) => {
    const match = salaryRange.match(/(\d+)\s*-\s*(\d+)/);
    if (match) {
        return {
            minSalary: parseInt(match[1], 10),
            maxSalary: parseInt(match[2], 10),
        };
    }
    return {};
};

const getFilteredJobs = async ({ search, salaryRange, jobType, location, active }) => {
    const whereClause = {};

    // Điều kiện tìm kiếm (cả có dấu và không dấu)
    if (search) {
        whereClause.title = {
            [Op.or]: [
                { [Op.iLike]: `%${search}%` }, // Tìm kiếm không phân biệt hoa thường, có dấu
                { [Op.iLike]: `%${removeAccents(search)}%` } // Tìm kiếm không phân biệt hoa thường, không dấu
            ]
        };
    }

    // Điều kiện lọc theo lương
    let salaryCondition = null;
    if (salaryRange) {
        const { minSalary, maxSalary } = parseSalaryRange(salaryRange);
        if (minSalary || maxSalary) {
            salaryCondition = {};
            if (minSalary) salaryCondition[Op.gte] = minSalary;
            if (maxSalary) salaryCondition[Op.lte] = maxSalary;
        }
    }

    // Điều kiện lọc theo loại công việc
    let jobTypeCondition = null;
    if (jobType) {
        jobTypeCondition = { jobType };
    }

    // Áp dụng điều kiện OR (jobType hoặc salaryRange)
    if (salaryCondition || jobTypeCondition) {
        whereClause[Op.or] = [];
        if (salaryCondition) whereClause[Op.or].push({ salaryRange: salaryCondition });
        if (jobTypeCondition) whereClause[Op.or].push(jobTypeCondition);
    }

    // Điều kiện lọc theo địa điểm (cả có dấu và không dấu)
    if (location) {
        whereClause.location = {
            [Op.or]: [
                { [Op.iLike]: `%${location}%` }, // Tìm kiếm không phân biệt hoa thường, có dấu
                { [Op.iLike]: `%${removeAccents(location)}%` } // Tìm kiếm không phân biệt hoa thường, không dấu
            ]
        };
    }

    // Điều kiện trạng thái hoạt động
    if (active !== undefined) {
        whereClause.active = active === "true";
    }

    // Truy vấn Jobs từ cơ sở dữ liệu
    return db.Jobs.findAll({
        where: whereClause,
        include: [
            { association: "employees", attributes: ["id", "companyName"] },
        ],
    });
};

module.exports = {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob,
    getFilteredJobs
};
