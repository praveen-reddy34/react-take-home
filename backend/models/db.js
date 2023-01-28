const mongoose = require("mongoose");

mongoose.set('strictQuery', false);
const connection = mongoose.connect("mongodb://127.0.0.1:27017/shoppingList", {useNewUrlParser: true}, err=> {
    if(err) console.log(`Error Connecting: ${err}`);
    console.log("DataBase Connection Successfull")
  });

module.exports = connection;