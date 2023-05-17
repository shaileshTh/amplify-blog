import { useTheme, Alert } from '@aws-amplify/ui-react';
import  MyNav  from '../components/MyNav'
import  MyHeading  from '../components/MyHeading'
import { useLocation } from "react-router-dom";

import { useCart } from "react-use-cart";


export default function PaymentSuccess(props){
    const { tokens } = useTheme();
    const myParam = useLocation().search;
    const pI= new URLSearchParams(myParam).get("payment_intent");
    const { emptyCart } = useCart();

    emptyCart();
  
    return(<div style = {{width:'100%', backgroundColor:'var(--amplify-colors-background-tertiary)'}}>
        <MyNav customerId = {props.customerId} name = {props.name}/>

        <MyHeading title = "Payment Success"/>
            <Alert style = {{fontSize: tokens.fontSizes.xl}}variation="success" heading={"Payment Intent: "+pI}>
                Thank you for your order.
            </Alert> 
    </div>
    )
}

