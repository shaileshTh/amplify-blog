import { Heading, Divider, useTheme, Alert } from '@aws-amplify/ui-react';
import  MyNav  from './MyNav'
import { useLocation } from "react-router-dom";


export default function PaymentSuccess(props){
    const { tokens } = useTheme();
    const myParam = useLocation().search;
    const pI= new URLSearchParams(myParam).get("payment_intent");
      
  
    return(<div style = {{width:'100%', backgroundColor:'var(--amplify-colors-background-tertiary)'}}>
        <MyNav name = {props.name}/>
          <div style = {{ maxWidth: '1200px', margin: '30px auto 0 auto' }}>
            <Heading level = {2} color = {tokens.colors.brand.primary[80]}><i>Success</i></Heading>
            <Divider  border={`${tokens.borderWidths.large} solid ${tokens.colors.brand.primary[80]}`}/>
            <br/>
            <Alert style = {{fontSize: tokens.fontSizes.xl}}variation="success" heading={"Payment Intent: "+pI}>
                Thank you for your order.
            </Alert> 
          </div>
    </div>
    )
}

