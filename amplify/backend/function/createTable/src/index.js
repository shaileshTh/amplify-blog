
var mysql = require('mysql');

exports.handler = (event) => {
    var connection = mysql.createConnection({
        host     : process.env['host'],
        user     : process.env['user'],
        password : process.env['password'],
        database : process.env['database'],
    });

    const data =  JSON.parse(event.body)
    let username = "t_" + data.username
    
    //create table named by email
    let concatQuery = 'CREATE TABLE IF NOT EXISTS ' + username
    let createQuery = mysql
    .format(concatQuery + ' (pId VARCHAR(255) PRIMARY KEY, amountInCents INT, stringifiedItems TEXT, timestamp VARCHAR(255))'
    , [username])
    connection.connect(function(err, callback){
        connection.query(createQuery, function (err, callback){
            connection.end();
        })
    });


    return {
        statusCode: 200,
        body: JSON.stringify('query done'),
    };
};
