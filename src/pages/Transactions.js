import { useEffect, useState } from 'react';
import { Alert, Placeholder } from '@aws-amplify/ui-react';
import  MyNav  from '../components/MyNav'
import  MyHeading  from '../components/MyHeading'
import { Auth, API } from 'aws-amplify';
import {
    Table,
    TableCell,
    TableBody,
    TableHead,
    TableRow,
  } from '@aws-amplify/ui-react';


export default function Transactions(props){
    
    const [loaded, setLoaded] = useState(false);
    const [transcations, setTranscations] = useState([])
    const [username, setUsername] = useState()
    useEffect(()=>{
    Auth.currentAuthenticatedUser().then((u)=>{
        setUsername(u.username)
        if(username){
            API.post('myAPI', '/get-transactions', {
                body: {
                    username: username
                }
            }).then((res)=>{
                setTranscations(res.reverse())
                setLoaded(true)
            }).catch(err => console.log(err))
        }
      })
       
    },[username])
    
    if(props.username) console.log(props.username)


    return(<div style = {{width:'100%', backgroundColor:'var(--amplify-colors-background-tertiary)'}}>
        <MyNav error = {props.error} subscriptionActive = {props.subscriptionActive} name = {props.name} page = "my-transactions"/>

        {props.name === undefined ? <Alert variation='warning' 
            style = {{fontSize:'x-large', maxWidth: '1200px', margin: '30px auto'}}>
              Please login to view your transactions
          </Alert> : <>
    
        <MyHeading title = "My Transactions"/>
          
        {loaded ?
        <div style = {{ maxWidth: '1200px', margin: '30px auto 0 auto', backgroundColor:'var(--amplify-colors-background-primary)'}}>
        <Table
            highlightOnHover={true}>
            <TableHead>
                <TableRow>
                <TableCell as="th">Payment ID</TableCell>
                <TableCell as="th">Total</TableCell>
                <TableCell as="th">Timestamp</TableCell>
                <TableCell as="th">Items</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {transcations.map((t) => {
                    let items = JSON.parse(t.stringifiedItems)
                    let itemsDisplay = ""
                    items.map((item) => {
                        itemsDisplay += item.quantity + " x " + item.title + " ($"+item.itemTotal.toFixed(2) + ") • "
                    })
                    return (
                        <TableRow key = {t.pId}>
                        <TableCell>{t.pId}</TableCell>
                        <TableCell>${t.amountInCents/100}</TableCell>
                        <TableCell>{t.timestamp.substring(0,34)}</TableCell>
                        <TableCell>{itemsDisplay}</TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table> 
        </div>
    :<div style = {{ maxWidth: '1200px', margin: '30px auto 0 auto' }}>
                <Placeholder/>
                <br/>
                <Placeholder/>
            </div>
        } </>}
    </div>
    )
}
