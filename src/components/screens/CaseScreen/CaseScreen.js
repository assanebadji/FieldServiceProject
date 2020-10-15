import React from 'react'
import { View, Text, TouchableOpacity, TextInput, 
  Button, Picker,StyleSheet,SafeAreaView, 
  ScrollView ,Alert,ActivityIndicator,Image } from 'react-native';
import { Container, Card, CardItem, Content, Right,Left, Icon, Input} from "native-base";
import { API_BASE_URL } from '../../../config';
import Geolocation from '@react-native-community/geolocation';


export default class CaseScreen extends React.Component {
    
state = {
    accountname:'',
    status:'',
    subject:'',
    description:'',
    longitude: '',
    latitude: '',
    phone:'',
    fax:'',
    codeProduct:'',
    quantityProduct:'',
    error: null,
    isLoading: false,
    user: '',
    product:'',
    ActivityIndicator_Loading: false,
    info: '',
    inputCount: 3,
    data: [{ name: '' }],
  }

  
  onAddMore() {
    const newData = this.state.data;
    newData.push({ name: `input${this.state.inputCount + 1}` });
    this.setState(prevState => ({
      inputCount: prevState.inputCount + 1,
      data: newData,
    }));
  }
a
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

  handlePhone = (text) => {
    this.setState({ phone: text })
  }
  
  handleFax = (text) => {
    this.setState({ fax: text })
  }

  handleAccountName = (text) => {
    this.setState({ accountname: text })
  }
  handleStatus = (text) => {
    this.setState({ status: text })
  }

  handleSubject = (text) => {
    this.setState({ subject: text })
  }
  
  handleDescription = (text) => {
    this.setState({ description: text })
  }

  updateStatus = (leadstatus) => {
    this.setState({ leadstatus: leadstatus })
 }
 updateProduct = (product) => {
  this.setState({ product: product })
}

handleLongitude = (text) => {
    this.setState({ longitude: text });
    
}

handleLatitude = (text) => {
    this.setState({ latitude: text })
  }
  
handleCodeProduct = (text) => {
  /* const newData = this.state.data;
  newData.push({ name: `${this.state.codeProduct}`,text });
    this.setState(prevState => ({
      codeProduct: text,
      data: newData,
    })); */
   this.setState({ codeProduct: text })
}

handleQuantityProduct = (text) => {
  this.setState({ quantityProduct: text })
}

  
findCoordinates = () => {
    Geolocation.getCurrentPosition(
      position => {
      //  const location = JSON.stringify(position);
        this.setState({ 
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString(),
          error: null, });
      },
      //error => Alert.alert(error.message),
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 10000 }
    );
  };

  addCase = (accountname,phone,fax, status,subject,description,longitude,latitude) =>
   {

    this.setState({ ActivityIndicator_Loading : true }, () =>
    {
      fetch(API_BASE_URL + '/createdCase', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "accountname": accountname,
          "status": status,
          "phone": phone,
          "fax": fax,
          "subject": subject,
          "description": description,
          "longitude": longitude,
          "latitude": latitude,
  
         }),
      })
      .then((response) => response.json())
      .then((responseData) => {
              "POST Response",
              "Response Body -> " + JSON.stringify(responseData)
              alert(JSON.stringify(responseData));
              this.setState({ ActivityIndicator_Loading : false });
      }).catch((error) =>
      {
          console.error(error);
          alert(error);
          this.setState({ ActivityIndicator_Loading : false});
      });
    });
};

  render() {
    return (
        
        <ScrollView  style = {styles.container}>
            
         <TextInput style = {styles.input}
            underlineColorAndroid = "transparent"
            placeholder = "Nom Account"
            placeholderTextColor = ""
            autoCapitalize = "none"
            onChangeText = {this.handleNameContact}/>

        <TextInput style = {styles.input}
            underlineColorAndroid = "transparent"
            placeholder = "Statut"
            placeholderTextColor = ""
            autoCapitalize = "none"
            onChangeText = {this.handleStatus}/>

        <TextInput style = {styles.input}
            underlineColorAndroid = "transparent"
            placeholder = "Telephone"
            placeholderTextColor = ""
            autoCapitalize = "none"
            onChangeText = {this.handlePhone}/>


       
        <TextInput style = {styles.input}
            underlineColorAndroid = "transparent"
            placeholder = "Subject"
            placeholderTextColor = ""
            autoCapitalize = "none"
            onChangeText = {this.handleSubject}/>
            
        

        <TextInput style = {styles.input}
            underlineColorAndroid = "transparent"
            placeholder = "Description"
            placeholderTextColor = ""
            autoCapitalize = "none"
            onChangeText = {this.handleDescription}/>

          {this.state.data.map(d => (
          <View style={styles.inputWrapper} key={d.name}>
            <Picker selectedValue = {this.state.codeProduct} onValueChange = {this.handleCodeProduct}>
                <Picker.Item label = "Produit interessé" value = "" />
                <Picker.Item label = "Adja" value = "Adja" />
                <Picker.Item label = "Dolima" value = "Dolima" />
                <Picker.Item label = "Ami" value = "Ami" />
                <Picker.Item label = "Mami" value = "Mami" />
            </Picker>
            <Text style = {styles.text}>{this.state.codeProduct}</Text>
            <TextInput style = {styles.input}
              underlineColorAndroid = "transparent"
              placeholder = "Quantité produit"
              placeholderTextColor = ""
              autoCapitalize = "none"
              onChangeText = {this.handleQuantityProduct}/>
{/* 
            <TextInput
              style={styles.input}
              defaultValue={d.name}
            /> */}
          </View>
        ))}
        
         <TouchableOpacity
            // style = {styles.otherProduct}
            onPress = { this.onAddMore.bind(this)}>
              <Image source={require('../../images/plus.jpg')} style={{ marginLeft:287, width:40,height:45}}/>
             <Text style = {styles.submitButtonText}> Ajouter des produits </Text> 
          </TouchableOpacity>
        
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
       borderColor: '#0070d2',
       borderWidth: 1
    },
    submitButton: {
       backgroundColor: '#0070d2',
       padding: 10,
       margin: 15,
       height: 40,
       marginBottom:40
    },
    submitButtonText:{
       color: 'white'
    }
  })