import { Amplify, Auth, API } from 'aws-amplify';
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


function App(){
  const [name, setName] = useState()
  const [username, setUsername] = useState()
  Auth.currentAuthenticatedUser().then((u)=>{
    setName(u.attributes.name)
    setUsername(u.attributes.sub)
  })
  .catch(e => console.log(e))
let n = 0;
// useEffect(()=>{
//   // get('myAPI', '/users').then(res=>console.log(res)).catch(e=>console.log(e))
//   API.get('myAPI', '/posts').then((res)=>{
//     console.log(res)
//     n = res.length
//   }).catch(e=>console.log(e))
 
//   })
  
return(
  <Router>
  <Routes>
      <Route path = "/login" element = {<Login/>}/>
      <Route path = "/new-post" element = {<NewPost username = {username} name = {name}/>}/>
      <Route path = "/my-posts" element = {<MyPosts name = {name}/>}/>
      <Route path = "/blog" element = {<Blog name = {name}/>}/>
      <Route path = "/" element = {<HomePage name = {name}/>}/>
  </Routes>
  </Router>
)
}



export default App;