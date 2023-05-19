import { Amplify, Auth, Hub, API } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import "@aws-amplify/ui-react/styles.css";
import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
Amplify.configure(awsconfig);
import Login from './src/pages/Login'
import HomePage from './src/pages/HomePage'
import NewPost from './src/pages/NewPost'
import MyPosts from './src/pages/MyPosts';
import Blog from './src/pages/Blog';
import Pricing from './src/pages/Pricing';
import Shop from './src/pages/Shop';
import Cart from './src/pages/Cart';
import Transactions from './src/pages/Transactions';
import PaymentSuccess from './src/pages/PaymentSuccess';
import { CartProvider } from 'react-use-cart';
import { Helmet } from 'react-helmet';
import Subscription from './src/pages/Subscription';
import MySubscription from './src/pages/MySubscription';
import Insiders from './src/pages/Insiders';
const stripe = require('stripe')('sk_test_51HmobNIOs4Bwoex9erX63uEPKdwylY7a5f8zxvmskceNETVfJMaDzygagiugpV5xocQFVVjJEvHhslTdlHdExUs500dSOPhSrx');


function App(){
  const [name, setName] = useState()
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [subscriptionActive, setSubscriptionActive] = useState(false)
  const [errorSubStatus , setErrorSubStatus] = useState(false)
  const [customerId , setCustomerId] = useState()
  

  Auth.currentAuthenticatedUser().then((u)=>{
    setName(u.attributes.name)
    setUsername(u.username)
    setEmail(u.attributes.email)

    API.post("myAPI", "/get-subscription-status", {
      body: {
        username: u.username
      }
    }).then((r) => {
      if(r.length != 0) {
        setCustomerId(r[0].stringifiedItems)
        const subscriptions = stripe.subscriptions.list({
          customer: r[0].stringifiedItems
        });

        subscriptions.then((r) => {
            setSubscriptionActive(r.data[0].plan.active)
        })
      }
    }).catch(e => setErrorSubStatus(true))

  }).catch(e => console.log(e))
  

  Hub.listen('auth', ({ payload }) => {
    const { event } = payload;
    if (event === 'cognitoHostedUI' || event === 'autoSignIn') {
      let username = payload.data.username.replace(/[-]/g, '')
      API.post("myAPI", "/create-transaction-table", {
        body: {
          username: username
        }
      }).then(r => console.log(r))
    }
  })
  
return(
  <CartProvider>
    <Helmet>
      <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
    </Helmet>
  <Router>
  <Routes>
      <Route path = "/login" element = {<Login/>}/>
      <Route path = "/subscription" element = {<Subscription error = {errorSubStatus} subscriptionActive = {subscriptionActive} email = {email} username = {username} name = {name}/>}/>
      <Route path = "/my-subscription" element = {<MySubscription customerId = {customerId} error = {errorSubStatus} subscriptionActive = {subscriptionActive} email = {email} username = {username} name = {name}/>}/>
      <Route path = "/new-post" element = {<NewPost error = {errorSubStatus} subscriptionActive = {subscriptionActive} username = {username} name = {name}/>}/>
      <Route path = "/my-posts" element = {<MyPosts error = {errorSubStatus} subscriptionActive = {subscriptionActive} name = {name}/>}/>
      <Route path = "/my-transactions" element = {<Transactions error = {errorSubStatus} subscriptionActive = {subscriptionActive} name = {name}/>}/>
      <Route path = "/blog" element = {<Blog error = {errorSubStatus} subscriptionActive = {subscriptionActive} name = {name}/>}/>
      <Route path = "/cart" element = {<Cart error = {errorSubStatus} subscriptionActive = {subscriptionActive} name = {name} email = {email}/>}/>
      <Route path = "/pricing" element = {<Pricing error = {errorSubStatus} subscriptionActive = {subscriptionActive} name = {name}/>}/>
      <Route path = "/payment-success" element = {<PaymentSuccess error = {errorSubStatus} subscriptionActive = {subscriptionActive} name = {name}/>}/>
      <Route path = "/shop" element = {<Shop error = {errorSubStatus} subscriptionActive = {subscriptionActive} name = {name} email = {email}/>}/>
      <Route path = "/insiders" element = {<Insiders customerId = {customerId} error = {errorSubStatus} subscriptionActive = {subscriptionActive} name = {name}/>}/>
      <Route path = "/" element = {<HomePage error = {errorSubStatus} subscriptionActive = {subscriptionActive} name = {name}/>}/>
  </Routes>
  </Router>
  </CartProvider>
)
}



export default App;