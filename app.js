//jshint esversion:6

var posts = [];

const express = require("express");

//for using lowerCase func in LODASH module
const _ = require('lodash');

const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "Click on Compose to add entries!";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function (req,res) {
       res.render("home", {
              homeStartString : homeStartingContent, 
              posts : posts
       });
});

app.get("/about", function (req,res) {
       res.render("about", {aboutStartString : aboutContent});
});

app.get("/contact", function (req,res) {
       res.render("contact", {contactStartString : contactContent});
});


app.get("/compose", function (req,res) {
       res.render("compose");    
                                                                                                                                                                                                                                                                   
});
app.post("/compose", function (req,res) {
     
       const obj = {
          PostTitle : req.body.postTitle,
          PostData :  req.body.postData
       };
       posts.push(obj);
       res.redirect("/");
});

//for getting a new page for every requested post
app.get("/posts/:topic", function (req,res) {
           //     |
           //   this can be accessed using req.params.<name of parameter>
       let f = 0;
       let h = "", body = "";

       let tpc = _.lowerCase(req.params.topic);
       console.log(tpc); 
       
       //for loop to check if requested post exist in array of posts or not
       posts.forEach(function (post) {
 
         let curr = _.lowerCase(post.PostTitle);
         if(curr === tpc){
              //if found, assign h and body with title and body of past
              f=1; h = post.PostTitle;  body = post.PostData;
         }
       });
       
       //if post found, render the post.ejs page
       if(f){
              res.render("post", {
                  heading : h,
                  para : body   
              });
       }
       else
       //else render the home page
       res.render('home');
 });


app.listen(3000, function() {
  console.log("Server started on port 3000");
});

             