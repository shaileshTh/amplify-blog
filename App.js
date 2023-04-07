import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, Platform, Button } from 'react-native';
import { Amplify, Auth, Hub } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsconfig from './src/aws-exports';
Amplify.configure(awsconfig);
import { DataStore } from '@aws-amplify/datastore';
import { Users, Posts } from './src/models';
import {  BrowserRouter as Router,
  Routes,
  Route,
  Link, 
  useNavigate} from 'react-router-dom'
import { TextInput } from 'react-native-web';

async function newUsers(id, name, email){
  await DataStore.save(
    new Users({
    "username" : id,
		"name": name,
		"email": email,
		"Posts": []
	})
);
}

Hub.listen('auth', ({ payload }) => {
  const { event } = payload;
  if (event === 'autoSignIn') {
    const user = payload.data;
    console.log("JUST SIGNED UP")
    console.log(user)
    newUsers(user.username, user.attributes.name, user.attributes.email).then(res => console.log(res))
  }
})

async function signOut() {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log('error signing out: ', error);
  }
}

async function findUsersId(username){
  let user = await DataStore.query(Users, (c) => c.username.eq(username));
  return user[0].id
}
async function findPosts(id){
  let res = await DataStore.query(Posts, (c) => c.usersID.eq(id));
  res.reverse()
  if(res) return res
}

async function createPost(title, description, usersID){
  let id
  await DataStore.save(
    new Posts({
      title: title,
      description: description,
      usersID: usersID,
    })
  ).then((r)=>{
    id = r.id
  })
  return id
}

function App() {
  const [name, setName] = useState()
  const [username, setUsername] = useState()
  const [usersID, setUsersID] = useState()
  const [posts, setPosts] = useState([])
  let done = false

 
  useEffect(()=>{
    Auth.currentAuthenticatedUser()
    .then((user) => {
        setName(user.attributes.name)
        setUsername(user.username)
    })
    .catch((err) => console.log(err))
  
    if(username) {
      findUsersId(username).then((u) => {
        setUsersID(u)
      })
    }
    usersID && findPosts(usersID).then((res) => {
      setPosts(res)
      done = true
    })
  }, [done, name, username, usersID])

  return (
    <Router>
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Blog</Text>
        <div style = {{margin: '-15px 10% 10px 10%'}}>
            <Link style = {styles.link} onClick={signOut} >Sign Out</Link>
            <Link style = {styles.link} to = "/new-post">New Post</Link>
            <Link style = {styles.link} to = "/">Home</Link>
        </div>
      </View>

      <Routes>
        <Route path = "/new-post" element = {<NewPost/>}/>
        <Route path = "/" element = {<HomePage/>}/>
      </Routes>
    </View>
    </Router>
  );

  function HomePage(){
    return(<>
      {name ? 
        <>{posts.length == 0 ? <h2>No Posts by {name}</h2> 
        : <h2>{name}'s {posts.length} Post(s):</h2>}</>
      : <h2>Loading User..</h2>}
      {posts.map(post => {
        return(
          <View key = {post.id} style = {styles.postContainer}>
          <div><h2 style = {styles.heading} key = {post.id}>{post.title}</h2>
          </div>
          <p key = {post.id + "p"}>{post.description}</p>
          </View>
        )
      })}
    </>)
  }

  function NewPost(){
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const navigate = useNavigate()
    function goBack(){
      done = false
      navigate("/")
      findPosts(usersID).then((res) => {
        setPosts(res)
        done = true
      })
    }
    return(
      <>
        {name ? <h2>{name} - New Post</h2> : <h2>Loading User..</h2>}
        <View style = {styles.addPostContainer}>
          <TextInput value = {title} onChangeText = {(e)=> setTitle(e)} style = {styles.input} placeholder = "Enter Title"/>
          <TextInput value = {description} onChangeText = {(e)=> setDescription(e)} style = {styles.descriptionInput} 
            multiline = {true}
            placeholder = "Enter Description"/>
            <div style = {{width: '150px', paddingLeft:'10px'}}>
              <Button title = "Submit Post" onPress={() => {
                  createPost(title, description, usersID).then((id) => {
                    if(id) goBack()
                  })
                  }
                }/>
            </div>
        </View>
      </>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    textAlign : 'center'
  },
  heading: {
    margin: '0',
    padding: '0',
    width: 'fit-content',
    float: 'left'
  },
  postContainer:{
    textAlign: 'left',
    backgroundColor: 'lightgray',
    width: '80%',
    marginTop: '20px',
    marginBottom: '20px',
    marginRight: 'auto',
    marginLeft: 'auto',
    boxShadow: '10px 10px lightblue',
    padding: '20px'
  },
  addPostContainer:{
    textAlign: 'left',
    backgroundColor: '#e9f9ff',
    width: '80%',
    marginTop: '20px',
    marginBottom: '20px',
    marginRight: 'auto',
    marginLeft: 'auto',
    boxShadow: '10px 10px lightgray',
    padding: '30px'
  },
  timestamp:{
    float: 'right',
    paddingTop: '18px',
    fontStyle: 'italic'
  },
  headerTitle: {
    color: '#fff',
    fontSize: 29,
    fontWeight: '750',
    paddingVertical: 16,
    textAlign: 'center',
  }, headerContainer: {
    backgroundColor: '#587781',
    paddingTop: Platform.OS === 'ios' ? 44 : 0,
  },
  link: {
    float:'right',
    marginLeft:'20px',
    color: 'white',
    fontWeight: 'bold'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  descriptionInput: {
    height: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }
});

export default withAuthenticator(App);
