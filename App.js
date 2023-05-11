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


function App(){
  const [name, setName] = useState()
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  Auth.currentAuthenticatedUser().then((u)=>{
    setName(u.attributes.name)
    setUsername(u.username)
    setEmail(u.attributes.email)
  })
  .catch(e => console.log(e))

  Hub.listen('auth', ({ payload }) => {
    const { event } = payload;
    if (event === 'autoSignIn' || event === 'cognitoHostedUI') {
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
      <Route path = "/subscription" element = {<Subscription email = {email} username = {username} name = {name}/>}/>
      <Route path = "/new-post" element = {<NewPost username = {username} name = {name}/>}/>
      <Route path = "/my-posts" element = {<MyPosts name = {name}/>}/>
      <Route path = "/my-transactions" element = {<Transactions name = {name}/>}/>
      <Route path = "/blog" element = {<Blog name = {name}/>}/>
      <Route path = "/cart" element = {<Cart name = {name} email = {email}/>}/>
      <Route path = "/pricing" element = {<Pricing name = {name}/>}/>
      <Route path = "/payment-success" element = {<PaymentSuccess name = {name}/>}/>
      <Route path = "/shop" element = {<Shop name = {name}/>}/>
      <Route path = "/" element = {<HomePage name = {name}/>}/>
  </Routes>
  </Router>
  </CartProvider>
)
}



export default App;