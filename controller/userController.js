const userModel = require("../db/userDB");

module.exports.register= (req,res)=>{
     userModel.register(req.body)
     .then((data)=>{
         res.json({data:data});
     })
     .catch((err)=>{
         res.json({error:err.message});
     })
}

module.exports.login=(req,res)=>{
       userModel.checkEmail(req.body.email)
       .then((data)=>{
          return userModel.matchPassword(data[0].email,req.body.password,data[0].password)  
       })
       .then((dataa)=>{
           res.json({token:dataa});   
       })
       .catch((err)=>{
           res.json({error:err.message});
       }) 
}

module.exports.getUserDetails=(req,res)=>{
       userModel.getUserDetails(req.params.id)
       .then((data)=>{
           res.json(data);
       })
       .catch((err)=>{
           res.json({error:err.message});
       })
}

module.exports.updateUserDetails=(req,res)=>{
      userModel.updateUserDetails(req.body)
      .then((data)=>{
          res.json({data:data});
      })
      .catch((err)=>{
          res.json({error:err.message});
      })
}

var perpage=5,page=1;

module.exports.showAllUsers=(req,res)=>{
    
      if(req.query.perpage!=undefined || req.query.perpage!=null){
          perpage = req.query.perpage;
      }
      if(req.query.page!=undefined || req.query.page!=null){
          page = req.query.page; 
      }
      console.log(perpage,page);
      userModel.showAllUsers(perpage,page)
      .then((data)=>{
        res.json({data:data.data,current:page,pages:Math.ceil(perpage/data.count)});
      })
      .catch((err)=>{
        res.json({error:err.message});
      })
}

var data,field;

module.exports.searchUser=(req,res)=>{
    console.log(req.params.data);
    userModel.searchUser(req.params.data)
    .then((dataa)=>{
        res.json({data:dataa}); 
    })
    .catch((err)=>{
        res.json({error:err.message});
    })
}