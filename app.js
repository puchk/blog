var express 		= require('express'),
	  bodyParser 	=	require('body-parser'),
	  mongoose 		=	require('mongoose')
	  app					= express(),
	  PORT 				= process.env.PORT || 8080;

mongoose.connect("mongodb://localhost/restful_blog");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.listen(PORT, function() {
	console.log("server is running on " +PORT);
});