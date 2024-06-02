import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static("public"));

app.get("/", (req, res ) => {
        res.render("index.ejs",{ page: "home"});
});
app.get("/blogs", (req, res) => {
    res.render("index.ejs",{ page: "blogs"});
});
app.listen(port, () => {
    console.log(`server is running on port : ${port}`);
});