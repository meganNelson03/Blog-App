var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    //expressSanitizer = require("express-sanitizer"),
    app = express();

//app config
mongoose.connect("mongodb://localhost/blogApp");
app.set("view engine", "ejs");
app.use(express.static("public")); //for serving custom style sheets
app.use(bodyParser.urlencoded({extended: true}));
//app.use(expressSanitizer);
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


Blog.create({
  title: "Wowwww",
  image: "https://images.unsplash.com/photo-1534278931827-8a259344abe7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
  body: "Wow? Can you believe it. Neither can I. When you stepped out onto the scene... I thought..."
}, function(err, ne) {
    if (err) {
         console.log(err);
    } else {
         console.log("HEY" + ne);
    }
});

Blog.create({
  title: "Hello!!!",
  image: "https://sbly-web-prod-shareably.netdna-ssl.com/wp-content/uploads/2017/10/18150512/Screen-Shot-2017-10-18-at-3.03.52-PM.png",
  body: "Wow? Can you believe it. Neither can I. When you stepped out onto the scene... I thought..."
}, function(err, ne) {
    if (err) {
         console.log(err);
    } else {
         console.log("HEY" + ne);
    }
});

Blog.create({
  title: "Hello!!!",
  image: "https://www.denverpost.com/wp-content/uploads/2018/01/day_in_pictures_010818_001.jpg?w=620",
  body: "Wow? Can you believe it. Neither can I. When you stepped out onto the scene... I thought..."
}, function(err, ne) {
    if (err) {
         console.log(err);
    } else {
         console.log("HEY" + ne);
    }
});



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
  //  req.body.blog.body = req.sanitize(req.body.blog.body);
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
   //req.body.blog.body = req.sanitize(req.body.blog.body);
   Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
      if (err) {
          res.redirect("/blogs");
      } else {
          res.redirect("/blogs/" + req.params.id);
      }
   });
});

//destroy route

app.delete("/blogs/:id", function(req, res) {
   Blog.findByIdAndRemove(req.params.id, function(err) {
       if (err) {
           res.redirect("/blogs");
       } else {
           res.redirect("/blogs");
       }
   })
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Blog server running...");
});