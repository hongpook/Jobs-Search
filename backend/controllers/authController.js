const db = require('../models/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerCandidate = async (req, res) => {
    try {
        const { fullName, email, password, roleId } = req.body;

        // Kiểm tra xem email đã tồn tại chưa
        const candidateExists = await db.Candidates.findOne({
            where: { email }
        });
        if (candidateExists) {
            return res.status(400).send('Email is already associated with an account');
        }

        // Kiểm tra roleId có hợp lệ không (nếu cần)
        const role = await db.Roles.findByPk(roleId);
        if (!role) {
            return res.status(400).send('Invalid roleId');
        }

        // Tạo tài khoản ứng viên mới
        await db.Candidates.create({
            fullName,
            email,
            password: await bcrypt.hash(password, 15),
            roleId  // Thêm roleId vào thông tin ứng viên
        });
        
        return res.status(200).send('Registration successful');
    } catch (err) {
        console.log("Error:", err);
        return res.status(500).send('Error in registering candidate');
    }
};

const signInCandidate = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Tìm ứng viên bằng email
        const candidate = await db.Candidates.findOne({
            where: { email }
        });
        if (!candidate) {
            return res.status(404).json('Email not found');
        }

        // Xác thực mật khẩu
        const passwordValid = await bcrypt.compare(password, candidate.password);
        if (!passwordValid) {
            return res.status(404).json('Incorrect email and password combination');
        }

        // Tạo JWT Token với tất cả thông tin cần thiết
        const token = jwt.sign({
            id: candidate.id,
            fullName: candidate.fullName,
            email: candidate.email,
            roleId: candidate.roleId,
        }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_REFRESH_EXPIRATION
        });

        res.status(200).send({
            id: candidate.id,
            fullName: candidate.fullName,
            email: candidate.email,
            roleId: candidate.roleId,
            accessToken: token,
        });
    } catch (err) {
        console.log(err)
        return res.status(500).send('Sign in error');
    }
};




const registerEmployee = async (req, res) => {
    try {
        const { companyName, email, password, roleId, contactPerson } = req.body;

        // Kiểm tra xem email đã tồn tại chưa
        const candidateExists = await db.Employees.findOne({
            where: { email }
        });
        if (candidateExists) {
            return res.status(400).send('Email is already associated with an account');
        }

        // Kiểm tra roleId có hợp lệ không (nếu cần)
        const role = await db.Roles.findByPk(roleId);
        if (!role) {
            return res.status(400).send('Invalid roleId');
        }

        // Tạo tài khoản ứng viên mới
        await db.Employees.create({
            companyName,
            email,
            password: await bcrypt.hash(password, 15),
            roleId,
            contactPerson  // Thêm roleId vào thông tin ứng viên
        });
        
        return res.status(200).send('Registration successful');
    } catch (err) {
        console.log("Error:", err);
        return res.status(500).send('Error in registering employee');
    }
};

const signInEmployee = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Tìm nhân viên bằng email
        const employee = await db.Employees.findOne({
            where: { email }
        });
        if (!employee) {
            return res.status(404).json('Email not found');
        }

        // Xác thực mật khẩu
        const passwordValid = await bcrypt.compare(password, employee.password);
        if (!passwordValid) {
            return res.status(404).json('Incorrect email and password combination');
        }

        // Tạo JWT Token với tất cả thông tin cần thiết
        const token = jwt.sign({
            id: employee.id,
            companyName: employee.companyName,
            email: employee.email,
            contactPerson: employee.contactPerson,
            roleId: employee.roleId,
        }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_REFRESH_EXPIRATION
        });

        res.status(200).send({
            id: employee.id,
            companyName: employee.companyName,
            email: employee.email,
            contactPerson: employee.contactPerson,
            roleId: employee.roleId,
            accessToken: token,
        });
    } catch (err) {
        console.log(err)
        return res.status(500).send('Sign in error');
    }
};


const getCompanyInfo = async (req, res) => {
    try {
        const companyId = req.userId; // Lấy userId từ token middleware
        const company = await db.Companies.findByPk(companyId); // Tìm company theo ID
        if (!company) return res.status(404).json({ message: 'Company not found' });
        
        // Trả về tất cả thông tin từ company
        res.json(company);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving company info', error });
    }
};

const getCandidateInfo = async (req, res) => {
    try {
        const userId = req.userId; // Lấy userId từ token middleware
        const user = await db.Candidates.findByPk(userId); // Tìm candidate theo ID
        if (!user) return res.status(404).json({ message: 'Candidate not found' });
        
        // Trả về tất cả thông tin từ user
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving candidate info', error });
    }
};


module.exports = {
    registerCandidate,
    signInCandidate,
    registerEmployee,
    signInEmployee,
    getCandidateInfo,
    getCompanyInfo
};
