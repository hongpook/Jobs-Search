const { Employees } = require('../models/index'); 

class EmployeesService {
    async createEmployee(data) {
        try {
            const employee = await Employees.create(data);
            return employee;
        } catch (error) {
            throw new Error('Error creating employee: ' + error.message);
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

    async updateEmployee(id, data) {
        try {
            const employee = await Employees.findByPk(id);
            if (!employee) {
                throw new Error('Employee not found');
            }
            await employee.update(data);
            return employee;
        } catch (error) {
            throw new Error('Error updating employee: ' + error.message);
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
