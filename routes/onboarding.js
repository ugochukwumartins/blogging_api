const express= require('express');
const passport = require("passport")
const onboardingController = require('../controllers/onboardingController');
const OnboardingRouter = express.Router();

OnboardingRouter.post('/login',onboardingController.login)

OnboardingRouter.post('/register',passport.authenticate('signup', { session: false }), onboardingController.signUp)


module.exports = OnboardingRouter;