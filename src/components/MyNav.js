import { View, Text, Button } from '@aws-amplify/ui-react'
import { StyleSheet } from 'react-native';
import '@aws-amplify/ui-react/styles.css';
import { Link } from 'react-router-dom'
import { Auth } from 'aws-amplify';
import { useCart } from "react-use-cart"
import { Menu, MenuItem, MenuButton } from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';

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
    const [widthMatch, setWidthMath] = useState(
        window.matchMedia("(max-width: 550px)").matches
    )

    useEffect(() => {
        window.matchMedia("(max-width: 550px)")
        .addEventListener('change', e => setWidthMath(e.matches))
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
                        </MenuButton>
                    }
                    >
                        <MenuItem><Link to = "/my-posts" style = {{textDecorationLine:'none', width:'100%'}}>My Posts</Link></MenuItem>
                        <MenuItem> <Link to = "/my-transactions" style = {{textDecorationLine:'none', width:'100%'}}>Transactions</Link></MenuItem>
                        <MenuItem><Link to = "/new-post" style = {{textDecorationLine:'none', width:'100%'}}>New Post</Link></MenuItem>
                        <MenuItem><Link to = "/cart" style = {{textDecorationLine:'none', width:'100%'}}>Cart({totalItems})</Link></MenuItem>
                        <MenuItem onClick = {() => signOut()}>Sign Out</MenuItem>
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