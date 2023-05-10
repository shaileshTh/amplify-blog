let mysql = require('mysql')
let pool = mysql.createPool({
    host     : process.env['host'],
    user     : process.env['user'],
    password : process.env['password'],
    database : process.env['database'],
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
