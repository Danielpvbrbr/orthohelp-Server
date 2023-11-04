const mysql = require('../../connection');
const GetVideos = require("./GetVideos");

const DeleteVideo = (req, res, io) => {

    mysql.con.query(`DELETE FROM videos WHERE id=?;`, [
        req.body.id,
    ], (err, rows) => {
        if (err === null) {
            // console.log(rows);
            GetVideos(io);
            res.json({ auth: true, rows: rows, message: "Video deletado com sucesso!" });
            console.log("User aprovado com sucesso!")
        } else {
            // console.log(err)
            res.json({ auth: true, rows: rows, message: "Erro ao deleta!!" });
            console.log("Erro ao reprovar Usuário!!")
        }
    })
};

module.exports = DeleteVideo;