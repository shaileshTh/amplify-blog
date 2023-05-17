import MyNav from "./MyNav";
import { StyleSheet } from 'react-native';
import { Heading, Divider, Badge, Loader, useTheme, Alert } from '@aws-amplify/ui-react';
import { useEffect, useState } from "react";
const stripe = require('stripe')('sk_test_51HmobNIOs4Bwoex9erX63uEPKdwylY7a5f8zxvmskceNETVfJMaDzygagiugpV5xocQFVVjJEvHhslTdlHdExUs500dSOPhSrx');



export default function MySubscription(props){
    const { tokens } = useTheme();
    const [subscriptionDetails, setSubscriptionDetails] = useState()

    useEffect(() => {
        if(props.customerId){
            const subscriptions = stripe.subscriptions.list({
                customer: props.customerId
            });
            
            subscriptions.then((r) => {
                stripe.products.retrieve(r.data[0].plan.product).then((r) => {
                    setSubscriptionDetails(r)
                })
            })
        }
        
    }, [props.customerId, props.username])

    return(<div style = {{width:'100%', backgroundColor:'var(--amplify-colors-background-tertiary)'}}>
        <MyNav customerId = {props.customerId} page = 'subscription' name = {props.name}/>
        <div style = {styles.container}>
            <div style = {{ maxWidth: '1200px', margin: '30px auto 0 auto' }}>
                <Heading level = {2} color = {tokens.colors.brand.primary[80]}><i>My Subscription</i></Heading>
                <Divider  border={`${tokens.borderWidths.large} solid ${tokens.colors.brand.primary[80]}`}/>
            </div>
            <br/>
            {props.name === undefined ? <Alert variation='warning' 
            style = {{fontSize:'x-large', maxWidth: '1200px', margin: '30px auto'}}>
              Please login to access the subscription page
            </Alert> :  <>
            {subscriptionDetails ?
                <Alert
                    isDismissible={false}
                    variation="info"
                    heading={"Plan name: " + subscriptionDetails.name}
                    >
                {subscriptionDetails.active ? <Badge size = "small" variation="success">Plan Active</Badge>
                :<Badge size = "small" variation="error">Plan Not Active</Badge>
                }<br/><br/>
                <b>Description:</b>
                <br/>
                {subscriptionDetails.description}
                </Alert> : <Loader variation="linear"/>}
        
            <br/>
               <button onClick = {() => {
                    stripe.billingPortal.sessions.create({
                        customer: props.customerId
                    }).then(r => window.open(r.url))
                }}>Manage Billing</button>
            </>
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