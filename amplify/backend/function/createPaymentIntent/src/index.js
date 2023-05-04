
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const stripe = require("stripe")('sk_test_51HmobNIOs4Bwoex9erX63uEPKdwylY7a5f8zxvmskceNETVfJMaDzygagiugpV5xocQFVVjJEvHhslTdlHdExUs500dSOPhSrx');

exports.handler = async (event) => {
    let total = 0;
    const data =  JSON.parse(event.body)
    data.items.map(item => {
        total = total + item.itemTotal
    });
    
    const paymentIntent = await stripe.paymentIntents.create({
        amount: parseFloat(total.toFixed(2)) * 100,
        currency: "usd",
        receipt_email: data.email,
        metadata: {
            username: data.username,
            items: JSON.stringify(data.items)
        }
    })

    return {
        headers: {
            "Access-Control-Allow-Origin": "*"
          },
        statusCode: 200,

        body: JSON.stringify({
            'clientSecret' : paymentIntent.client_secret
        })
        
    };
};
