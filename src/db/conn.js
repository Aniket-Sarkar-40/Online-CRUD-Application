const mongoose = require("mongoose");
require("dotenv").config();

const DB = `mongodb://Aniket:${process.env.PASSWORD}@ac-k9cy9gl-shard-00-00.ca6nob0.mongodb.net:27017,ac-k9cy9gl-shard-00-01.ca6nob0.mongodb.net:27017,ac-k9cy9gl-shard-00-02.ca6nob0.mongodb.net:27017/?ssl=true&replicaSet=atlas-yu48jq-shard-0&authSource=admin&retryWrites=true&w=majority`
mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true,

}).then(()=>{
    console.log("Connection Successful");
}).catch((error)=>{
    console.log(error);
})


