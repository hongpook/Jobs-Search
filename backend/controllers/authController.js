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

        // Xác thực người dùng bằng jwt
        const token = jwt.sign({ id: candidate.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_REFRESH_EXPIRATION
        });

        res.status(200).send({
            id: candidate.id,
            fullName: candidate.fullName,
            email: candidate.email,
            accessToken: token,
        });
    } catch (err) {
        console.log(err)
        return res.status(500).send('Sign in error');
    }
}



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

        // Tìm ứng viên bằng email
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

        // Xác thực người dùng bằng jwt
        const token = jwt.sign({ id: employee.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_REFRESH_EXPIRATION
        });

        res.status(200).send({
            id: employee.id,
            fullName: employee.companyName,
            email: employee.email,
            accessToken: token,
        });
    } catch (err) {
        console.log(err)
        return res.status(500).send('Sign in error');
    }
}

module.exports = {
    registerCandidate,
    signInCandidate,
    registerEmployee,
    signInEmployee
};
