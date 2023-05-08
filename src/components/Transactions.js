import { useEffect, useState } from 'react';
import { Alert, Placeholder, Heading, Divider, useTheme } from '@aws-amplify/ui-react';
import  MyNav  from './MyNav'
import { Amplify, Auth, API } from 'aws-amplify';



export default function Transactions(props){
    const { tokens } = useTheme();

    const [loaded, setLoaded] = useState(false);
    const [posts, setPosts] = useState([])
    const [username, setUsername] = useState()
    useEffect(()=>{
    Auth.currentAuthenticatedUser().then((u)=>{
        setUsername(u.attributes.sub)
        if(username){
            API.get('myAPI', '/get-transactions', {
                body: {
                    username: username
                }
            }).then((res)=>{
                console.log(res)
                // setPosts(res.data.reverse())
                // setLoaded(true)
            }).catch(err => console.log(err))
        }
      })
       
    },[username])
    
    if(props.username) console.log(props.username)


    return(<div style = {{width:'100%', backgroundColor:'var(--amplify-colors-background-tertiary)'}}>
        <MyNav name = {props.name} page = "my-transactions"/>

        {props.name === undefined ? <Alert variation='warning' 
            style = {{fontSize:'x-large', maxWidth: '1200px', margin: '30px auto'}}>
              Please login to view your transactions
          </Alert> : <>
    
          <div style = {{ maxWidth: '1200px', margin: '30px auto 0 auto' }}>
            <Heading level = {2} color = {tokens.colors.brand.primary[80]}><i>Your transactions</i></Heading>
            <Divider  border={`${tokens.borderWidths.large} solid ${tokens.colors.brand.primary[80]}`}/>
          </div>
          
        {loaded ? <>
            <h1>transactions</h1></> :<div style = {{ maxWidth: '1200px', margin: '30px auto 0 auto' }}>
                <Placeholder/>
                <br/>
                <Placeholder/>
            </div>
        } </>}
    </div>
    )
}
