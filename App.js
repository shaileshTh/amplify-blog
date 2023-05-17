import { Amplify, Auth, Hub, API } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import "@aws-amplify/ui-react/styles.css";
import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
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
      else setStripeCustomerId("not found")
    }).catch(e => setStripeCustomerId("Error"))
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
      <Route path = "/insiders" element = {<Insiders customerId = {stripeCustomerId} name = {name}/>}/>
      <Route path = "/" element = {<HomePage customerId = {stripeCustomerId} name = {name}/>}/>
  </Routes>
  </Router>
  </CartProvider>
)
}



export default App;