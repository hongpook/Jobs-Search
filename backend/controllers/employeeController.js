const employeesService = require('../services/employeeServices');

class EmployeesController {
    async create(req, res) {
        try {
            const employee = await employeesService.createEmployee(req.body);
            res.status(201).json(employee);
        } catch (error) {
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
            const employee = await employeesService.updateEmployee(req.params.id, req.body);
            res.status(200).json(employee);
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
