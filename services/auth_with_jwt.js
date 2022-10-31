const passport = require("passport");
const localStrtegy = require("passport-local").Strategy;
const usersModel = require("../models/userModel");
const jwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;

passport.use(
  new jwtStrategy(
    {
      secretOrKey: process.env.JWT_SECRETE,
      jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "signup",
  new localStrtegy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        //const user_type= req.body.user_type;
      const  user_name= req.body.user_name;
        const age = req.body.age;
        const user = await usersModel.create({
          email,
          password,
          user_name,
          first_name,
          last_name,
         // user_type,
          age,
        });
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new localStrtegy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        const user = await usersModel.findOne({
          username,
        });
        console.log(user);
        if (!user) {
          return done(null, false, { message: "user not found" });
        }
        const validated = await user.isValidPasswor(password);
        if (!validated) {
          return done(null, false, { message: "wrong password" });
        }

        return done(null, user, { message: "user login successfully" });
      } catch (error) {
        done(error);
      }
    }
  )
);
