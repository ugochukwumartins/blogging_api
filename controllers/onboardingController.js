const passport = require("passport")
const jwt = require("jsonwebtoken")

exports.login=(req,res, next)=>{
    passport.authenticate('login', async (error, user, info) => {
        try {
          console.log( user);
          if (error) {
            return next(error);
          };
          if (!user) {
            const error = new Error('user name or password is incorrects');
            return next(error);
          }
          req.login(user, { session: false }, async (error) => {
            if (error) return next(error);
    
            const body = {
    
              email: user.email,
              password: user.password,
              first_name: user.first_name,
              last_name: user.last_name,
              user_type: user.user_type,
              age: user.age,
              _id: user._id,
              created_at: user.created_at,
            };
            User= body;
            const token = jwt.sign(
    
              { user: body }, process.env.JWT_SECRETE, {
    
                expiresIn: '1h' // expires in 24 hours
    
                 }
            );
            return res.json({ status: true, token: token });
          })
        } catch (error) {
          return next(error)
        }
      })(req, res, next) ;
    
    
}

exports.signUp=  async (req, res) => {
 

    return res.json({ status: true, user: req.user });
  }