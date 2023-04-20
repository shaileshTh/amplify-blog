import { useEffect, useState } from "react";
import { Authenticator } from "@aws-amplify/ui-react"
import '@aws-amplify/ui-react/styles.css';
import { StyleSheet } from 'react-native';
import { Amplify, Auth, Hub } from 'aws-amplify';

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
        {/* <View
            as="div"
            borderRadius="6px"
            border="1px solid var(--amplify-colors-black)"
            boxShadow="3px 3px 5px 6px var(--amplify-colors-neutral-60)"
            color="var(--amplify-colors-blue-60)"
            minHeight="300px"
            maxWidth="350px"
            margin = "2em auto 0 auto"
            padding="1rem"
            >
            <Heading level={4} style = {{textAlign:'center'}}>Login</Heading>
            <Flex as="form" direction="column" width="20rem">
                <TextField
                    label={
                    <Text>
                        Email
                    </Text>
                    }
                    type="email"
                    isRequired={true}
                    onChange={(e)=>setEmail(e.target.value)}
                    value={email}
                />
                <TextField
                    label="Password"
                    type="password"
                    isRequired={true}
                    onChange={(e)=>setPassword(e.target.value)}
                    value={password}
                />
                <Button type="submit" onClick={(e)=>signIn(e)} variation = "primary">Submit</Button>

                <button onClick={() => Auth.federatedSignIn()}>Open Hosted UI</button>
                <button onClick={() => Auth.federatedSignIn({provider: 'Google' })}>Open Google</button>
            </Flex>
        </View> */}
        <Authenticator socialProviders={['google']}>
          {() => (
            navigate("/my-posts")
          )}
        </Authenticator>
      </div>
    )

    async function signIn(e) {
        e.preventDefault()
        console.log(email)
        try {
          const user = await Auth.signIn(email, password);
          Auth.currentAuthenticatedUser().then(navigate("/my-posts"))
        } catch (error) {
          console.log('error signing in', error);
        }
    }
}


export default Login