const mysql = require('../../connection');
const GetChat = require("./GetChat");

const Visualized = (req, res, io) => {
    mysql.con.query(`UPDATE chat SET visualized=? WHERE id=?;`, [
        req.body.visualized,
        req.body.id
    ],
        (err, rows, fields) => {
            if (rows.length > 0) {
                GetChat(io);
                res.send({ auth: true, rows: rows, message: "Mensagens Visualized!" });
                console.log("Mensagens Visualized!")
            } else {
                res.send({ auth: false, rows: err, message: "erro ao Visualized Mensagens !" });
                console.log("erro ao Visualized Mensagens !")
                // console.log(err)
            }
        })
}
module.exports = Visualized;