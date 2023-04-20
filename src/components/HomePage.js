import { Features2x2n, MyHeroLayout1, MyMarketingFooter } from '../ui-components';
import  MyNav  from './MyNav'
import { StyleSheet } from 'react-native';

export default function HomePage(props){
    return(
        /* <ThemeProvider theme={studioTheme}> */
        <div style = {{width:'100%', background: 'var(--amplify-colors-background-tertiary)'}}>
            <MyNav name = {props.name}/>
            <div style = {styles.container}>
            <MyHeroLayout1 overrides={{
                "subtitle": {fontFamily:'var(--amplify-fonts-default-variable)'}, 
                "title": {fontFamily:'var(--amplify-fonts-default-variable)'}, 
                "paragraph": {fontFamily:'var(--amplify-fonts-default-variable)'}, 
                "MyHeroLayout1":{width:'100%'}
            }}/>
            <Features2x2n overrides={{
                "Features2x2n":{width:'100%'},
                "titleA": {fontFamily:'var(--amplify-fonts-default-variable)'}, 
                "paragraphA": {fontFamily:'var(--amplify-fonts-default-variable)'}, 
                "titleB": {fontFamily:'var(--amplify-fonts-default-variable)'}, 
                "paragraphB": {fontFamily:'var(--amplify-fonts-default-variable)'}, 
                "titleC": {fontFamily:'var(--amplify-fonts-default-variable)'}, 
                "paragraphC": {fontFamily:'var(--amplify-fonts-default-variable)'}, 
                "titleD": {fontFamily:'var(--amplify-fonts-default-variable)'}, 
                "paragraphD": {fontFamily:'var(--amplify-fonts-default-variable)'}, 
            }}/>
            <MyMarketingFooter overrides={{
                "MyMarketingFooter":{width:'100%'},
                "text1" : {fontFamily:'var(--amplify-fonts-default-variable)'},
                "text2" : {fontFamily:'var(--amplify-fonts-default-variable)'},
                "text3" : {fontFamily:'var(--amplify-fonts-default-variable)'},
                "text4" : {fontFamily:'var(--amplify-fonts-default-variable)'},
                "Rectangle 738":{width:'100%', backgroundColor: 'var(--amplify-colors-overlay-70)'}
            }}/>
            </div>
        </div>
        /* </ThemeProvider> */
    )
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