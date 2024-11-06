// routes/jobsRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const jobsController = require('../controllers/jobControler');
const applicationController = require('../controllers/applicationController');
const employeesController = require('../controllers/employeeController');
const candidatesController = require('../controllers/candidateController');

router.post('/candidates', upload, candidatesController.create);
router.get('/candidates', candidatesController.getAll);
router.get('/candidate/:id', candidatesController.getById);
router.put('/candidate/:id', upload, candidatesController.update);
router.delete('/candidate/:id', candidatesController.delete);

router.post('/employees', upload, employeesController.create);
router.get('/employees', employeesController.getAll);
router.get('/employee/:id', employeesController.getById);
router.put('/employee/:id', upload, employeesController.update);
router.delete('/employee/:id', employeesController.delete);

router.post('/applications', applicationController.createApplication);
router.get('/applications', applicationController.getAllApplications);
router.get('/application/:id', applicationController.getApplicationById);
router.put('/application/:id', applicationController.updateApplication); 
router.delete('/application/:id', applicationController.deleteApplication);

router.post('/jobs', upload, jobsController.createJobController);
router.get('/jobs', jobsController.getAllJobsController);
router.get('/job/:id', jobsController.getJobByIdController);
router.put('/job/:id', upload, jobsController.updateJobController);
router.delete('/job/:id', jobsController.deleteJobController);

module.exports = router;
