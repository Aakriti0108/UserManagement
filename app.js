const express = require("express");
const path = require("path");
const fs = require("fs");
const jwt = require('jsonwebtoken');
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user-routes");
const forgotPasswordRequestRoutes = require("./routes/forgot-password-routes");
mongoose.connect(process.env.DB_URL,{useNewUrlParser : true}).then((result)=>{
    console.log("Connected Mongoose!");
}).catch((err)=>{
    console.log(err);
})

const accessLogStream = fs.createWriteStream(
    path.join(__dirname,"access.log"),
    {flags : "a"}
);

const app = express();
app.use(cors());
// app.use(helmet({
//     contentSecurityPolicy: false,
//   }));
app.use(morgan("combined", { stream : accessLogStream}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, `views`,`static`)));

app.use("/user",userRoutes);
app.use("/password", forgotPasswordRequestRoutes);

app.use((req, res, next)=>{
    try{
        let url = req.url.split("/");
        if(url[url.length-1]==''){
            res.sendFile(path.join(__dirname,`views`,`index.html`));
        }else{
            res.sendFile(path.join(__dirname,`views`,`${url[url.length-1]}`));
        }
    }catch(error){
        res.status(404).sendFile(path.join(__dirname),`views`,`error.html`);
    }
});


app.use((req, res)=>{
    res.status(404).sendFile(path.join(__dirname),`views/error.html`);
});

app.listen(process.env.PORT || 4000);