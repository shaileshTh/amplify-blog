import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Alert, Placeholder, useTheme } from '@aws-amplify/ui-react';
import  MyNav  from '../components/MyNav'
import  MyHeading  from '../components/MyHeading'
import { Auth, API } from 'aws-amplify';



    

export default function MyPosts(props){
    const { tokens } = useTheme();

    const [loaded, setLoaded] = useState(false);
    const [posts, setPosts] = useState([])
    const [username, setUsername] = useState()
    useEffect(()=>{
    Auth.currentAuthenticatedUser().then((u)=>{
        setUsername(u.attributes.sub)
        if(username){
            API.get('myAPI', '/posts', {
                queryStringParameters: {
                    username: username
                }
            }).then((res)=>{
                res.data.sort((a,b) => (new Date(b.createdAt) - new Date(a.createdAt)))
                setPosts(res.data)
                setLoaded(true)
            }).catch(err => console.log(err))
        }
      })
       
    },[username])
    
    //reloading the webpage after login navigation to update nav bar
    if(!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
    }
    

    return(<div style = {{width:'100%', backgroundColor:'var(--amplify-colors-background-tertiary)'}}>
        <MyNav error = {props.error} subscriptionActive = {props.subscriptionActive} name = {props.name} page = "my-posts"/>

        {props.name === undefined ? <Alert variation='warning' 
            style = {{fontSize:'x-large', maxWidth: '1200px', margin: '30px auto'}}>
              Please login to view your posts
          </Alert> : <>
        
            <MyHeading title = "My Posts" />
          
        {loaded ? <>
            {posts.map(post => {
            return(
            <View key = {post.id} style = {styles.postContainer}>
            <div><h2 style = {styles.heading} key = {post.id}>{post.title}</h2>
            <br/>
            <div style = {{clear:'both', color:'var(--amplify-colors-font-disabled)'}}>
                <i>{"on" + " " + post.createdAt.substring(0,10) + " " + post.createdAt.substring(11,16)}
                </i>
            </div>
            </div>
            <p key = {post.id + "p"}>{post.description}</p>
            </View>
            )
            })}</> : <div style = {styles.postContainer}> 
                <Placeholder/>
                <br/>
                <Placeholder/>
            </div>
        } </>}
    </div>
    )
}

const styles = StyleSheet.create({
    postContainer:{
        textAlign: 'left',
        backgroundColor: 'var(--amplify-colors-background-primary)',
        maxWidth: '1200px',
        marginTop: '50px',
        marginBottom: '50px',
        marginRight: 'auto',
        color: 'var(--amplify-colors-font-info)',
        marginLeft: 'auto',
        boxShadow:" 0px 5px 5px gray",
        padding: '20px'
    },
    heading: {
        margin: '0',
        padding: '0',
        width: 'fit-content',
        color: 'var(--amplify-colors-font-interactive)',
        float: 'left'
    }
})