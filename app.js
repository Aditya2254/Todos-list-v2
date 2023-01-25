const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded( {extended:true}));

app.use(express.static("public"));

var items = [];

var workItems = [];

app.get("/", function (req, res) {
  var today = new Date();
  
  var options={
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  }

  res.render("list", { listTitle: today.toLocaleDateString("en-US",options),
                        newListItems: items });
});

app.post("/",function(req,res){
    var item = req.body.newItem;
    if(req.body.button === "Work"){         //if add is clicked in work   clear will be undefined
      workItems.push(item);
      res.redirect("/work");
    }
    else if(req.body.clear === undefined){  //if add is clicked not in work   clear will be undefined
      items.push(item);
      res.redirect("/");
    }
    else if(req.body.clear === "Work"){     //if clear is clicked in work   button will be undefined
      workItems=[];
      res.redirect("/work");
    }
    else{                                   //if clear is clicked not in work button will be undefined
      items=[];
      res.redirect("/");
    }

});

app.get("/work",function(req,res) {
    res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about",function(req,res) {
    res.render("about");
})

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
