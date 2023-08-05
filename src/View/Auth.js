const GetUsers = require("./GetUsers");
const auth = (req, res, io, mysql) => {
    if (req.body.name === undefined) {
        mysql.con.query(`SELECT * FROM users WHERE email=?;`, [
            req.body.email
        ], (err, rows, fields) => {
            if (rows.length > 0) {
                GetUsers(io, mysql);
                console.log({ message: "E-mail localizado com sucesso!" })
                return res.json({ auth: true, rows: rows[0], message: "E-mail localizado com sucesso!" });
            } else {
                res.status(200).json({ auth: false, rows: err, message: 'Usuário e/ou senha inválido(s)' });
                console.log({ message: 'Usuário e/ou senha inválido(s)' });
            };
        });
    } else {
        mysql.con.query(`SELECT * FROM users WHERE email=?;`, [req.body.email], (err, rows, fields) => {
            if (rows.length > 0) {
                GetUsers(io, mysql);
                console.log({ message: 'Ops: E-mail ja cadastrado!' });
                return res.json({ auth: false, rows: rows, message: "Ops: E-mail ja cadastrado!" });
            } else {
                mysql.con.query(`INSERT INTO users (name, surname, phone, email, status, idUser, admin, date, password) VALUES(?,?,?,?,?,?,?,?,?);`, [
                    req.body.name,
                    req.body.surname,
                    req.body.phone,
                    req.body.email,
                    req.body.status,
                    req.body.idUser,
                    req.body.admin,
                    req.body.date,
                    req.body.password
                ], (err, rows, fields) => {
                    if (err === null) {
                        GetUsers(io, mysql);
                        console.log({ message: 'Cadastro realizado com sucesso!' });
                        return res.json({ auth: true, rows: rows, message: "Cadastro realizado com sucesso!" });
                    } else {
                        res.status(200).json({ auth: false, rows: err, message: 'Erro ao Salvar dados, entra em contato com administrador' });
                        console.log({ message: 'Erro ao Salvar dados, entra em contato com administrador' });
                    
                    };
                });
            };
        })
    }
};

module.exports = auth;