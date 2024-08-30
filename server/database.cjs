const mysql = require("mysql");
const dbConfig = require("./db.config.cjs");

// создаем соединение с нашей базой данных
const connection = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
});

connection.connect(err => {
    if (err) throw err;
    console.log("MySQL connected successfully");
});

module.exports = connection;