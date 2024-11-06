'use strict';
const {
  Model
} = require('sequelize');
const Employees = require('./employees')
module.exports = (sequelize, DataTypes) => {
  class Jobs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Jobs.hasMany(models.Applications, { foreignKey: 'jobId', as: 'applications' });
    
    }
  }
  Jobs.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    requirements: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    salaryRange: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    jobType: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Full-time',
      validate: {
        isIn: [['Full-time', 'Part-time', 'Internship', 'Freelance']] 
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 'true',
    },
    employerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Employees,
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Jobs',
  });
  return Jobs;
};