const { Employees } = require('../models/index'); 
const cloudinary = require('../config/cloudinary')

class EmployeesService {
    async createEmployee(data, files) {
        try {
            // Kiểm tra xem có file hình ảnh không
            if (files && files.logo && files.logo[0]) {
                const imageResult = await cloudinary.uploader.upload(files.logo[0].path, {
                    folder: 'logoJobCompanies',  
                });
                data.logo = imageResult.secure_url;  
            }
    
            const company = await Employees.create(data); 
            return company; 
        } catch (error) {
            console.error('Error during upload:', error);
            throw new Error('Error creating company: ' + error.message);  
        }
    }

    async getAllEmployees() {
        try {
            const employees = await Employees.findAll();
            return employees;
        } catch (error) {
            throw new Error('Error fetching employees: ' + error.message);
        }
    }

    async getEmployeeById(id) {
        try {
            const employee = await Employees.findByPk(id);
            if (!employee) {
                throw new Error('Employee not found');
            }
            return employee;
        } catch (error) {
            throw new Error('Error fetching employee: ' + error.message);
        }
    }

    async updateEmployee(id, data, files) {
        try {
            if (files && files.logo && files.logo[0]) {
                const imageResult = await cloudinary.uploader.upload(files.logo[0].path, {
                    folder: 'logoJobCompanies',  
                });
                data.logo = imageResult.secure_url;  
            }
    
            const company = await Employees.update(data, {
                where: { id },  
                returning: true,  
            });
    
            if (company[0] === 0) {
                throw new Error('company not found');
            }
    
            return company[1][0];  
        } catch (error) {
            console.error('Error during update:', error);
            throw new Error('Error updating company: ' + error.message);  
        }
    }

    async deleteEmployee(id) {
        try {
            const employee = await Employees.findByPk(id);
            if (!employee) {
                throw new Error('Employee not found');
            }
            await employee.destroy();
            return { message: 'Employee deleted successfully' };
        } catch (error) {
            throw new Error('Error deleting employee: ' + error.message);
        }
    }
}

module.exports = new EmployeesService();
