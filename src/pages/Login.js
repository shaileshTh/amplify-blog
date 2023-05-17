import { Authenticator, Loader } from "@aws-amplify/ui-react"
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';

import awsconfig from '../aws-exports';
import { useNavigate } from 'react-router-dom'
Amplify.configure(awsconfig);
import  MyNav  from '../components/MyNav'



function Login(){

const navigate = useNavigate()
    return(
      <div style = {{width:'100%'}}>
        <MyNav page = "login"/>
        <br/>
       <Authenticator socialProviders={['google']}> 
    
       {() => {
          setTimeout(()=>{
            navigate("/my-posts")
          }, 1000)
          return(<Loader variation="linear"/>)
        }
       }
       
      </Authenticator>        
      </div>
    )
}


export default Login