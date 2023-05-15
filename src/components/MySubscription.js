import MyNav from "./MyNav";
import { StyleSheet } from 'react-native';
import { Heading, Divider, useTheme, Alert } from '@aws-amplify/ui-react';
import { useEffect } from "react";
const stripe = require('stripe')('sk_test_51HmobNIOs4Bwoex9erX63uEPKdwylY7a5f8zxvmskceNETVfJMaDzygagiugpV5xocQFVVjJEvHhslTdlHdExUs500dSOPhSrx');
import { API } from 'aws-amplify';



export default function MySubscription(props){
    const { tokens } = useTheme();
    let product
    useEffect(() => {
        if(props.customerId){
            const subscriptions = stripe.subscriptions.list({
                customer: props.customerId
            });
            
            subscriptions.then((r) => {
                stripe.products.retrieve(r.data[0].plan.product).then(r => console.log(r))
            })
        }
       
        if(props.username){
            API.post("myAPI", "/get-subscription-status", {
                body: {
                  username: props.username
                }
              }).then((r) => {
                console.log(r)
              })
            .catch(e => console.log(e))    
        }
        
    }, [props.customerId, props.username])
    
    return(<div style = {{width:'100%', backgroundColor:'var(--amplify-colors-background-tertiary)'}}>
        <MyNav customerId = {props.customerId} page = 'subscription' name = {props.name}/>
        <div style = {styles.container}>
            <div style = {{ maxWidth: '1200px', margin: '30px auto 0 auto' }}>
                <Heading level = {2} color = {tokens.colors.brand.primary[80]}><i>My Subscription</i></Heading>
                <Divider  border={`${tokens.borderWidths.large} solid ${tokens.colors.brand.primary[80]}`}/>
            </div>
            {props.name === undefined ? <Alert variation='warning' 
            style = {{fontSize:'x-large', maxWidth: '1200px', margin: '30px auto'}}>
              Please login to access the subscription page
            </Alert> :   <h1>My Subscription</h1> 
            }
          
        </div>
    </div>)
}

const styles = StyleSheet.create({
    container: {
      maxWidth:'1200px', 
      marginTop:'0',
      marginRight:'auto',
      marginBottom: '0',
      marginLeft: 'auto',
    }
  })