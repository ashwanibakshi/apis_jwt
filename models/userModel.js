const mongoose  =  require("mongoose");

const userSchema = new mongoose.Schema({
      firstname:{
          type:String,
          required:true
      },
      lastname:{
          type:String,
          required:true
      },
      email:{
          type:String,
          required:true,
          unique:true
      },
      phno:{
          type:Number,
          required:true,
          unique:true
      },
      password:{
          type:String
      }
});

module.exports = mongoose.model("users",userSchema);