import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_url = "http://localhost:4000";
var name ="";
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
app.get("/", (req, res ) => {
        res.render("index.ejs",{ page: "home"});
});

app.get("/blogs", (req, res) => {
    res.render("blogs.ejs",{ page: "blogs"});
});

app.get("/profilepage", (req, res) =>{
    res.render("profilepage.ejs",({name}));
});

app.get("/createblog", (req, res) =>{

});

app.get("/signin",(req, res) =>{
    res.render("login.ejs");
});

app.get("/signup",(req, res) => {

    res.render("signup.ejs");
});
// Creating account 
app.post("/signup", async (req, res) =>{
    console.log(req.body);
    try {
        const response = await axios.post(`${API_url}/signup`, req.body);
        console.log(response.data);
        res.redirect("/");
        } catch (error) {
            res.status(500).json({ message: "Error occured while creating account"});
    }
});

// login 

app.post("/signin", async (req, res) => {
    try {
        const response = await axios.post(`${API_url}/signin`, req.body);
        console.log(response.data);
        name = response.data;
        res.render("profilepage.ejs",({name}));
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error occured while loging"});
    }
    
 }
);
//signout

app.post("/signout", (req, res) => {
    name = "";
    res.render("index.ejs");
})
app.listen(process.env.PORT || port );