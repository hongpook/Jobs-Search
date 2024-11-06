'use strict';
const {
  Model
} = require('sequelize');
const Candidates = require('./candidates')
const Jobs = require('./jobs')
module.exports = (sequelize, DataTypes) => {
  class Applications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Ứng tuyển thuộc về một ứng viên
      Applications.belongsTo(models.Candidates, { foreignKey: 'candidateId', as: 'candidate' });
      // Ứng tuyển thuộc về một công việc
      Applications.belongsTo(models.Jobs, { foreignKey: 'jobId', as: 'job' });
    }
  }
  Applications.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    candidateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Candidates,
        key: 'id',
      },
    },
    jobId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Jobs,
        key: 'id',
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Pending',
      validate: {
        isIn: [['Pending', 'Interview', 'Hired', 'Rejected']]  
      }
    },
    applicationDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
      
    },
  }, {
    sequelize,
    modelName: 'Applications',
  });
  return Applications;
};