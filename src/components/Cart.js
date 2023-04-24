import { useCart } from 'react-use-cart';
import  MyNav  from './MyNav'
import { StyleSheet } from 'react-native';
import { Heading, Divider, Image, Button, View, useTheme, Card, Collection } from '@aws-amplify/ui-react';


export default function Cart(props) {
    const {
      isEmpty,
      items,
      totalItems,
      cartTotal,
      updateItemQuantity,
      removeItem,
    } = useCart();
    const { tokens } = useTheme();
  
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
            maxWidth="30rem"
            variation="outlined">
            <Image style = {{float:'right'}} src={item.imgsrc} alt={item.title} width="100px"/>
            <View>
                <Heading level = {5}>{item.title}</Heading>
                <Heading level = {5}>{item.quantity} x ${item.price}</Heading>
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
              </View>
            </Card>
          )}
        </Collection>
        <Card borderRadius="medium"
            maxWidth="30rem"
            variation="outlined"
            marginTop="30px">
            <Heading level = {5}>Total: {cartTotal.toFixed(2)}</Heading>
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
