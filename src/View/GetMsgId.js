
const mysql = require('../../connection');

const GetMsgId = (socket) => {
    mysql.con.query(`SELECT * FROM msg WHERE  ;`,
        (err, msg, fields) => {
            if (msg.length > 0) {
                socket.emit('msg', msg);
            }
        })
};
module.exports = GetMsgId;