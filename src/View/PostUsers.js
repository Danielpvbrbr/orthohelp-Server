const GetUsers = require("./GetUsers");

const PostUsers = (req, res, io, mysql) => {
    mysql.con.query(`UPDATE users SET status=?, name=?, surname=?, email=? WHERE id=?;`, [
        req.body.status,
        req.body.name,
        req.body.surname,
        req.body.email,
        req.body.id,
    ], (err, rows) => {
        if (err === null) {
            // console.log(rows);
            GetUsers(io, mysql);
            res.json({ auth: true, rows: rows, message: "Usuário aprovado com sucesso!" });
            console.log("Usuário aprovado com sucesso!")
        } else {
            // console.log(err)
            res.json({ auth: true, rows: rows, message: "Erro ao aprovado usuário!" });
            console.log("Erro ao aprovado usuário!!")
        }
    })
};

module.exports = PostUsers;