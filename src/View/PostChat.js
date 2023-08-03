const GetChat = require("./GetChat");

const PostChat = (req, res, io, mysql) => {
    mysql.con.query(`SELECT * FROM msg;`,
        (err, msg, fields) => {
            if (msg.length > 0) {
                io.emit('msg', msg);
            }
        })

    if (req.body.name !== undefined) {
        mysql.con.query(`INSERT INTO chat (name, surname, idUser, keyChat, status, date, msgEnd, visualized, sentBy) VALUES(?,?,?,?,?,?,?,?,?)`, [
            req.body.name,
            req.body.surname,
            req.body.idUser,
            req.body.keyChat,
            req.body.status,
            req.body.date,
            req.body.msgEnd,
            req.body.visualized,
            req.body.sentBy
        ], (err, rows) => {
            if (err === null) {
                console.log({ message: 'Card criado com sucesso!' });
                mysql.con.query(`INSERT INTO msg (msg, files, dateHour, admin, keyChat, idUser) VALUES(?,?,?,?,?,?)`, [
                    req.body.msg.msg,
                    req.body.msg.files,
                    req.body.msg.dateHour,
                    req.body.msg.admin,
                    req.body.msg.keyChat,
                    req.body.msg.idUser,
                ], (err, rows) => {
                    if (err === null) {
                        console.log({ message: 'Mensagens criado com sucesso!' });

                        mysql.con.query(`SELECT * FROM msg;`,
                            (err, msg, fields) => {
                                if (msg.length > 0) {
                                    io.emit('msg', msg);
                                }
                            })
                        res.json({ auth: true, rows: rows, message: "Mensagens criado com sucesso!" });
                    } else {
                        console.log({ message: 'Erro ao criar Mensagens!' });
                        // console.log(err)
                        res.send({ auth: false, rows: err, message: "Erro ao criar Mensagens!" });
                    }
                })
            } else {
                console.log({ message: 'Erro ao enviar mensagem, entra em contato com administrador' });
                // console.log(err)
                res.status(200).json({ auth: false, rows: err, message: 'Erro ao enviar mensagem, entra em contato com administrador' });
            };
        })
    } else {
        mysql.con.query(`INSERT INTO msg (msg, files, dateHour, admin, keyChat, idUser) VALUES(?,?,?,?,?,?)`, [
            req.body.msg,
            req.body.files,
            req.body.dateHour,
            req.body.admin,
            req.body.keyChat,
            req.body.idUser
        ], (err, rows) => {
            if (err === null) {
                mysql.con.query(`UPDATE chat SET visualized=?, msgEnd=?, sentBy=? WHERE id=?;`, [
                    req.body.visualized,
                    req.body.msgEnd,
                    req.body.sentBy,
                    req.body.id
                ], (err, rows) => {
                    if (err === null) {
                        GetChat(io, mysql);
                        console.log({ message: 'Mensagem final registrada com sucesso!' });
                        // console.log(rows)
                    } else {
                        console.log({ message: 'Erro ao registrar mensagem final!' });
                        // console.log(err)
                    }
                })

                mysql.con.query(`SELECT * FROM msg;`,
                    (err, msg, fields) => {
                        if (msg.length > 0) {
                            io.emit('msg', msg);
                        }
                    })

                console.log({ message: 'Resposta enviado com sucesso!' });
                res.json({ auth: true, rows: rows, message: "Resposta enviado com sucesso!" });
            } else {
                console.log({ message: 'Erro ao responder, entra em contato com administrador' });
                // console.log(err)
                res.status(200).json({ auth: false, rows: err, message: 'Erro ao responder, entra em contato com administrador' });
            };
        })
    }
}
module.exports = PostChat;