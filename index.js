import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
app.get("/", (req, res ) => {
        res.render("index.ejs",{ page: "home"});
});

app.get("/blogs", (req, res) => {
    res.render("blogs.ejs",{ page: "blogs"});
});

app.get("/profilepage", (req, res) =>{
    res.render("profilepage.ejs");
});

app.get("/createblog", (req, res) =>{

});

app.get("/signin",(req, res) =>{
    res.render("login.ejs");
});

app.get("/signup",(req, res) => {
    res.render("signup.ejs");
});

app.post("/signup", (req, res) =>{
    console.log(req.body);
    res.render("index.ejs");
});
app.listen(process.env.PORT || port );