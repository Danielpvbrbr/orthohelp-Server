const GetUsers = (socket, mysql) => {
    mysql.con.query(`SELECT * FROM users;`,
        (err, users, fields) => {
            if (users.length > 0) {
                socket.emit('users', {
                    response: users,
                    message: `Success`,
                    error: err,
                });
            } else {
                socket.emit('users', {
                    response: [],
                    message: 'Err',
                    error: err,
                });
            }
        })
};

module.exports = GetUsers;