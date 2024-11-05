'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Employees extends Model {
    static associate(models) {
      // Thiết lập Employees thuộc về Roles
      Employees.belongsTo(models.Roles, { foreignKey: 'roleId', as: 'roles' });
    }
  }
  Employees.init({
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    contactPerson: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Roles', // Tên bảng
        key: 'id',       // Khóa chính của bảng Roles
      },
    },
  }, {
    sequelize,
    modelName: 'Employees',
  });
  return Employees;
};
