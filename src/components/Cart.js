import { useCart } from 'react-use-cart';
import  MyNav  from './MyNav'
import { Auth } from 'aws-amplify';
import { StyleSheet } from 'react-native';
import { Heading, Divider, Image, Button, View, useTheme, Card, Collection } from '@aws-amplify/ui-react';
import { useState, useEffect} from 'react';

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe("pk_test_51HmobNIOs4Bwoex9HWRfjJt3gFCHUsBNOAMovIwXJfiOFVdFb2ahUfTljChjD2AjyJfk0KsHneueAA3vlP0NR5Hs00X7Q8CI37")

export default function Cart(props) {
    const { tokens } = useTheme();

    const {
      isEmpty,
      items,
      totalItems,
      cartTotal,
      updateItemQuantity,
      removeItem,
    } = useCart();
    const [clientSecret, setClientSecret] = useState("")
    const [username, setUsername] = useState("")
    const [creatingIntent, setCreatingIntent] = useState(false)
   
    useEffect(()=>{
      Auth.currentAuthenticatedUser().then((u)=>{
          setUsername(u.username)
      })
    })
    async function handleClick(){
      let sanitizedItems = items
      sanitizedItems = sanitizedItems.map((item) => {
        delete item.loggedIn
        delete item.id
        delete item.description
        delete item.new
        delete item.imgsrc
        return item
      })
        setCreatingIntent(true)
        fetch("https://kwg1iza64l.execute-api.us-east-1.amazonaws.com/dev/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({"items" :sanitizedItems,
                    "username" : username})
          })
            .then((res) => res.json())
            .then((data) => {
                setClientSecret(data.clientSecret)
                setCreatingIntent(false)
            }).
            catch(err=> console.log(err))
        }
     
    const appearance = {
        theme: 'stripe',
    };
          
    const options = {
        clientSecret,
        appearance,
    };
    if (clientSecret) return(
        <div style = {{width:'100%', backgroundColor:'var(--amplify-colors-background-tertiary)'}}>
        <MyNav name = {props.name} page = "cart"/>
          <div style = {{ maxWidth: '1200px', margin: '30px auto 0 auto' }}>
            <Heading level = {2} color = {tokens.colors.brand.primary[80]}><i>Total: ${cartTotal.toFixed(2)}</i></Heading>
            <Divider  border={`${tokens.borderWidths.large} solid ${tokens.colors.brand.primary[80]}`}/>
          </div>
            <div style = {styles.container}>
            <Collection
            style={{marginTop:'30px'}}
            items = {items}
            type="list"
            direction="column"
            gap="10px"
            wrap="nowrap"
            >
          {(item) => (
            <Card key={item.id} 
            borderRadius="medium"
            maxWidth="33rem"
            variation="outlined">
            <View>
                <Heading level = {6}>{item.quantity} x {item.title} = ${item.itemTotal.toFixed(2)}</Heading>
                <Heading level = {6}>${item.price} each</Heading>
              </View>
            </Card>
          )}
        </Collection>
        <Card
            style={{padding: '0', marginTop:'20px'}}
            borderRadius="medium"
            maxWidth="33rem"
            variation="outlined">
                <Elements options={options} stripe={stripePromise}>
                <CheckoutForm email = {props.email}/>
                </Elements>
        </Card>
        </div>
        </div>
    )
    return (
        <div style = {{width:'100%', backgroundColor:'var(--amplify-colors-background-tertiary)'}}>
        <MyNav name = {props.name} page = "cart"/>
          <div style = {{ maxWidth: '1200px', margin: '30px auto 0 auto' }}>
            <Heading level = {2} color = {tokens.colors.brand.primary[80]}><i>Cart ({totalItems})</i></Heading>
            <Divider  border={`${tokens.borderWidths.large} solid ${tokens.colors.brand.primary[80]}`}/>
          </div>
        
        <div style = {styles.container}>
        {isEmpty ? <h2>Cart is Empty</h2> : <>
          <Collection
          style={{marginTop:'30px'}}
          items = {items}
          type="list"
          direction="column"
          gap="20px"
          wrap="nowrap"
        >
          {(item) => (
            <Card key={item.id} 
            borderRadius="medium"
            maxWidth="33rem"
            variation="outlined">
            <Image style = {{float:'right'}} src={item.imgsrc} alt={item.title} width="100px"/>
            <View>
                <Heading level = {5}>{item.title}</Heading>
                <Heading level = {5}>${item.itemTotal.toFixed(2)} ({item.quantity} x ${item.price})</Heading>
                {!clientSecret && <> 
                    <Button variation = "primary" style={styles.button}
                    onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                    >
                    -
                    </Button>
                    <Button variation = "primary" style={styles.button}
                    onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                    >
                    +
                    </Button>
                    <Button variation = "destructive" style={styles.button}
                    onClick={() => removeItem(item.id)}>x</Button>
                </>}
               
              </View>
            </Card>
          )}
        </Collection>
        <Card borderRadius="medium"
            maxWidth="33rem"
            variation="outlined"
            marginTop="30px"
            marginBottom="30px">
            <Heading level = {5}>Total: {cartTotal.toFixed(2)}</Heading>
            <br/>
            
            <Button isLoading = {creatingIntent} variation = "primary" isFullWidth = {true}
                 onClick={() => handleClick(props.email)}>Checkout</Button>
           
        </Card>
        </>}
        </div>
       
      </div>
    );
  }

  const styles = StyleSheet.create({
    container: {
      maxWidth:'1200px', 
      marginTop:'0',
      marginRight:'auto',
      marginBottom: '0',
      marginLeft: 'auto',
    },
    button:{
        marginRight:'.3em',
        marginTop:'.3em',
        height:'1.5em',
        fontSize:'1.2em',
        paddingTop: '.1em'
    }
  })
