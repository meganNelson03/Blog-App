var express = require("express"),
bodyParser = require("body-parser"),
mongoose = require("mongoose"),
app = express();

//app config
mongoose.connect("mongodb://localhost/blog_app");
app.set("view engine", "ejs");
app.use(express.static("public")); //for serving custom style sheets
app.use(bodyParser.urlencoded({extended: true}));

// mongoose model config
var blog_scheme = new mongoose.Schema({
   title: String,
   image: String,
   body: String,
   created: 
    {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blog_scheme);

//RESTful routes

app.get("/", function(req, res){
    res.redirect("/blogs");
})

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

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Blog server running...");
})