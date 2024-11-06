'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Candidates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      password:{
        type: Sequelize.STRING
      },
      birthDate: {
        type: Sequelize.DATE
      },
      avt: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      positionDesired: {
        type: Sequelize.STRING
      },
      salaryExpected: {
        type: Sequelize.FLOAT
      },
      skills: {
        type: Sequelize.TEXT
      },
      experience: {
        type: Sequelize.TEXT
      },
      education: {
        type: Sequelize.TEXT
      },
      cvFile: {
        type: Sequelize.STRING
      },
      active:{
        type: Sequelize.BOOLEAN
      },
      roleId: {
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
    await queryInterface.dropTable('Candidates');
  }
};