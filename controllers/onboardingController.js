const passport = require("passport")
const jwt = require("jsonwebtoken")
var store = require('store')

exports.login=(req,res, next)=>{
    passport.authenticate('login', async (error, user, info) => {
        try {
          console.log( user);
          if (error) {
            res.render("error", {
              errors:error.message,
             // blogs: blog,
              pageTitle: "Error",
              path: "/error",
            });
            return next(error);
          };
          if (!user) {
           // const error = new Error('user name or password is incorrects');
            res.render("error", {
              errors:'user name or password is incorrects',
             // blogs: blog,
              pageTitle: "Error",
              path: "/error",
            });
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
           
            res.redirect('/')
           // return res.json({ status: true, token: token, User });
          })
        } catch (error) {
          return next(error)
        }
      })(req, res, next) ;
    
   
}

exports.getLogin = (req, res, next) => {
  var users= store.get('user');
  res.render("onboarding/login", {
     user:users,
    // blogs: blog,
     pageTitle: "Login",
     path: "/login",
   });
};


exports.signUp=  async (req, res, next) => {
  passport.authenticate('signup', async (error, user, info) => {
try{
  console.log( user);
  if (error) {
   // res.redirect('/login')
    res.render("error", {
      errors:error.message,
     // blogs: blog,
      pageTitle: "Error",
      path: "/error",
    });
    return next(error);
  };
  if (!user) {
    //const error = new Error(`${error.message}`);
    res.render("error", {
      errors:error.message,
     // blogs: blog,
      pageTitle: "Error",
      path: "/error",
    });

    return next(error);
  }
  req.login(user, { session: false }, async (error) => {
    if (error) return next(error);
    console.log(user)
  })
   // return res.json({ status: true, user: req.user });
    res.redirect('/login')
  }
    catch (error) {

      res.render("error", {
        errors:error.message,
       // blogs: blog,
        pageTitle: "Error",
        path: "/error",
      });
     // return next(error)
    }
  })(req, res, next) ;}


exports.getSignup = (req, res, next) => {
  var users= store.get('user');
  res.render("onboarding/sign_up", {
     user:users,
    // blogs: blog,
     pageTitle: "SignUp",
     path: "/SignUp",
   });
};

exports.logOut=(req, res, next) => {
  store.remove('user');
 
  res.redirect('/');
}