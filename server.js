var express = require("express");
var app = express();

app.use(express.static(__dirname + '/public'));

app.get("/", (req, res)=>{
    res.render("index");
});

app.listen(process.env.PORT || 8080, function(){
    console.log("server is listening at port 8080");
});