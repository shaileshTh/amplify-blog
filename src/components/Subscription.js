import MyNav from "./MyNav";
import { StyleSheet } from 'react-native';
import { Heading, Divider, useTheme, Alert } from '@aws-amplify/ui-react';



export default function Subscription(props){
    const { tokens } = useTheme();

    return(<div style = {{width:'100%', backgroundColor:'var(--amplify-colors-background-tertiary)'}}>
        <MyNav page = 'subscription' name = {props.name}/>
        <div style = {styles.container}>
            <div style = {{ maxWidth: '1200px', margin: '30px auto 0 auto' }}>
                <Heading level = {2} color = {tokens.colors.brand.primary[80]}><i>Subscription</i></Heading>
                <Divider  border={`${tokens.borderWidths.large} solid ${tokens.colors.brand.primary[80]}`}/>
            </div>
            {props.name === undefined ? <Alert variation='warning' 
            style = {{fontSize:'x-large', maxWidth: '1200px', margin: '30px auto'}}>
              Please login to access the subscription page
            </Alert> :   <stripe-pricing-table 
            pricing-table-id="prctbl_1N6I7MIOs4Bwoex9um96LPkA" 
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