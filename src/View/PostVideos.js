const GetVideos = require("./GetVideos");

const PostVideos = (req, res, io, mysql) => {

    if (req.body.id === undefined) {
        mysql.con.query(`INSERT INTO videos (title, description, video, date) VALUES  (?,?,?,?);`, [
            req.body.title,
            req.body.description,
            req.body.video,
            req.body.date
        ], (err, rows) => {
            if (err === null) {
                // console.log(rows);
                GetVideos(io, mysql);
                res.json({ auth: true, rows: rows, message: "Upload realizado com sucesso!" });
                console.log("Upload realizado com sucesso!")
            } else {
                // console.log(err)
                res.json({ auth: true, rows: rows, message: "Erro ao realizar o upload!" });
                console.log("Erro ao realizar o upload!")
            }
        })
    } else {
        mysql.con.query(`UPDATE videos SET title=?, description=?, video=? WHERE id=?;`, [
            req.body.title,
            req.body.description,
            req.body.video,
            req.body.id
        ], (err, rows) => {
            if (err === null) {
                // console.log(rows);
                GetVideos(io, mysql);
                res.json({ auth: true, rows: rows, message: "Alteração realizado com sucesso!" });
                console.log("Alteração realizado com sucesso!")
            } else {
                console.log(err)
                res.json({ auth: true, rows: rows, message: "Erro ao realizar Alteração!" });
                console.log("Erro ao realizar Alteração!")
            }
        })
    }

};

module.exports = PostVideos;