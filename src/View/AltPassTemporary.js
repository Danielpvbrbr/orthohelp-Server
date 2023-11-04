const mysql = require('../../connection');
const GetChat = require("./GetChat");

const AltPassTemporary = (req, res, io) => {

    mysql.con.query(`UPDATE users SET password=? WHERE id=?`, [
        req.body.password,
        req.body.id
    ], (err, rows) => {
        if (err === null) {
            GetChat(io);
            console.log({ message: 'Senha alterada com sucesso!' });
            res.json({ auth: true, rows: rows, message: "Senha alterada sucesso!" });
        } else {
            console.log({ message: 'Erro ao alterar senha!' });
            res.json({ auth: false, rows: err, message: "Erro ao alterar senha!!" });
            // console.log(err);
        }
    })
};
module.exports = AltPassTemporary;