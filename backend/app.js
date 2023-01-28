const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

const conn = require("./models/db");
const Schema = mongoose.Schema;
var jsonParser = bodyParser.json()
app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//Users Schems for User Name and Shopping List Items
const usersSchema = new Schema({
  name: { type: String, required: true, index: true, unique: true },
  shoppingList: []
});
const Users = mongoose.model("Users", usersSchema);

//API to get all Users Data in the DB
app.get("/allUsersShoppingList", (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    Users.find({}, function(err, foundItems) {
        res.send(foundItems);
    });
    });

//API to get a specific User's Shopping List Items
app.get("/:userName", (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    const requestedName = req.params.userName;
    Users.findOne({name: requestedName}, function(err, foundItems) {
        res.send(foundItems);
    });
    });  

//API to Post new User to DB
app.post("/",jsonParser, (req, res) => {
    const user = new Users({
        name: req.body.name
      });
      user.save(function(err){
        if (!err){
            res.send({status: 200});
        }
      });
      
})


//API to delete the shopping List Item
app.delete("/:userName",jsonParser, (req, res) => {
    Users.updateOne(
        {name: req.params.userName},
        { $pull: { shoppingList: req.body.deleteItems[0] } }
    ,function(err){
        if(!err){
            Users.findOne({name: req.params.userName}, function(err, foundItems) {
                res.send(foundItems);
            });
        } else {
          res.send(err);
        }
    }
    );
      
});

//API to Add Shopping List Item of a User to DB
app.post("/:userName",jsonParser, (req, res) => {
    Users.updateOne(
        {name: req.params.userName},
        { $push: { shoppingList:req.body.item } }
    ,function(err){
        if(!err){
          res.send({status: 200});
        } else {
          res.send(err);
        }
    }
    );
});

app.listen(8000, function(err) {
    if(err) {
        console.log(err);
    }
  });