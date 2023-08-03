const GetUsers = require("./GetUsers");

const DeleteUsers = (req, res, io, mysql) => {

    mysql.con.query(`DELETE FROM users WHERE id=?;`, [
        req.body.id,
    ], (err, rows) => {
        if (err === null) {
            // console.log(rows);
            GetUsers(io, mysql);
            res.json({ auth: true, rows: rows, message: "Usuário Reprovado com sucesso!" });
            console.log("User aprovado com sucesso!")
        } else {
            // console.log(err)
            res.json({ auth: true, rows: rows, message: "Erro ao reprovar Usuário!!" });
            console.log("Erro ao reprovar Usuário!!")
        }
    })
};

module.exports = DeleteUsers;