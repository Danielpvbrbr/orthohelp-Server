const mysql = require('../../connection');

const GetVideos = (socket) => {
    mysql.con.query(`SELECT * FROM videos;`,
        (err, users, fields) => {
            if (users.length > 0) {
                socket.emit('videos', {
                    response: users,
                    message: `Success`,
                    error: err,
                });
            } else {
                socket.emit('videos', {
                    response: [],
                    message: 'Err',
                    error: err,
                });
            }
        })
};

module.exports = GetVideos;