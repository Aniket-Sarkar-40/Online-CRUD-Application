const mongoose = require("mongoose");
require("dotenv").config();

const url = `mongodb+srv://aniket:${process.env.PASSWORD}@cluster0.tospsxr.mongodb.net/user?retryWrites=true&w=majority`;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((error) => {
    console.log(error);
  });
