const GetChat = require("./GetChat");

const DeleteChat = (req, res, io, mysql) => {

    mysql.con.query(`DELETE FROM chat WHERE id=?;`, [
        req.body.id
    ], (err, chat, fields) => {
        if (err === null) {
            GetChat(io, mysql);
            mysql.con.query(`DELETE FROM msg WHERE keyChat=?;`, [
                req.body.keyChat
            ], (err, msg, fields) => {
                if (err === null) {
                    GetChat(io, mysql);
                    res.status(200).json({ auth: true, rows: msg, message: 'Msg deletado com sucesso' });
                } else {
                    console.log("Erro ao deletar o Chat")
                    res.status(200).json({ auth: false, rows: err, message: 'Erro ao deletar o Msg' });
                }
            })
        } else {
            console.log("Erro ao deletar o Chat")
            res.status(200).json({ auth: false, rows: err, message: 'Erro ao deletar o Chat' });
        }
    })
};

module.exports = DeleteChat;