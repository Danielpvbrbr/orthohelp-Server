
const mysql = require('../../connection');

const GetMsg = (socket) => {
    mysql.con.query(`SELECT * FROM msg ;`,
        (err, msg, fields) => {
            if (msg.length > 0) {
                socket.emit('msg', msg);
            }
        })
};
module.exports = GetMsg;