import MyNav from "./MyNav";
import { StyleSheet } from 'react-native';
import { Heading, Divider, useTheme } from '@aws-amplify/ui-react';
import Product from "./Product";


export default function Pricing(props){
    const { tokens } = useTheme();
    let loggedIn = false
    {props.name ? loggedIn = true : loggedIn = false}
    const products = [
        {
            id: 1,
            title: "Product #1",
            description: "Product Description. Lorem Ipsum",
            price: 99.99,
            new : true,
            imgsrc : "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/DZ09_smartwatch_with_home_screen_open.jpg/240px-DZ09_smartwatch_with_home_screen_open.jpg"
        },
        {
            id: 2,
            title: "Product #2",
            description: "Product Description #2. Lorem Ipsum",
            price: 11.99,
            new : false,
            imgsrc : "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/DZ09_smartwatch_with_home_screen_open.jpg/240px-DZ09_smartwatch_with_home_screen_open.jpg"
        },
        {
            id: 3,
            title: "Product #3",
            description: "Lorem Ipsum. Product Description #3. Lorem Ipsum",
            price: 21.99,
            new : false,
            imgsrc : "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/DZ09_smartwatch_with_home_screen_open.jpg/240px-DZ09_smartwatch_with_home_screen_open.jpg"
        }
    ]
      
    return(<div style = {{width:'100%', backgroundColor:'var(--amplify-colors-background-tertiary)'}}>
        <MyNav page = 'shop' name = {props.name}/>
        <div style = {styles.container}>
            <div style = {{ maxWidth: '1200px', margin: '30px auto 0 auto' }}>
                <Heading level = {2} color = {tokens.colors.brand.primary[80]}><i>Shop</i></Heading>
                <Divider  border={`${tokens.borderWidths.large} solid ${tokens.colors.brand.primary[80]}`}/>
            </div>

            {products.map((p) => {
                return(
                <Product loggedIn = {loggedIn} id = {p.id} key = {p.id} title = {p.title} description = {p.description} price = {p.price} new = {p.new} imgsrc = {p.imgsrc}/>
                )
            })}
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