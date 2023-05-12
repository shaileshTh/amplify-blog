import { useState } from "react";
import { Authenticator } from "@aws-amplify/ui-react"
import '@aws-amplify/ui-react/styles.css';
import { Amplify, Auth } from 'aws-amplify';

import awsconfig from '../aws-exports';
import { useNavigate } from 'react-router-dom'
Amplify.configure(awsconfig);
import  MyNav  from './MyNav'



function Login(){
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const navigate = useNavigate()


    return(
      <div style = {{width:'100%'}}>
        <MyNav page = "login"/>
        <br/>
    
        <Authenticator socialProviders={['google']}>
          {() => (
            <h1>logged in</h1>
            // navigate("/my-posts")
          )}
        </Authenticator>
      </div>
    )
}


export default Login