import MyNav from "../components/MyNav";
import MyHeading from "../components/MyHeading";
import { MyMarketingPricing, MyMarketingFooter } from '../ui-components';
import { StyleSheet } from 'react-native';
import { useTheme, Alert } from '@aws-amplify/ui-react';
import { Link } from 'react-router-dom'



export default function Pricing(props){
    return(<div style = {{width:'100%', backgroundColor:'var(--amplify-colors-background-tertiary)'}}>
        <MyNav error = {props.error} subscriptionActive = {props.subscriptionActive} page = 'pricing' name = {props.name}/>
        <div style = {styles.container}>
            <MyHeading title = "Pricing"/>
            {props.name === undefined ? <Alert variation='warning' 
            style = {{fontSize:'x-large', maxWidth: '1200px', margin: '30px auto'}}>
              Please login to access the subscription page
            </Alert> : <Alert variation='warning' 
            style = {{fontSize:'x-large', maxWidth: '1200px', margin: '30px auto'}}>
              Go to <Link to = "/subscription">subscriptions page</Link> to subscribe
            </Alert>
            }
            <MyMarketingPricing overrides={{
                'MyMarketingPricing' : {width:'100%', padding: '0', marginTop:'30px'}
            }}/>
            <MyMarketingFooter overrides={{
                "MyMarketingFooter":{width:'100%',marginTop:'30px'},
                "text1" : {fontFamily:'var(--amplify-fonts-default-variable)'},
                "text2" : {fontFamily:'var(--amplify-fonts-default-variable)'},
                "text3" : {fontFamily:'var(--amplify-fonts-default-variable)'},
                "text4" : {fontFamily:'var(--amplify-fonts-default-variable)'},
                "Rectangle 738":{width:'100%', backgroundColor: 'var(--amplify-colors-overlay-70)'}
            }}/>
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