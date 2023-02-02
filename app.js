const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded( {extended:true}));

app.use(express.static("public"));

var items = [];

var workItems = [];

app.get("/", function (req, res) {

  let day = date.getDate();

  res.render("list", { listTitle: day,
                        newListItems: items });
});
app.post("/",function(req,res){

    let item = req.body.newItem;
    if(req.body.button === "Work"){                    //if add is clicked in work
      workItems.push(item);
      res.redirect("/work");
    }
    else if(req.body.button === date.getDay()){        //if add is clicked in normal list
      items.push(item);
      res.redirect("/");
    }
    else if(req.body.clear === "Work"){                //if clear is clicked in work
      workItems=[];
      res.redirect("/work");
    }
    else if(req.body.clear === date.getDay()){         //if clear is clicked in normal list
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
