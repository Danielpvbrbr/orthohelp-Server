
const mysql = require('../../connection');

const GetMsgId = (data, socket) => {
    const keyChat = data.keyChat 
    const idUser = data.idUser 

    mysql.con.query(`SELECT * FROM msg WHERE keyChat = ? AND idUser = ? ;`, [
        keyChat,
        idUser
    ], (err, msg, fields) => {
        if (msg.length > 0) {
            socket.emit('msg', msg);
        }
    })
};
module.exports = GetMsgId;