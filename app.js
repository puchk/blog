var express 		= require('express'),
	  bodyParser 	=	require('body-parser'),
	  methodOverride = require('method-override'),
	  mongoose 		=	require('mongoose'),
	  expressSanitizer = require('express-sanitizer'),
	  app					= express(),
	  PORT 				= process.env.PORT || 8080;

mongoose.connect("mongodb://localhost/restful_blog");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
// Needs to be after bodyparser
app.use(expressSanitizer());
app.use(methodOverride("_method"));


// ===================================
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
// 	title: "test",
// 	image: "https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_1920,f_auto/dreamstime-24497029-DK-RF_kf4e1q.jpg",
// 	body: "blog body"
// });

// ===================================
app.get("/", function(req, res) {
	res.redirect("/blogs");
});

app.get("/blogs", function(req, res) {
	Blog.find({}, function(err, blogs) {
		if(err) {
			console.log(err);
		} else {
			res.render("index", {blogs: blogs});
		}
	})
});

// New Route
app.get("/blogs/new", function(req, res) {
	res.render("new");
});

// Create Route
app.post("/blogs", function(req, res) {
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.create(req.body.blog, function(err, newBlog) {
		if(err) {
			res.render("new");
		} else {
			res.redirect("/blogs");
		}
	});
});

// Show Route
app.get("/blogs/:id", function(req, res) {
	Blog.findById(req.params.id, function(err, blog) {
		if(err) {
			res.redirect("/blogs")
		} else {
			res.render("show", {blog: blog});
		}
	});
});

// Edit Route
app.get("/blogs/:id/edit", function(req, res) {
	Blog.findById(req.params.id, function(err, blog) {
		if(err) {
			res.redirect("/blogs");
		} else {
			res.render("edit", {blog: blog});
		}
	});
});

// Update Route
app.put("/blogs/:id", function(req, res) {
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
		if(err) {
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs/"+req.params.id);
		}
	});
});

// Delete Route
app.delete("/blogs/:id", function(req, res) {
	Blog.findByIdAndRemove(req.params.id, function(err) {
		if(err) {
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs");
		}
	});
});




app.listen(PORT, function() {
	console.log("server is running on " +PORT);
});