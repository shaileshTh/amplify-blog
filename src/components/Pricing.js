import MyNav from "./MyNav";
import { MyMarketingPricing, MyMarketingFooter } from '../ui-components';
import { StyleSheet } from 'react-native';
import { Heading, Divider, useTheme, Alert } from '@aws-amplify/ui-react';
import { Link } from 'react-router-dom'



export default function Pricing(props){
    const { tokens } = useTheme();

    return(<div style = {{width:'100%', backgroundColor:'var(--amplify-colors-background-tertiary)'}}>
        <MyNav page = 'pricing' name = {props.name}/>
        <div style = {styles.container}>
    
            <div style = {{ maxWidth: '1200px', margin: '30px auto 0 auto' }}>
                <Heading level = {2} color = {tokens.colors.brand.primary[80]}><i>Pricing</i></Heading>
                <Divider  border={`${tokens.borderWidths.large} solid ${tokens.colors.brand.primary[80]}`}/>
            </div>
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