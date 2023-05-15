import  MyNav  from './MyNav'
import { Heading, Divider, useTheme, Button } from '@aws-amplify/ui-react'
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-web';
import { API } from 'aws-amplify';
import { v4 as uuidv4 } from 'uuid';



export default function NewPost(props){
    let n = 0;
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [id, setId] = useState(0)
    const { tokens } = useTheme();

    return(
        <div style = {{width:'100%', backgroundColor:'var(--amplify-colors-background-tertiary)'}}>
          <MyNav customerId = {props.customerId} name = {props.name} page = "new-post"/>
          <div style = {{maxWidth:'1200px', margin:'30px auto 0 auto'}}>
            <Heading level = {2} color = {tokens.colors.brand.primary[80]}><i>New Post</i></Heading>
            <Divider  border={`${tokens.borderWidths.large} solid ${tokens.colors.brand.primary[80]}`}/>
          </div>
          {/* <Heading level={3}>New Post</Heading> */}
          <View style = {styles.addPostContainer}>
          <TextInput value = {title} onChangeText = {(e)=> setTitle(e)} style = {styles.input} placeholder = "Enter Title"/>
          <TextInput value = {description} onChangeText = {(e)=> setDescription(e)} style = {styles.descriptionInput} 
            multiline = {true}
            placeholder = "Enter Description"/>
            <div style = {{width: '150px', paddingLeft:'10px'}}>
              <Button variation = "primary" onClick={() => {
                   API.post("myAPI", "/posts", {
                    body: {
                      id: uuidv4(),
                      title: title,
                      description: description,
                      userId: 'my id',
                      username: props.username,
                      name: props.name,
                      createdAt: new Date().toISOString()
                    }
                  }).then((r) => {
                    if(r.success) window.alert("Post Submitted!")
                    window.location.reload()
                  })
                  }
                }>Submit Post</Button>
            </div>
        </View>
        </div>
    )
}

const styles = StyleSheet.create({
    addPostContainer:{
        textAlign: 'left',
        backgroundColor: 'var(--amplify-colors-background-primary)',
        maxWidth: '1200px',
        marginTop: '20px',
        marginBottom: '20px',
        marginRight: 'auto',
        marginLeft: 'auto',
        boxShadow:" 0px 5px 5px gray",
        padding: '30px'
      },
      input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
      descriptionInput: {
        height: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      }
})