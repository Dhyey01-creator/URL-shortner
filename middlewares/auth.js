const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next) {
  const token = req.cookies?.token;
  if (!token) {
    return next(); 
  }
  const user = getUser(token);
  if (!user) {
    return next(); 
  }
  req.user = user;
  next();
}


function restrictTo(roles){
  return function(req, res, next){
    if(!req.user){
      return res.redirect("/login");
    }
    if (!roles.includes(req.user.role)){
      return res.status(403).send("Forbidden");
    }
    next();
  }
}

// async function restrictToLoggedinUserOnly(req, res, next) {
//   // const userUid = req.cookies?.uid;
//   console.log(req.headers);
//   const userUid = req.headers['authorization'];  
//   if (!userUid) return res.redirect("/login");
//   const token = userUid.split('Bearer ')[1];
//   const user = getUser(userUid); 

//   if (!user) return res.redirect("/login");

//   req.user = user;
//   next();
// }

// async function checkAuth(req, res, next) {
//   // const userUid = req.cookies?.uid;
//   console.log(req.headers);
//   const userUid = req.headers['authorization'];
//   const token = userUid.split('Bearer ')[1];
//   const user = getUser(token);

//   req.user = user;
//   next();
// }

module.exports = {
  checkForAuthentication,
  restrictTo
};
