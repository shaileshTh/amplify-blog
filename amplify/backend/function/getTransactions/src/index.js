let mysql = require('mysql')
let pool = mysql.createPool({
    host     : 'database-1.chpdtpoawlg2.us-east-1.rds.amazonaws.com',
    user     : 'admin',
    password : 'aaaaaaaa',
    database : 'Transactions_DB',
});


exports.handler = async (event) => {
    const data =  JSON.parse(event.body)
    let table = "t_" + data.username.replace(/[-]/g, '')
    let query = "SELECT * FROM " + table
    let response;
    await new Promise(function (resolve, reject) {
        
        pool.query(query, function (err, result){
            if(err) reject(Error(err))
            response = result;
            resolve(response)
        })
        
      });
  
    return {
        headers: {
            "Access-Control-Allow-Origin": "*"
          },
        statusCode: 200,
        body: JSON.stringify(response),
    };
};
