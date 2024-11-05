const express = require('express');
const { registerCandidate, signInCandidate, signInEmployee, registerEmployee} = require('../controllers/authController');
const router = express.Router();


// Registration route
router.post('/sign-up-candidate', registerCandidate);
router.post('/sign-in-candidate', signInCandidate);
router.post('/sign-up-employee', registerEmployee);
router.post('/sign-in-employee', signInEmployee);

module.exports = router;