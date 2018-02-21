var mysql = require('mysql');

var pool = mysql.createPool({
	// host:'10.51.38.101',
	host: 'localhost',
	user:'root',
	password:'123456',//p@ssw0rd
	database:'photolist'//analysis
});

function query(sql,callback){
    pool.getConnection(function(err,connection){
        connection.query(sql, function (err,rows) {
            callback(err,rows);
            connection.release();
        });
    });
}

exports.query = query;
