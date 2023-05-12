
var mysql = require('mysql');

exports.handler = async (event) => {
    var pool = mysql.createConnection({
        host     : process.env['host'],
        user     : process.env['user'],
        password : process.env['password'],
        database : process.env['database'],
    });

    const data =  JSON.parse(event.body)
    let username = "t_" + data.username
    let response;
    //create table named by username
    await new Promise(function (resolve, reject) {
        let concatQuery = 'CREATE TABLE IF NOT EXISTS ' + username
        let createQuery = mysql
        .format(concatQuery + ' (pId VARCHAR(255) PRIMARY KEY, amountInCents INT, stringifiedItems TEXT, timestamp VARCHAR(255), isSubscription BOOLEAN)'
        , [username])
        pool.query(createQuery, function (err, result){
            if(err) reject(Error(err))
            response = result;
            resolve(response)
        })
    });


    return {
        statusCode: 200,
        body: JSON.stringify(response),
    };
};
