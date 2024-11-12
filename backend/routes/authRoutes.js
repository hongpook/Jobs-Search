const express = require('express');
const { registerCandidate, signInCandidate, signInEmployee, registerEmployee, getCandidateInfo, getCompanyInfo} = require('../controllers/authController');
const verifyToken = require('../middlewares/authMiddleware');
const router = express.Router();


router.post('/sign-up-candidate', registerCandidate);
router.post('/sign-in-candidate', signInCandidate);
router.post('/sign-up-employee', registerEmployee);
router.post('/sign-in-employee', signInEmployee);

router.get('/candidate-info', verifyToken, getCandidateInfo);
router.get('/employee-info', verifyToken, getCompanyInfo);
module.exports = router;