//todos:
//could have made, a post has many categories
require("dotenv").config({path:__dirname + "/.env"});
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/db.js");
const authRouter = require("./routes/auth");
const cookieParser = require("cookie-parser");
const composepost = require("./routes/composepost");
const category = require("./routes/category");
const post = require("./routes/post");
const comment = require("./routes/comment");
const cors = require('cors');
const path = require("path");

app.use(express.static(path.join(__dirname ,'build')));
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(authRouter);
app.use("/compose",composepost);
app.use("/category",category);
app.use("/post",post);
app.use("/comment",comment);

const PORT = "8080";
const HOST = "localhost";

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,'build',"index.html"));
})

connection.connect((err)=>{
    if(!err){
        app.listen(PORT,HOST,()=>{
            console.log("listening to "+ PORT + "...");
        })
    }else{
        console.log("Failed to connect database");
    }
});

