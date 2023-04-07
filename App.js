import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, Platform, Button } from 'react-native';
import { Amplify, Auth, Hub } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsconfig from './src/aws-exports';
Amplify.configure(awsconfig);
import { DataStore } from '@aws-amplify/datastore';
import { Users, Posts } from './src/models';
import {  BrowserRouter as Router, Routes, Route, Link, useNavigate} from 'react-router-dom'
import { TextInput } from 'react-native-web';


//function called after the new user signs up to create an entry in the 'Users' table
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

//listening for auto signin event after the new user signs up
//to create a new user in the 'Users' table in the DataStore
Hub.listen('auth', ({ payload }) => {
  const { event } = payload;
  if (event === 'autoSignIn') {
    const user = payload.data;
    newUsers(user.username, user.attributes.name, user.attributes.email).then(res => console.log(res))
  }
})

//function called on clicking the signout nav link
//uses Amplify's Auth component
async function signOut() {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log('error signing out: ', error);
  }
}

//find user's primary key used to identify posts in the 'Posts' table
async function findUsersId(username){
  let user = await DataStore.query(Users, (c) => c.username.eq(username));
  return user[0].id
}

//fetch posts and filter them by the primary key of currently logged in user
async function findPosts(id){
  let res = await DataStore.query(Posts, (c) => c.usersID.eq(id));
  //reverse the result array to show latest posts first
  res.reverse()
  if(res) return res
}

//using the save method of Amplify's DataStore component to create a new post
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
  // return id on successfull submission of post
  return id
}

function App() {
  const [name, setName] = useState()
  const [username, setUsername] = useState()
  const [usersID, setUsersID] = useState()
  const [posts, setPosts] = useState([])
  let done = false

  //get current autheticated user's details to save on React State variables
  useEffect(()=>{
    Auth.currentAuthenticatedUser()
    .then((user) => {
        setName(user.attributes.name)
        setUsername(user.username)
    })
    .catch((err) => console.log(err))
  
    //find user's primary key randomly generated in the database 
    //(called usersID in the 'Posts' table)
    if(username) {
      findUsersId(username).then((u) => {
        setUsersID(u)
      })
    }
    //fetch posts by the user's primary key and set the result array in the React state
    usersID && findPosts(usersID).then((res) => {
      setPosts(res)
      done = true
    })
  }, [done, name, username, usersID])

  return (
    //react-router-dom's router component to switch between pages / components
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
    //mapping the resulting array of posts to render them
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
    //called after successfull post submission
    function goBack(){
      done = false
      navigate("/")
      //update the posts state variable after fetching new results from 'Posts' table
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
                    //navigating back to the posts page after successfull post submission
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


//CSS styles for components
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

//Amplify's withAuthenticator component handles authentication workflow
export default withAuthenticator(App);
