const express   = require("express");
const route     = express.Router();
const userController = require("../controller/userController");
const {authentication} = require("../config/authentication");


route.post("/register",userController.register);

route.post("/login",userController.login);

route.get("/userdetails/:id",authentication,userController.getUserDetails);

route.put("/userdetails",authentication,userController.updateUserDetails);

route.get("/showallusers",userController.showAllUsers);

route.get("/searchuser",authentication,userController.searchUser);

module.exports = route;