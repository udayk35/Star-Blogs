import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static("public"));

app.get("/", (req, res ) => {
        res.render("index.ejs",{ page: "home"});
});

app.get("/blogs", (req, res) => {
    res.render("blogs.ejs",{ page: "blogs"});
});

app.get("/profilepage", (req, res) =>{

});

app.listen(process.env.PORT || port );