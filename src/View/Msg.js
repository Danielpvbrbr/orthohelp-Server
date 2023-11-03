
const Msg = (socket, mysql) => {
    mysql.con.query(`SELECT * FROM msg ;`,
        (err, msg, fields) => {
            if (msg.length > 0) {
                socket.emit('msg', msg);
            }
        })
};
module.exports = Msg;