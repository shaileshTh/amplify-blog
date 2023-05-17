import MyNav from "./MyNav";
import { StyleSheet } from 'react-native';
import { Heading, Divider, Loader, useTheme, Alert } from '@aws-amplify/ui-react';
import { useEffect, useState } from "react";
import { Expander, ExpanderItem } from '@aws-amplify/ui-react';
const stripe = require('stripe')('sk_test_51HmobNIOs4Bwoex9erX63uEPKdwylY7a5f8zxvmskceNETVfJMaDzygagiugpV5xocQFVVjJEvHhslTdlHdExUs500dSOPhSrx');



export default function Insiders(props){
    const [subscriptionDetails, setSubscriptionDetails] = useState()
    useEffect(() => {
        if(props.customerId){
            const subscriptions = stripe.subscriptions.list({
                customer: props.customerId
            });
            
            subscriptions.then((r) => {
                stripe.products.retrieve(r.data[0].plan.product).then((r) => {
                    console.log(r)
                    setSubscriptionDetails(r)
                })
            })
        }
    }, [props.customerId])    

    const { tokens } = useTheme();
    return(<div style = {{width:'100%', backgroundColor:'var(--amplify-colors-background-tertiary)'}}>
        <MyNav customerId = {props.customerId} page = 'insiders' name = {props.name}/>
        <div style = {styles.container}>
            <div style = {{ maxWidth: '1200px', margin: '30px auto 0 auto' }}>
                <Heading level = {2} color = {tokens.colors.brand.primary[80]}><i>Argano Insiders</i></Heading>
                <Divider  border={`${tokens.borderWidths.large} solid ${tokens.colors.brand.primary[80]}`}/>
            </div>
            <br/> 
            {props.name ? 
                <>
                {props.customerId ? <>
                    {subscriptionDetails ? 
                        <>{subscriptionDetails.active ? <>
                            <Alert variation="success">
                            <b>{subscriptionDetails.name}</b> Active
                            </Alert>
                            <br/>
                            <Expander type="multiple">
                                <ExpanderItem title={subscriptionDetails.name + " Content 1"} value="item-1">
                                    Now when you click the second item, this item will stay open until you
                                    close it.
                                </ExpanderItem>
                                <ExpanderItem  title={subscriptionDetails.name + " Content 2"} value="item-2">
                                    Notice how both items can be open at the same time for the multiple
                                    Expander.
                                </ExpanderItem>
                            </Expander>
                        </>: 
                        <Alert variation="error">Subscription not active</Alert>}
                        </>
                        :
                        <Loader></Loader>
                    }   
                </> 
                : 
                <Alert variation="error">Subscription not active</Alert>
                }     
                </>
                :
                <Alert variation='warning'>
                    Please login to subscribe / view insider contents
                </Alert>
            }
            
            <br/>
           
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