
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'database-1.chpdtpoawlg2.us-east-1.rds.amazonaws.com',
    user     : 'admin',
    password : 'aaaaaaaa',
    database : 'Transactions_DB',
});

exports.handler = (event) => {
    // console.log(`EVENT: ${JSON.stringify(event)}`);
    connection.connect();

    const data =  JSON.parse(event.body)
    let username = data.username.replace(/[-]/g, '')

      
    //create table named by email
    let concatQuery = 'CREATE TABLE IF NOT EXISTS ' + username
    let createQuery = mysql
    .format(concatQuery + ' (pId VARCHAR(255) PRIMARY KEY, amountInCents INT, stringifiedItems TEXT, timestamp VARCHAR(255))'
    , [username])
    connection.query(createQuery, function (err, results){
        if(err) throw err
    })

    connection.end();

    return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  }, 
        body: JSON.stringify('query done'),
    };
};
