// routes/jobsRoutes.js
const express = require('express');
const router = express.Router();
const jobsController = require('../controllers/jobControler');
const applicationController = require('../controllers/applicationController');
const employeesController = require('../controllers/employeeController');
const candidatesController = require('../controllers/candidateController');

router.post('/candidates', candidatesController.create);
router.get('/candidates', candidatesController.getAll);
router.get('/candidate/:id', candidatesController.getById);
router.put('/candidate/:id', candidatesController.update);
router.delete('/candidate/:id', candidatesController.delete);

router.post('/employees', employeesController.create);
router.get('/employees', employeesController.getAll);
router.get('/employee/:id', employeesController.getById);
router.put('/employee/:id', employeesController.update);
router.delete('/employee/:id', employeesController.delete);

router.post('/applications', applicationController.createApplication);
router.get('/applications', applicationController.getAllApplications);
router.get('/application/:id', applicationController.getApplicationById);
router.put('/application/:id', applicationController.updateApplication); 
router.delete('/application/:id', applicationController.deleteApplication);

router.post('/jobs', jobsController.createJob);
router.get('/jobs', jobsController.getAllJobs);
router.get('/job/:id', jobsController.getJobById);
router.put('/job/:id', jobsController.updateJob);
router.delete('/job/:id', jobsController.deleteJob);

module.exports = router;
