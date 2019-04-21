var express = require("express"),
bodyParser = require("body-parser"),
mongoose = require("mongoose"),
methodOverride = require("method-override"),
app = express();

//app config
mongoose.connect("mongodb://localhost/blogApp");
app.set("view engine", "ejs");
app.use(express.static("public")); //for serving custom style sheets
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

// mongoose model config
var blog_scheme = new mongoose.Schema({
   title: String,
   image: String,
   body: String,
   created: 
    {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blog_scheme);


// Blog.create({
//   title: "This is a blog",
//   image: "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//   body: "Hey there, hey hey hey hey, hery eheye hey"
// }, function(err, ne) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("HEY" + ne);
//     }
// });


//RESTful routes

app.get("/", function(req, res){
    res.redirect("/blogs");
});


app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
       if (err){
           console.log(err);
       } else {
           res.render("index", {blogs: blogs});
       }
    });
   
});


app.get("/blogs/new", function(req, res){
   res.render("new"); 
});


//CREATE route
app.post("/blogs", function(req, res){
   Blog.create(req.body.blog, function(err, newBlog){
       if (err) {
           res.render("new");
       } else {
           res.redirect("blogs");
       }
   }); 
});

//edit

app.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(err, found) {
       if (err) {
           res.redirect("/blogs");
       } else {
           res.render("edit", {blog: found});
       }
    });
});


//SHOW

app.get("/blogs/:id", function(req, res) {
   Blog.findById(req.params.id, function(err, foundBlog) {
       if (err) {
           res.redirect("/blogs");
       } else {
           res.render("show", {blog: foundBlog});
       }
   });
});


//update

app.put("/blogs/:id", function(req, res) {
   Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
      if (err) {
          res.redirect("/blogs");
      } else {
          res.redirect("/blogs/" + req.params.id);
      }
   });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Blog server running...");
});