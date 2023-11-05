const mysql = require('mysql2');
const con = mysql.createConnection({
    host: "189.126.111.161",
    port: 3306,
    user: "orthohelp",
    password: "Orthohelp@Orthohelp2023",
    database: "orthohelp"
});

// const con = mysql.createConnection({
//     host: "localhost",
//     port: 3306,
//     user: "root",
//     password: "1801",
//     database: "orthohelp_prod"
// });

// const con = mysql.createConnection({
//     host: "mysql32-farm10.kinghost.net",
//     port: 3306,
//     user: "orthohelp_add1",
//     password: "dev1801",
//     database: "orthohelp"
// });

module.exports.con = con;