const mysql = require('../../connection');

const GetChat = (socket) => {
    mysql.con.query(`SELECT * FROM chat;`,
        (err, chat, fields) => {
            if (chat.length > 0) {
                socket.emit('chat', {
                    response: chat,
                    message: `Success`,
                    error: err,
                });
            } else {
                socket.emit('chat', {
                    response: [],
                    message: 'Err',
                    error: err,
                });
            }
        })
};

module.exports = GetChat;