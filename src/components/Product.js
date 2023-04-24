import { Button, Badge, Card, Flex, Text, Image, StepperField } from '@aws-amplify/ui-react';
import { useCart } from "react-use-cart"

export default function Product(props){
    const { addItem, updateItemQuantity } = useCart()
    
    return(
        <Card variation="elevated" style = {{marginTop: '30px', marginBottom:'30px'}}>
        <Flex alignItems="flex-start">
            <Image src = {props.imgsrc}
            alt={props.title} width="8rem"/>
            <Flex direction="column" gap="xs">
            <Flex>
                {props.new && <Badge variation="success">New</Badge>}
            </Flex>
            <Text fontSize="large" fontWeight="semibold">
                {props.title}
            </Text>
            <Text color="font.tertiary">
                {props.description}
            </Text>
            <Text
                fontSize="large"
                color="secondary">
                ${props.price}
            </Text>
            <Flex>
                {props.loggedIn ? <Button variation="primary" onClick={() => addItem(props)}>Add to cart</Button> :
                <Button isDisabled  = {true} >Login to add to cart</Button>}
            </Flex>
            </Flex>
        </Flex>
        </Card>
    )
}
