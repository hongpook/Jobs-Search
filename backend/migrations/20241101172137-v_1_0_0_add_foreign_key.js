'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    // role -- emp
    // await queryInterface.addConstraint('Employees', {
    //   fields: ['roleId'],
    //   type: 'foreign key',
    //   name: 'employee_role_id_fkey',
    //   references: {
    //     table: 'Roles',
    //     field: 'id'
    //   }
    // }),

    // Candidates -- user
    // await queryInterface.addConstraint('Candidates', {
    //   fields: ['roleId'],
    //   type: 'foreign key',
    //   name: 'candidate_role_id_fkey',
    //   references: {
    //     table: 'Roles',
    //     field: 'id'
    //   }
    // }),

    // Jobs -- Employees
    await queryInterface.addConstraint('Jobs', {
      fields: ['employerId'],
      type: 'foreign key',
      name: 'job_employee_id_fkey',
      references: {
        table: 'Employees',
        field: 'id'
      }
    }),

    // Applications -- Candidates
    await queryInterface.addConstraint('Applications', {
      fields: ['candidateId'],
      type: 'foreign key',
      name: 'applycation_candidate_id_fkey',
      references: {
        table: 'Candidates',
        field: 'id'
      }
    }),

    // Applications -- job
    await queryInterface.addConstraint('Applications', {
      fields: ['jobId'],
      type: 'foreign key',
      name: 'applycation_job_id_fkey',
      references: {
        table: 'Jobs',
        field: 'id'
      }
    })
    // ,

    // Resumes -- Candidates
    await queryInterface.addConstraint('Resumes', {
      fields: ['candidateId'], // Đúng chính tả
      type: 'foreign key',
      name: 'resume_candidate_id_fkey',
      references: {
        table: 'Candidates',
        field: 'id',
      }
    });


    // Resumes -- Employees
    // await queryInterface.addConstraint('Blogs', {
    //   fields: ['authorId'],
    //   type: 'foreign key',
    //   name: 'blog_employee_id_fkey',
    //   references: {
    //     table: 'Employees',
    //     field: 'id'
    //   }
    // })

  },

  async down (queryInterface, Sequelize) {
    // await queryInterface.removeColumn('Employees', 'employee_role_id_fkey'), 
    // await queryInterface.removeColumn('Candidates', 'candidate_role_id_fkey'),
    // await queryInterface.removeColumn('Candidates', 'job_employee_id_fkey'),
    // await queryInterface.removeColumn('Candidates', 'applycation_candidate_id_fkey'),
    // await queryInterface.removeColumn('Resumes', 'resume_candidate_id_fkey'),
    // await queryInterface.removeColumn('Candidates', 'applycation_job_id_fkey')
    // await queryInterface.removeColumn('Employees', 'blog_employee_id_fkey')
  }
};
