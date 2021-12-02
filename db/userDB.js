const userModel  = require("../models/userModel");
const bcrypt     = require("bcrypt");
const jwt        = require("jsonwebtoken");

module.exports.register=(data)=>{
   return new Promise((resolve,reject)=>{
         try {
            bcrypt.genSalt(10,(err,salt)=>{
               if(err){
                   reject(err);
               }
               else{
                 bcrypt.hash(data.password,salt,(err,hash)=>{
                     if(err){
                         reject(err);
                     }
                     else{
                        data.password = hash;
                        let user = new userModel({
                             firstname : data.firstname,
                             lastname  : data.lastname,
                             email     : data.email,
                             phno      : parseInt(data.phno),
                            password   : data.password  
                        });
                        user.save((err,sdata)=>{
                            if(err){
                                reject(err);
                            }
                            else{
                                resolve(sdata)
                            }
                        });    
                     }
                 });    
               }
            });
         } catch (error) {
             reject(error);
         }
   });
}

module.exports.checkEmail=(email)=>{
  return new Promise((resolve,reject)=>{
       try {
           userModel.find({"email":email},(err,edata)=>{
               if(err){
                reject(err);
               }
               else if(edata.length){
                   resolve(edata);    
               }
               else{
                   reject({message:"user not registered"});
               }
           });
       } catch (error) {
           reject(error);
       }
  });      
}

module.exports.matchPassword=(email,pwd,pwdhash)=>{
   return new Promise((resolve,reject)=>{
        try {
           bcrypt.compare(pwd,pwdhash,(err,match)=>{
               if(err){
                   reject(err);
               }
               else if(match){
               var jwtt = jwt.sign({
                    data: email
                  },process.env.jwtkey, { expiresIn: '10h' });
                resolve(jwtt);  
               }
               else{
                   reject({message:"wrong username password"});
               }
           });           
        } catch (error) {
            reject(error);
        } 
   });
}

module.exports.getUserDetails=(uid)=>{
   return new Promise((resolve,reject)=>{
      try {
         userModel.findOne({"_id":uid},(err,data)=>{
             if(err){
                 reject(err);
             }
             else {
                 resolve(data);
             }
         });  
      } catch (error) {
          reject(error);
      }  
   }); 
}

module.exports.updateUserDetails=(data)=>{
    return new Promise((resolve,reject)=>{
       try {
         let userData={
            firstname : data.firstname,
            lastname  : data.lastname,
            email     : data.email,
            phno      : parseInt(data.phno)
         }
         userModel.findOneAndUpdate({"_id":data.id},
         {$set:userData},{new:true},(err,dataa)=>{
             if(err){
                 reject(err);
             }
             else{
                 resolve(dataa);
             }  
         })     
       } catch (error) {
           reject(error);
       }  
    });
}

var query={};

module.exports.showAllUsers=(perpage,page)=>{
   return new Promise((resolve,reject)=>{
       try {
           console.log(perpage,page);
           query.skip  = (perpage*page) - perpage;
           query.limit = perpage;
         userModel.find({},{},query,(err,udata)=>{
               if(err){
                   reject(err);
               }
               else{
                 userModel.find().count((err,count)=>{
                     if(err){
                        reject(err);
                     }
                     else{
                        let dataa={
                             data:udata,
                             count:count
                        }
                        resolve(dataa); 
                     }
                 });           
               }
            });
       } catch (error) {
           reject(error);
       }
   });
}

module.exports.searchUser=(data,perpage,page)=>{
   return new Promise((resolve,reject)=>{
      try {
        //   console.log(data);
        query.skip  = (perpage*page)-perpage;
        query.limit = perpage;

       userModel.find({$or:[{"firstname":{$regex:data}},
       {"lastname":{$regex:data}},{"email":{$regex:data}}]},{},query,(err,dataa)=>{
          if(err){
              reject(err);
          }
          else{
         userModel.find({$or:[{"firstname":{$regex:data}},
         {"lastname":{$regex:data}},{"email":{$regex:data}}]}).count((err,count)=>{
                if(err){
                    reject(err);
                }
                else{
                    let data = {
                        data:dataa,
                        count:count
                    }
                   resolve(data);  
                }
           });
          }
       });
      } catch (error) {
          reject(error);
      } 
   });
}