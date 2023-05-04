const stripe = require("stripe")('sk_test_51HmobNIOs4Bwoex9erX63uEPKdwylY7a5f8zxvmskceNETVfJMaDzygagiugpV5xocQFVVjJEvHhslTdlHdExUs500dSOPhSrx');
var mysql = require('mysql');

 exports.handler = (event) => {

    var connection = mysql.createConnection({
        host     : 'database-1.chpdtpoawlg2.us-east-1.rds.amazonaws.com',
        user     : 'admin',
        password : 'aaaaaaaa',
        database : 'Transactions_DB',
      });
      

    const webhookSecret = 'whsec_49sIWAgH3IZpfc4Nl4Yiu8RG3n0ZdKdr'
    const sig = event?.headers['Stripe-Signature'];
    const stripeEvent = stripe.webhooks.constructEvent(event.body, sig, webhookSecret);
    
      let username = "t_" + stripeEvent.data.object.metadata.username.replace(/[-]/g, '')
      let id = stripeEvent.data.object.id
      let amount = stripeEvent.data.object.amount_received
      let items = stripeEvent.data.object.metadata.items
      let timestamp = new Date().toString()    
  
    //insert inserting transaction details
    let concatQuery = 'INSERT INTO ' + username
    let query = mysql.format(concatQuery + ' (pId, amountInCents, stringifiedItems, timestamp) VALUES (?, ?, ?, ?);'
    , [id, amount, items, timestamp])
    connection.connect(function(err, callback){
        connection.query(query, function (err, callback){
            connection.end()
        })
    })
   

        const data = {
          statusCode: 200,
          body: JSON.stringify('insert queries done'),
        };
        return data;
}