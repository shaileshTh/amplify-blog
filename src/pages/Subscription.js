import MyNav from "../components/MyNav";
import MyHeading from "../components/MyHeading";
import { StyleSheet } from 'react-native';
import { useTheme, Alert } from '@aws-amplify/ui-react';



export default function Subscription(props){
    return(<div style = {{width:'100%', backgroundColor:'var(--amplify-colors-background-tertiary)'}}>
        <MyNav error = {props.error} subscriptionActive = {props.subscriptionActive} page = 'subscription' name = {props.name}/>
        <div style = {styles.container}>
            <MyHeading title = "Subscription" />
            {props.name === undefined ? <Alert variation='warning' 
            style = {{fontSize:'x-large', maxWidth: '1200px', margin: '30px auto'}}>
              Please login to access the subscription page
            </Alert> :   <stripe-pricing-table 
            pricing-table-id="prctbl_1N6I7MIOs4Bwoex9um96LPkA" 
            customer-email = {props.email}
            client-reference-id = {props.username}
            publishable-key="pk_test_51HmobNIOs4Bwoex9HWRfjJt3gFCHUsBNOAMovIwXJfiOFVdFb2ahUfTljChjD2AjyJfk0KsHneueAA3vlP0NR5Hs00X7Q8CI37"></stripe-pricing-table>
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