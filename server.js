import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2/promise';
import moment from 'moment';
import passport from 'passport';


const app = express();
const port = 4000;
const APP_url = "http://localhost:3000";
app.use(express.static("public"));

const db =await  mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        port: 3306,
        password: '9581494976@Uu',
        database: 'starblogs',
    }
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
function NOW() {
    const date = moment().format('YYYY-MM-DD HH:mm:ss');
    console.log(date);
    return date;
}
//signup
app.post("/signup", async (req, res) => {
    const user = req.body.user;
    const hash = req.body.hash;
    console.log(user);
    const response =await (await db).query(`SELECT * FROM user WHERE email = '${user.email}'`);
    const userExists = response[0];
    if( userExists.length>0)
        res.status(409).send('User already exists');
    else
    {
        const result = await (await db).query('INSERT INTO user(first_name,last_name,email,mobile_number,dob,working_profession,password,date_time_created) values(?,?,?,?,?,?,?,?)',[user['first_name'],user['last_name'],user.email,user['mobile_number'],user.dob,user.working_profession,hash,NOW()])
        res.status(200).send(user);
    }

});
//getUser
app.post("/getUser",async (req, res)=>
{
    console.log(req.body);
    const user = req.body
    const response =await (await db).query(`SELECT * FROM user WHERE email = '${user.username}'`);
    const userExists = response[0];
    console.log(userExists);
    if(userExists.length>0)
    res.status(200).send(userExists);
    else
    res.status(404).send("User not found");
})


app.listen(process.env.PORT || port);