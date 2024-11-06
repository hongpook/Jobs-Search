const employeesService = require('../services/employeeServices');
const cloudinary = require('../config/cloudinary')

class EmployeesController {
    async create(req, res) {
        try {
            const data = req.body;  
            const files = req.files; 
    
            if (files && files.logo) {
                if (files.logo[0]) {
                    const imageResult = await cloudinary.uploader.upload(files.logo[0].path, {
                        folder: 'logoJobCompanies',  
                    });
                    data.logo = imageResult.secure_url; 
                }
            }
    
            const company = await employeesService.createEmployee(data, files);
    
            res.status(201).json(company);
        } catch (error) {
            console.error('Error creating company:', error);
            res.status(400).json({ error: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const employees = await employeesService.getAllEmployees();
            res.status(200).json(employees);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const employee = await employeesService.getEmployeeById(req.params.id);
            res.status(200).json(employee);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params; 
            const data = req.body;  
            const files = req.files;  
    
            const updatedCompany = await employeesService.updateEmployee(id, data, files);
    
            res.status(200).json(updatedCompany); 
        } catch (error) {
            res.status(400).json({ error: error.message });  
        }
    }

    async delete(req, res) {
        try {
            const result = await employeesService.deleteEmployee(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
}

module.exports = new EmployeesController();
