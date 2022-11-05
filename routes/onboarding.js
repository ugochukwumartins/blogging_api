const express= require('express');
const passport = require("passport")
const onboardingController = require('../controllers/onboardingController');
const OnboardingRouter = express.Router();

OnboardingRouter.post('/login',onboardingController.login)
OnboardingRouter.get('/login',onboardingController.getLogin)

OnboardingRouter.post('/register', onboardingController.signUp)
OnboardingRouter.get('/SignUp',onboardingController.getSignup)
OnboardingRouter.get('/logout',onboardingController.logOut)

module.exports = OnboardingRouter;