import { View, Text, Button, Badge } from '@aws-amplify/ui-react'
import { StyleSheet } from 'react-native';
import '@aws-amplify/ui-react/styles.css';
import { Link } from 'react-router-dom'
import { Auth } from 'aws-amplify';
import { useCart } from "react-use-cart"
import { Menu, MenuItem, MenuButton } from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';
const stripe = require('stripe')('sk_test_51HmobNIOs4Bwoex9erX63uEPKdwylY7a5f8zxvmskceNETVfJMaDzygagiugpV5xocQFVVjJEvHhslTdlHdExUs500dSOPhSrx');

async function signOut() {
  try {
    await Auth.signOut()
    Auth.currentAuthenticatedUser().then()
    .catch(window.location.reload())
  } catch (error) {
    console.log('error signing out: ', error);
  }
}


export default function MyNav(props){
    const { totalItems } = useCart()
    const [subscriptionActive, setSubscriptionActive] = useState(false)
    const [widthMatch, setWidthMath] = useState(
        window.matchMedia("(max-width: 550px)").matches
    )

    useEffect(() => {
        window.matchMedia("(max-width: 550px)")
        .addEventListener('change', e => setWidthMath(e.matches))
        if(props.customerId){
            const subscriptions = stripe.subscriptions.list({
                customer: props.customerId
            });
    
            subscriptions.then((r) => {
                setSubscriptionActive(r.data[0].plan.active)
            })
        }
       
    })
    return(
        <View
        as="div"
        ariaLabel="View example"
        
        style = {styles.nav}
        >
        <div style = {styles.container}>
            <Link to = "/" style = {{textDecorationLine:'none'}}>
           <Text style = {styles.logo}>
                Argano
            </Text>
            </Link>
               
                {props.name ? 
                    <Menu 
                    trigger={
                        <MenuButton style={{float:'right'}} variation="primary">
                            👤 {props.name}  
                            {subscriptionActive ? <Badge marginLeft = "5px" size = "small" variation="success">Subscribed</Badge>
                            : <Badge marginLeft = "5px" size = "small" variation="info">Not Subscribed</Badge>}
                        </MenuButton>
                    }
                    >
                        {!subscriptionActive && <MenuItem><Link to = "/subscription" style = {{textDecorationLine:'none', width:'100%'}}>Subscription</Link></MenuItem>}
                        <MenuItem><Link to = "/my-posts" style = {{textDecorationLine:'none', width:'100%'}}>My Posts</Link></MenuItem>
                        {subscriptionActive && <MenuItem><Link to = "/my-subscription" style = {{textDecorationLine:'none', width:'100%'}}>My Subscription</Link></MenuItem>}
                        <MenuItem> <Link to = "/my-transactions" style = {{textDecorationLine:'none', width:'100%'}}>Transactions</Link></MenuItem>
                        <MenuItem><Link to = "/new-post" style = {{textDecorationLine:'none', width:'100%'}}>New Post</Link></MenuItem>
                        <MenuItem><Link to = "/cart" style = {{textDecorationLine:'none', width:'100%'}}>Cart({totalItems})</Link></MenuItem>
                        <MenuItem onClick = {()  => signOut()}>Sign Out</MenuItem>
                    </Menu>
                : <>{props.page != 'login' && <Link to = "/login" style = {{textDecorationLine:'none'}}>
                    <Button variation = "link" style = {styles.button}>
                        Login
                    </Button> 
                </Link>}</>
                }
            {widthMatch ?
            <div style = {{float:'right', marginRight: '10px'}}>
            <Menu>
                <MenuItem>
                    <Link to = "/insiders" style = {{textDecorationLine:'none', width:'100%'}}>
                        Insiders
                    </Link>
                    <Link to = "/pricing" style = {{textDecorationLine:'none', width:'100%'}}>
                        Pricing
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link to = "/shop" style = {{textDecorationLine:'none', width:'100%'}}>
                        Shop
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link to = "/blog" style = {{textDecorationLine:'none', width:'100%'}}>
                        Blog
                    </Link>
                </MenuItem>
            </Menu>
            </div>
            : <>
                {props.page != 'blog' &&<Link to = "/blog">
                    <Button variation = "link" style = {styles.button}>
                        Blog
                    </Button> 
                </Link>}
                {props.page != 'shop' &&<Link to = "/shop">
                    <Button variation = "link" style = {styles.button}>
                        Shop
                    </Button> 
                </Link>}
                {props.page != 'pricing' &&<Link to = "/pricing">
                    <Button variation = "link" style = {styles.button}>
                        Pricing
                    </Button> 
                </Link>}
                {props.page != 'insiders' &&<Link to = "/insiders">
                    <Button variation = "link" style = {styles.button}>
                        Insiders
                    </Button> 
                </Link>}
                </>}
                
        </div>
           
        </View>
    )
}

const styles = StyleSheet.create({
    nav: {
        width:"100%",
        boxShadow:" 0px 5px 5px gray",
        height:"5rem",
        padding:"1.5rem",
        backgroundColor: "var(--amplify-colors-background-secondary)",
        position:"relative",
        zIndex:"999"
    },
    button: {
        float: "right",
        
    },
    container: {
        maxWidth:'1200px', 
        marginTop:'0',
        marginRight:'auto',
        marginBottom: '0',
        marginLeft: 'auto',
      },
    logo: {
        variation:"primary",
        as:"span",
        color:"var(--amplify-colors-brand-primary-80)",
        lineHeight:"1.2em",
        fontWeight:'550',
        fontSize:"1.7em",
        fontStyle:"normal",
        float:"left",
        textDecorationLine:"none",
    }
  })