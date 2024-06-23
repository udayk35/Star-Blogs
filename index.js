import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import passport from "passport";
import session from "express-session";
import bcrypt from "bcrypt";
import { Strategy } from "passport-local";
import path from "path";

const app = express();
const port = 3000;
const API_url = "http://localhost:4000";
const saltRounds = 10;

app.set('view engine', 'ejs');
app.set('views', path.join( 'views'));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: "TopSecrect",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    res.render("index.ejs", { page: "home" });
});

app.get("/blogs", (req, res) => {
    res.render("blogs.ejs", { page: "blogs" });
});

app.get("/profilepage", (req, res) => {
    if(req.isAuthenticated())
       {
        console.log(req.user);
        res.render("profilepage.ejs",{
            user: req.user,
        });
       }
        else
        {
            res.render("profilepage.ejs");
        }
        
});

app.get("/createblog", (req, res) => {
    if(req.isAuthenticated())
    res.render("createBlog.ejs");
    else
    res.redirect("/signin");
});

app.get("/signin", (req, res) => {
    res.render("login.ejs");
});

app.get("/signup", (req, res) => {
    res.render("signup.ejs");
});
// Creating account 
app.post("/signup", async (req, res) => {
    const user = req.body;
    console.log(user);
    if (user.password === user['confirm-password']) {
        const hash = await bcrypt.hash(user.password, saltRounds);
        console.log(hash);
        try {

            const reponse = await axios.post(`${API_url}/signup`, {
                user: user,
                hash: hash,
            });
                const user1 = reponse.data;
            req.login(user1, (err) =>{
                console.log(user1);
                res.redirect("/");
            })
        } catch (error) {
            console.log(error);
            res.send("User already exists");
        }
    }
    else {
        res.redirect("/signup.ejs");
    }

});

// login 

app.post("/signin", passport.authenticate("local",{
    successRedirect:"/",
    failureRedirect:"/signin",
}));
//signout

app.post("/signout", (req, res, next) => {
    req.logout((err) =>{
        if(err)
            return next(err);
    })
    res.render(`index.ejs`);
})

// Creating blog
app.post("/createBlog", (req, res) => {
    console.log(req.body);
    res.send("***");
});

passport.use(new Strategy({usernameField: 'username',passwordField:'password'},async function verify(username, password, done) {
    try {
        const passwordHash = await axios.post(`${API_url}/getUser`,{
            username: username
        });
        const user = passwordHash.data[0];

        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        
        const result = await bcrypt.compare(password, user.password);

        if (result) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect password.' });
        }

    } catch (error) {
        console.log(error.message);
        console.error("Error Occured");
    }
}));
passport.serializeUser((user, cb) => {
    cb(null, user);
})
passport.deserializeUser((user, cb) => {
    cb(null, user);
})
app.listen(process.env.PORT || port, () => {
    console.log(`Server running on port ${port}`)
});