const jwt = require("jsonwebtoken");

module.exports.authentication =(req,res,next)=>{
  
      if(req.header('authorization')){
        jwt.verify(req.header('authorization'),process.env.jwtkey,(err,decoded)=>{
             if(err){
                 res.json({error:err.message});
             }
             else{
                 next();
             }
         });
      }
      else{
          res.sendStatus(401);
      }  
    }