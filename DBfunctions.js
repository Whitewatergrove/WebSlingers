let mysql = require('mysql');

let con = mysql.createConnection({
    host: "83.255.197.121",
    user: "joakim",
    password: "jockele",
    port: "3306",
    database: "webslingers"
});

module.exports = {
    get_users: function(req, res, callback) {   
        con.query('SELECT * FROM users', function(err, results) {
            if (err) {
                callback(err, null);
            }
            else {
                let temp = '';
                for(let i in results) {
                    temp += (results[i].ID + results[i].Password + results[i].Role);
                }
                //skickar objektens innehåll
                //callback(null, temp);

                //skickar hela objektet
                callback(null, results);
            }
        })
    },
};

