import React from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet,Button,SafeAreaView, ScrollView } from 'react-native';


export default class ContactScreen extends React.Component {
    
state = {
    firstname:'',
    lastname:'',
    phone:'',
    title:'',
    email: '',
    accountname: ''
  }
  handleFirstname = (text) => {
    this.setState({ firstname: text })
  }
  handleLastname = (text) => {
    this.setState({ lastname: text })
  }

  handlePhone = (text) => {
    this.setState({ phone: text })
  }
  
  handleTitle = (text) => {
    this.setState({ title: text })
  }
  handleEmail = (text) => {
    this.setState({ email: text })
  }
  handleAccountname = (text) => {
    this.setState({ leadstatus: text })
  }
  login = (email, pass) => {
    alert('email: ' + email + ' password: ' + pass)
  }

  render() {
    return (
        
        <ScrollView  style = {styles.container}>
            
         <TextInput style = {styles.input}
            underlineColorAndroid = "transparent"
            placeholder = "Prénom"
            placeholderTextColor = ""
            autoCapitalize = "none"
            onChangeText = {this.handleFirstname}/>

        <TextInput style = {styles.input}
            underlineColorAndroid = "transparent"
            placeholder = "Nom"
            placeholderTextColor = ""
            autoCapitalize = "none"
            onChangeText = {this.handleLastname}/>

       
        <TextInput style = {styles.input}
            underlineColorAndroid = "transparent"
            placeholder = "Telephone"
            placeholderTextColor = ""
            autoCapitalize = "none"
            onChangeText = {this.handlePhone}/>
            
        

        <TextInput style = {styles.input}
            underlineColorAndroid = "transparent"
            placeholder = "Titre"
            placeholderTextColor = ""
            autoCapitalize = "none"
            onChangeText = {this.handleTitle}/>

        <TextInput style = {styles.input}
           underlineColorAndroid = "transparent"
           placeholder = "Email"
           placeholderTextColor = ""
           autoCapitalize = "none"
           onChangeText = {this.handleEmail}/>
        
        <TextInput style = {styles.input}
           underlineColorAndroid = "transparent"
           placeholder = "Nom du compte"
           placeholderTextColor = ""
           autoCapitalize = "none"
           onChangeText = {this.handleAccountname}/>
          
      
   
        
        <TouchableOpacity
           style = {styles.submitButton}
           onPress = {
              () => this.login(this.state.email, this.state.password)
           }>
           <Text style = {styles.submitButtonText}> Sauvegarder </Text>
        </TouchableOpacity>
     </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
    container: {
       paddingTop: 23
    },
    input: {
       margin: 15,
       height: 40,
       borderColor: '#7a42f4',
       borderWidth: 1
    },
    submitButton: {
       backgroundColor: '#7a42f4',
       padding: 10,
       margin: 15,
       height: 40,
       marginBottom:40
    },
    submitButtonText:{
       color: 'white'
    }
  })