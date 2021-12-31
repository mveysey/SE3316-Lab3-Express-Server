const mysql = require('mysql');

function newConnection(){
    let conn = mysql.createConnection({
        host:'34.133.59.111',
        user:'root',
        password:'12sql34',
        database:'doodleDB'
    });

    return conn;
}

module.exports = newConnection;