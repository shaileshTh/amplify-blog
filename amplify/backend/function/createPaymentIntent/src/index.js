const stripe = require("stripe")(process.env['stripe_sk_test']);

exports.handler = async (event) => {

    let total = 0;
    const data =  JSON.parse(event.body)
    data.items.map(item => {
        total = total + item.itemTotal
    });
    
    const paymentIntent = await stripe.paymentIntents.create({
        amount: parseFloat((total*100).toFixed(2)),
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
