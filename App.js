import { Amplify, Auth, Hub, API } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import "@aws-amplify/ui-react/styles.css";
import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
Amplify.configure(awsconfig);
import Login from './src/components/Login'
import HomePage from './src/components/HomePage'
import NewPost from './src/components/NewPost'
import MyPosts from './src/components/MyPosts';
import Blog from './src/components/Blog';
import Pricing from './src/components/Pricing';
import Shop from './src/components/Shop';
import Cart from './src/components/Cart';
import Transactions from './src/components/Transactions';
import PaymentSuccess from './src/components/PaymentSuccess';
import { CartProvider } from 'react-use-cart';
import { Helmet } from 'react-helmet';
import Subscription from './src/components/Subscription';
import MySubscription from './src/components/MySubscription';


function App(){
  const [name, setName] = useState()
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [stripeCustomerId, setStripeCustomerId] = useState()
  
  Auth.currentAuthenticatedUser().then((u)=>{
    setName(u.attributes.name)
    setUsername(u.username)
    setEmail(u.attributes.email)
    API.post("myAPI", "/get-subscription-status", {
      body: {
        username: u.username
      }
    }).then((r) => {
      if(r.length != 0) setStripeCustomerId(r[0].stringifiedItems)
    })
  })
  .catch(e => console.log(e))

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
      <Route path = "/subscription" element = {<Subscription customerId = {stripeCustomerId} email = {email} username = {username} name = {name}/>}/>
      <Route path = "/my-subscription" element = {<MySubscription customerId = {stripeCustomerId} email = {email} username = {username} name = {name}/>}/>
      <Route path = "/new-post" element = {<NewPost customerId = {stripeCustomerId} username = {username} name = {name}/>}/>
      <Route path = "/my-posts" element = {<MyPosts customerId = {stripeCustomerId} name = {name}/>}/>
      <Route path = "/my-transactions" element = {<Transactions customerId = {stripeCustomerId} name = {name}/>}/>
      <Route path = "/blog" element = {<Blog customerId = {stripeCustomerId} name = {name}/>}/>
      <Route path = "/cart" element = {<Cart customerId = {stripeCustomerId} name = {name} email = {email}/>}/>
      <Route path = "/pricing" element = {<Pricing customerId = {stripeCustomerId} name = {name}/>}/>
      <Route path = "/payment-success" element = {<PaymentSuccess customerId = {stripeCustomerId} name = {name}/>}/>
      <Route path = "/shop" element = {<Shop customerId = {stripeCustomerId} name = {name}/>}/>
      <Route path = "/" element = {<HomePage customerId = {stripeCustomerId} name = {name}/>}/>
  </Routes>
  </Router>
  </CartProvider>
)
}



export default App;