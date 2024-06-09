import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import moment from 'moment';


const app = express();
const port = 4000;
const APP_url = "http://localhost:3000";
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const db = await mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '9581494976@Uu',
        database: 'starblogs',
    }
);
function validSignup(user) {

    try {

        db.query(`select * from user where email ='${user.email}'`, (err, res, fields) => {
            if (res.length === 0) {
                db.query(`INSERT INTO user (first_name, last_name, email, mobile_number, dob, working_profession, password, date_time_created)
                VALUES ('${user['first-name']}', '${user['last-name']}', '${user.email}', '${user['mobile-number']}', '${user.dob}', '${user.profession}', '${user.password}', '${NOW()}');`,);
                return true;
            }
            else {
                return false;
            }

        });

    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).send('Internal server error. Please try again later.');
    }
}

function NOW() {
    const date = moment().format('YYYY-MM-DD HH:mm:ss');
    console.log(date);
    return date;
}
//signup
app.post("/signup", (req, res) => {
    try {
        if (validSignup(req.body))
            res.redirect(`${APP_url}/`);
        else
            res.send("error occoured");
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).send('Internal server error. Please try again later.');
    }

});
//signin
app.post("/signin", (req, res) => {
    try {
        db.query(`select * from user where email='${req.body.email}'`, (err, result, fields) => {
            console.log(result);
            if (result[0].password === req.body.password) {
                const name = result[0].first_name + ' ' + result[0].last_name;
                res.status(200).send(name);
            }
        })
    }
    catch {
        console.error('Error during signup:', error);
        res.status(500).send('Internal server error. Please try again later.');
    }

});
app.listen(process.env.PORT || port);