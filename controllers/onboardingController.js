const passport = require("passport")
const jwt = require("jsonwebtoken")
var store = require('store')
var User={};
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
              user_name: user.user_name,
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
            body.token= token;
            console.log(body);
            store.set('user', body)
            //localStorage.setItem("User",body )
            return res.json({ status: true, token: token, User });
          })
        } catch (error) {
          return next(error)
        }
      })(req, res, next) ;
    
   
}
exports.UserData=User;
exports.signUp=  async (req, res) => {
 

    return res.json({ status: true, user: req.user });
  }