const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");





app.get("/", function(req, res){
    res.render("home");
});

app.get("/solve", function(req, res){
    res.render("solve", {puzzle: "", solution: ""});
});

// app.get("/duas/:id", function(req, res) {
// 	res.render("show", {dua: duas[req.params.id]})
// });


app.listen(3000, process.env.IP, function(){
   console.log("The Server Has Started!");
});