import { View, Text, Button } from '@aws-amplify/ui-react'
import { StyleSheet } from 'react-native';
import '@aws-amplify/ui-react/styles.css';
import { Link } from 'react-router-dom'
import { Auth } from 'aws-amplify';
import { useCart } from "react-use-cart"

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

    return(
        <View
        as="div"
        ariaLabel="View example"
        
        style = {styles.nav}
        >
        <div style = {styles.container}>
            <Link to = "/" style = {{textDecorationLine:'none'}}>
            {props.name ? <Text style = {styles.logo}>
                Argano - <small><i>Hi {props.name}!</i></small>
            </Text>
            :<Text style = {styles.logo}>
                Argano
            </Text>}
            </Link>
                {props.name ? 
                        <Button variation = "link" style = {styles.button} onClick = {() => signOut()}>
                            Sign Out
                        </Button> 
                : <>{props.page != 'login' && <Link to = "/login" style = {{textDecorationLine:'none'}}>
                    <Button variation = "link" style = {styles.button}>
                        Login
                    </Button> 
                </Link>}</>
                }
                {(props.name && props.page != 'cart') && <Link to = "/cart" style = {{textDecorationLine:'none'}}>
                    <Button variation = "link" style = {styles.button}>
                        Cart({totalItems})
                    </Button> 
                </Link>}
                {(props.name && props.page != 'new-post') && <Link to = "/new-post" style = {{textDecorationLine:'none'}}>
                    <Button variation = "link" style = {styles.button}>
                        New Post
                    </Button> 
                </Link>}
                {(props.name && props.page != 'my-posts') && <Link to = "/my-posts" style = {{textDecorationLine:'none'}}>
                    <Button variation = "link" style = {styles.button}>
                        My Posts
                    </Button> 
                </Link>}
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
        float: "right"
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
        width:"30vw"
    }
  })