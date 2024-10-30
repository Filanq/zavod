const express = require("express");
const bodyParser = require('body-parser');
const sql = require('./database.cjs');
const session = require('express-session');
const cors = require('cors');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const {request} = require("express");
const MySQLStore = require('express-mysql-session')(session);
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require('fs');

const sessionStore = new MySQLStore({}, sql);

// const corsOption = {
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
// }

const upload = multer({
    dest: path.join(__dirname, "../dist/img/files")
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

// App Init
const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    session({
        secret: 'cookie_secret',
        resave: false,
        saveUninitialized: false,
        store: sessionStore
    })
);
// app.use(cors(corsOption));

function sql_query(query, options, cb){
    sql.query(query, options, (err, res)=>{
        if(err){
            console.log("error: ", err);
            return;
        }
        cb(res);
    });
}

// Routes Init
app.post("/api/login", function(req, res){
    let email = req.body.email.trim();
    let password = crypto.createHash('md5').update(req.body.password.trim()).digest('hex');

    if(!email){
        res.json({message: 'Email пуст!', success: false});
    }
    else if(!req.body.password.trim()){
        res.json({message: 'Пароль пуст!', success: false});
    }
    else{
        sql_query("SELECT * FROM users WHERE email=? AND password=?", [email, password], (resp)=>{
            if(resp[0]){
                const token = jwt.sign(
                    {
                        email: resp[0].email,
                        userId: resp[0].id,
                    },
                    'SECRETKEY',
                    { expiresIn: '7d' }
                );
                console.log(req.session.user);
                res.json({message: 'Вы успешно вошли', success: true, token});
            }
            else{
                res.json({message: 'Пользователя с такими данными не существует!', success: false});
            }
        });
    }
});

app.post("/api/register", function(req, res){
    let firstname = req.body.firstname.trim();
    let lastname = req.body.lastname.trim();
    let email = req.body.email.trim();
    let password = crypto.createHash('md5').update(req.body.password.trim()).digest('hex');

    if(!firstname){
        res.json({message: 'Имя пусто!', success: false});
    }
    else if(!lastname){
        res.json({message: 'Фамилия пуста!', success: false});
    }
    else if(!email){
        res.json({message: 'Email пуст!', success: false});
    }
    else if(!req.body.password.trim()){
        res.json({message: 'Пароль пуст!', success: false});
    }
    else{
        sql_query("SELECT * FROM users WHERE email=?", email, (resp)=>{
            if(resp[0]){
                res.json({message: 'Пользователь с такой почтой существует!', success: false});
            }
            else{
                sql_query("INSERT INTO users VALUES(null, ?, ?, ?, ?, 0)", [firstname, lastname, email, password], (resp2) => {
                    console.log(resp2);
                    const token = jwt.sign(
                        {
                            email,
                            userId: resp2.insertId,
                        },
                        'SECRETKEY',
                        { expiresIn: '7d' }
                    );
                    res.json({message: 'Success', success: true, token});
                });
            }
        });
    }
});

app.post("/api/is_auth", function(req, res){
    let user_id = 0;
    try {
        const token = req.body.token;
        user_id = jwt.verify(token, 'SECRETKEY').userId;
    }
    catch (err) {
        return res.json({
            email: '',
            id: 0,
            is_auth: false,
            is_admin: false
        });
    }
    sql_query("SELECT * FROM users WHERE id = ?", user_id, (resp)=>{
        if(resp[0]){
            res.json({
                email: resp[0].email,
                id: resp[0].id,
                is_auth: true,
                is_admin: !!resp[0].is_admin,
            });
        }
        else{
            res.json({
                email: '',
                id: 0,
                is_auth: false,
                is_admin: false
            });
        }
    });
});

app.post("/api/order", upload.single("file"), function(req, res){
    let count = req.body.count;
    let tel = req.body.tel.trim();
    let tg = req.body.tg.trim();
    let cost = req.body.cost.trim();
    let address = req.body.address.trim();
    let type = req.body.type.trim();
    let date = new Date();
    let date_str = date.getFullYear() + '-' + (String(date.getMonth() + 1).length > 1 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) + '-' + (String(date.getDate()).length > 1 ? date.getDate() : '0' + date.getDate());
    let time = (String(date.getHours()).length > 1 ? date.getHours() : '0' + date.getHours()) + ':' + (String(date.getMinutes()).length > 1 ? date.getMinutes() : '0' + date.getMinutes()) + ':' + (String(date.getSeconds()).length > 1 ? date.getSeconds() : '0' + date.getSeconds());
    let token = req.body.token;
    let name = '';
    user_id = jwt.verify(token, 'SECRETKEY').userId;

    if(!count || count === '0'){
        return res.json({message: 'Тираж пуст!', success: false});
    }
    else if(!tel || tel.includes('_')){
        return res.json({message: 'Телефон пуст!', success: false});
    }
    else if(!tg){
        return res.json({message: 'Телеграмм пуст!', success: false});
    }
    else if(!address || address === '0'){
        return res.json({message: 'Адрес пуст!', success: false});
    }
    else if(!token){
        return res.json({message: 'Вы не авторизованы пуст!', success: false});
    }
    else if(!req.file){
        return res.json({message: 'Документ пуст!', success: false});
    }
    else{
        sql_query("SELECT * FROM users WHERE id = ?", user_id, (resp)=>{
            if(resp[0]){
                name = resp[0].firstname
                const tempPath = req.file.path;
                const targetPath = path.join(__dirname, "../dist/img/files/" + String(Math.round(Math.random() * 9999999)) + path.extname(req.file.originalname).toLowerCase());
                fs.rename(tempPath, targetPath, err => {
                    console.log(err);
                });
                fs.copyFile(targetPath, path.join(__dirname, "../public/img/files/" + targetPath.split('/img/files/')[1]), (err) => {
                    console.log(err);
                });

                sql_query("INSERT INTO orders VALUES(null, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
                    type,
                    date_str + ' ' + time,
                    null,
                    cost,
                    count,
                    targetPath,
                    name + ' ' + tel,
                    tg,
                    'На рассмотрении',
                    user_id,
                    address
                ], (resp)=>{
                    if(resp.insertId){
                        return res.json({success: true});
                    }
                    return res.json({success: false});
                });
            }
            else{
                return res.json({error: 'Session in invalid'});
            }
        });


    }
});

app.get("/api/order/:id", function(req, res){
    let id = req.params.id;
    let orders = sql_query("SELECT * FROM orders WHERE user_id = ?", Number(id), (resp)=>{
        return res.json({'orders': resp});
    });
});
app.get("/api/order", function(req, res){
    let orders = sql_query("SELECT * FROM orders", [], (resp)=>{
        return res.json({'orders': resp});
    });
});
app.put("/api/order/:id", function(req, res){
    let id = req.params.id;
    let orders = sql_query("UPDATE orders SET status = ?, date_end = ? WHERE id = ?", ['В процессе', req.body.date + ' 3:00:00', id], (resp)=>{
        return res.json({'success': true});
    });
});
app.delete("/api/order/:id", function(req, res){
    let id = req.params.id;
    let orders = sql_query("UPDATE orders SET status = ? WHERE id = ?", ['Отклонено', id], (resp)=>{
        return res.json({'success': true});
    });
});
app.patch("/api/order/:id", function(req, res){
    let id = req.params.id;
    let orders = sql_query("UPDATE orders SET status = ? WHERE id = ?", ['Выполнено', id], (resp)=>{
        return res.json({'success': true});
    });
});


app.get('/login', (req, res) => {
    res.sendFile('index.html', {root: __dirname + '/../dist'});
});

app.get('/order', (req, res) => {
    res.sendFile('index.html', {root: __dirname + '/../dist'});
});

app.get('/admin', (req, res) => {
    res.sendFile('index.html', {root: __dirname + '/../dist'});
});

app.get('/register', (req, res) => {
    res.sendFile('index.html', {root: __dirname + '/../dist'});
});

app.get('/profile', (req, res) => {
    res.sendFile('index.html', {root: __dirname + '/../dist'});
});


app.get('/*', (req, res) => {
    fs.exists(__dirname + '/../dist' + req.url, (e) => {
        if(e){
            res.sendFile(req.url, {root: __dirname + '/../dist'});
        }
        else{
            res.send('404');
        }
    });
});


// Listen App
app.listen(80);
