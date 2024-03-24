const express = require('express');
const router = express.Router();

const { 
    register,
    login,
    verifyEmail,
    forgotPassword,
    resetPassword,
    deleteUser} = require('../controllers/authController.js')

router.post('/signup', register);
router.post('/login', login);
router.get('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.patch('/reset-password', resetPassword);
router.delete('/delete/:id',deleteUser)

module.exports = router;