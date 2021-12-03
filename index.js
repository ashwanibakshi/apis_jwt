const express   = require("express");
const mongoose  = require("mongoose");
const {connect} = require("./config/db");

require('dotenv').config();

mongoose.connect(connect)
.then(()=>console.log("connected to db"))
.catch((err)=>console.log("connection error",err))

const app  = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/',require("./routes/userRoute"));

const port = process.env.PORT || 3000;

app.listen(port,()=>console.log(`server run at port ${port}`));