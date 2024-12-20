'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Resumes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      linkedin: {
        type: Sequelize.STRING,
      },
      position: {
        type: Sequelize.STRING,
      },
      careerObjective: {
        type: Sequelize.TEXT,
      },
      workExperience: {
        type: Sequelize.TEXT,
      },
      education: {
        type: Sequelize.TEXT,
      },
      skills: {
        type: Sequelize.TEXT,
      },
      certificates: {
        type: Sequelize.TEXT,
      },
      projects: {
        type: Sequelize.TEXT,
      },
      interests: {
        type: Sequelize.TEXT,
      },
      candidateId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Resumes');
  }
};