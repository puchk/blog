var express 		= require('express'),
	  bodyParser 	=	require('body-parser'),
	  mongoose 		=	require('mongoose')
	  app					= express(),
	  PORT 				= process.env.PORT || 8080;

mongoose.connect("mongodb://localhost/restful_blog");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


// ===================================
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

Blog.create({
	title: "test",
	image: "https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_1920,f_auto/dreamstime-24497029-DK-RF_kf4e1q.jpg",
	body: "blog body"
});

// ===================================
app.get("/", function(req, res) {
	res.redirect("/blogs");
});

app.get("/blogs", function(req, res) {
	res.render("index");
});





app.listen(PORT, function() {
	console.log("server is running on " +PORT);
});