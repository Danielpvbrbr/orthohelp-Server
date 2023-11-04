const mysql = require('../../connection');
const GetChat = require("./GetChat");

const FinishedChat = (req, res, io) => {

    mysql.con.query(`UPDATE chat SET status=? WHERE id=?`, [
        req.body.status,
        req.body.id
    ], (err, rows) => {
        if (err === null) {
            GetChat(io);
            console.log({ message: 'Chat finalizadocom sucesso!' });
            res.json({ auth: true, rows: rows, message: "Chat finalizadocom sucesso!" });
        } else {
            console.log({ message: 'Erro ao registrar mensagem final!' });
            res.json({ auth: false, rows: err, message: "Chat finalizadocom sucesso!" });
            // console.log(err);
        }
    })
};
module.exports = FinishedChat;