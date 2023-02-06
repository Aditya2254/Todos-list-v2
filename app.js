const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mysql = require("mysql");
const config = require("./config.js");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded( {extended:true}));

app.use(express.static("public"));


var workItems = [];

app.get("/", function (req, res) {
  
  let day = date.getDate();
  

  let connection2 = mysql.createConnection(config);
  let sql = `SELECT * FROM todos`;
  connection2.query(sql, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    res.render("list", { listTitle: day,
      newListItems: results });
    });
    connection2.end();

});
app.post("/",function(req,res){

    let item = req.body.newItem;
    if(req.body.button === "Work"){                    //if add is clicked in work
      workItems.push(item);
      res.redirect("/work");
    }
    else if(req.body.button === date.getDay()){        //if add is clicked in normal list
      let connection1 = mysql.createConnection(config);
      let sql = `insert into todos(id,title,completed) values(default,?,?)`;
      let data = [item,0];
      connection1.query(sql,data);
      connection1.end();
      
      res.redirect("/");
    }
    else if(req.body.clear === "Work"){                //if clear is clicked in work
      workItems=[];
      res.redirect("/work");
    }
    else if(req.body.clear === date.getDay()){         //if clear is clicked in normal list
      let connection4 = mysql.createConnection(config);
      let sql = `truncate todos`;
      connection4.query(sql);
      connection4.end();
      res.redirect("/");
    }

});

app.post("/delete",function(req,res) {
  let id = req.body.checkbox;
  let connection2 = mysql.createConnection(config);
  let sql = `delete from todos where id=?`;
  let data = [id];
  connection2.query(sql,data);
  connection2.end();

  res.redirect("/");
})

app.get("/work",function(req,res) {
    res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about",function(req,res) {
    res.render("about");
})

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
