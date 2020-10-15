import React from 'react'
import { View, Text, TouchableOpacity, TextInput, Picker,StyleSheet,Button,SafeAreaView, 
  ScrollView ,Alert,ActivityIndicator,Image} from 'react-native';
import { Container, Card, CardItem, Content, Right,Left, Icon, Input} from "native-base";
import { API_BASE_URL } from '../../../config';
import Geolocation from '@react-native-community/geolocation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { oauth, net, network, smartstore, mobilesync} from 'react-native-force';


import Select from 'react-select/src/Select';

 
export default class LeadScreen extends React.Component {
   
state = {
    firstname:'',
    lastname:'',
    company:'',
    phone:'',
    fax:'',
    title:'',
    email: '',
    leadstatus: '',
    longitude: '',
    latitude: '',
    error: null,
    isLoading: false,
    user: '',
    product:'',
    ActivityIndicator_Loading: false,
    info: '',
    inputCount: 3,
    data: [{ name: '' }],
  }

  handleFirstname = (text) => {
    this.setState({ firstname: text })
  }
  handleLastname = (text) => {
    this.setState({ lastname: text })
  }
  handleCompany = (text) => {
    this.setState({ company: text })
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

handleLongitude = (text) => {
    this.setState({ longitude: text });   
}

handleLatitude = (text) => {
    this.setState({ latitude: text })
}

handleBackHome = (props) =>  {
  this.props.navigation.goBack()
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
  
  
  componentDidMount() {
    oauth.getAuthCredentials(
   (result) =>  this.setState({accessTokens: result.accessToken,
                               userId:result.userId,
                               data:result,
   }))
 
 }
  addLead = (accessToken,firstname, lastname,company,phone,title,email,longitude,latitude) =>
   {
    this.setState({ ActivityIndicator_Loading : true }, () =>
    {
      fetch(API_BASE_URL + '/lead', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          "leadInformation":
          {
           "lastName":lastname,
           "firstName":firstname,
           "company":company,
           "phone":phone,
           "title":title,
           "email":email,
           "latitude":latitude,
           "longitude":longitude
         }
           
        }),
      })
      .then((response) => response.json())
      .then((responseData) => {
              "POST Response",
              "Response Body -> " + JSON.stringify(responseData)
              alert(JSON.stringify(responseData));
              //alert('Prospect créé avec succé');
              
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
      <Container>
        <Content padder>
        <Card>
          <CardItem>
            {/* <Icon active name="info" /> */}
            <Text><Ionicons name="create" size={30} color="#4F8EF7" /> Creation d'un prospect</Text>
            <Right>
             {/*  <Icon name="close" /> */}
            </Right>
          </CardItem>
        </Card>
        <ScrollView  style = {styles.container}>

        <View style={styles.SectionStyle}>
          <Ionicons name="person" size={30} color="#0070d2" />
          <TextInput style={{flex:1,borderColor: '#0070d2'}}
            underlineColorAndroid = "transparent"
            placeholder = "Prénom"
            placeholderTextColor = ""
            autoCapitalize = "none"
            onChangeText = {this.handleFirstname}/>
        </View>
        <View style={styles.SectionStyle}>
          <Ionicons name="person" size={30} color="#0070d2" />
          <TextInput style={{flex:1,borderColor: '#0070d2'}}
            underlineColorAndroid = "transparent"
            placeholder = "Nom"
            placeholderTextColor = ""
            autoCapitalize = "none"
            onChangeText = {this.handleLastname}/>
        </View>

       <View style={styles.SectionStyle}>
          <Ionicons name="information-circle-outline" size={30} color="#0070d2" />
            <TextInput style={{flex:1,borderColor: '#0070d2'}}
            underlineColorAndroid = "transparent"
            placeholder = "Entreprise"
            placeholderTextColor = ""
            autoCapitalize = "none"
            onChangeText = {this.handleCompany}/>
       </View>
       
       <View style={styles.SectionStyle}>
          <Ionicons name="phone-portrait" size={30} color="#0070d2" />
          <TextInput style={{flex:1,borderColor: '#0070d2'}}
            underlineColorAndroid = "transparent"
            placeholder = "Telephone"
            placeholderTextColor = ""
            autoCapitalize = "none"
            onChangeText = {this.handlePhone}/>
      </View>

      <View style={styles.SectionStyle}>
          <Ionicons name="information" size={30} color="#0070d2" />
          <TextInput style={{flex:1,borderColor: '#0070d2'}}
            underlineColorAndroid = "transparent"
            placeholder = "Titre"
            placeholderTextColor = ""
            autoCapitalize = "none"
            onChangeText = {this.handleTitle}/>
     </View>
     <View style={styles.SectionStyle}>
          <Ionicons name="mail" size={30} color="#0070d2" />
          <TextInput style={{flex:1,borderColor: '#0070d2'}}
            underlineColorAndroid = "transparent"
            placeholder = "Email"
            placeholderTextColor = ""
            autoCapitalize = "none"
            onChangeText = {this.handleEmail}/>
    </View>
         {/*  <Picker selectedValue = {this.state.leadstatus} onValueChange = {this.updateStatus}>
               <Picker.Item label = "Statut prospect" value = "" />
               <Picker.Item label = "Open - Not Contacted" value = "Open - Not Contacted" />
               <Picker.Item label = "Working - Contacted" value = "Working - Contacted" />
               <Picker.Item label = "Closed - Converted" value = "Closed - Converted" />
               <Picker.Item label = "Closed - Not Converted" value = "Closed - Not Converted" />
        </Picker> */}
       {/*  <Text style = {styles.text}>{this.state.leadstatus}</Text> */}

             {/*<TextInput style = {styles.input}
            underlineColorAndroid = "transparent"
            placeholder = "Statut Prospect"
            placeholderTextColor = ""
            autoCapitalize = "none"
            onChangeText = {this.handleLeadstatus}/> */}
          <TouchableOpacity
            style = {styles.submitButtonCoordonnee}
            onPress = {
              () => this.findCoordinates()
            }>
          <Text style = {styles.submitButtonText}>
          <Ionicons name="pin" size={30} color="white" />  Obtenir mes coordonnés GPS? </Text>
          </TouchableOpacity>
        
        <View style={styles.SectionStyle}>
          <Ionicons name="cellular" size={30} color="#0070d2" />
          <TextInput style={{flex:1,borderColor: '#0070d2'}}
            underlineColorAndroid = "transparent"
            placeholderTextColor = ""
            placeholder = "Longitude"
            autoCapitalize = "none"
            defaultValue={this.state.longitude}
            onChangeText = {this.handleLongitude}/>
        </View>
        <View style={styles.SectionStyle}>
            <Ionicons name="cellular" size={30} color="#0070d2" />
            <TextInput style={{flex:1,borderColor: '#0070d2'}}
            underlineColorAndroid = "transparent"
            placeholder = "Latitude"
            autoCapitalize = "none"
            defaultValue={this.state.latitude}
            onChangeText = {this.handleLatitude}
            />
          </View>
          
          {/* <TextInput style = {styles.input}
            underlineColorAndroid = "transparent"
            placeholder = "Produit interessé"
            autoCapitalize = "none"
            onChangeText = {this.handleCodeProduct}/> */}
{/* 
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

          </View>
        ))} */}
        
      {/*    <TouchableOpacity
            // style = {styles.otherProduct}
            onPress = { this.onAddMore.bind(this)}>
              <Image source={require('../../images/plus.jpg')} style={{ marginLeft:287, width:40,height:45}}/>
             <Text style = {styles.submitButtonText}> Ajouter des produits </Text> 
          </TouchableOpacity> */}
            <CardItem>
              <Left>
                <TouchableOpacity
                  style = {styles.submitButton}
                  onPress = {
                    () => this.addLead(this.state.accessTokens,this.state.firstname,this.state.lastname,this.state.company,
                          this.state.phone,this.state.title,this.state.email,
                          this.state.longitude,this.state.latitude)
                  }>
                  <Text style = {styles.submitButtonText}> 
                  <Ionicons name="save" size={30} color="white" /> Sauvegarder </Text>
              </TouchableOpacity>
            </Left>
            <Right>
              <TouchableOpacity
                    style = {styles.submitButtonBack}
                    onPress = {
                      () => this.handleBackHome()
                    }>
                  <Ionicons name="arrow-back" size={30} color="white" />
              </TouchableOpacity>
            </Right>
            </CardItem>
              {
                this.state.ActivityIndicator_Loading ? 
              <ActivityIndicator color='#4F8EF7' size='large' style={styles.ActivityIndicatorStyle} /> : null
              }
        </ScrollView>
      </Content>
    </Container>
       
    )
  }
}

const styles = StyleSheet.create({
  
    container: {
       paddingTop: 23
    },
    text: {
      fontSize: 15,
      alignSelf: 'center',
      color: '#0070d2'
   },
    welcome: {
      fontSize: 20,
      color: '#0070d2'
    },
    ButtonCoordonnee:{
      padding:50,
      backgroundColor: '#0070d2',
      marginTop:40
    },
    coordonnee:{
      marginLeft:15
    },
    input: {
       margin: 15,
       height: 40,
       borderColor: '#0070d2',
       borderWidth: 1
    },
    submitButton: {
       backgroundColor: '#0070d2',
       padding: 2,
       margin: 1,
       height: 45,
       marginBottom:40
    },
    submitButtonCoordonnee: {
      backgroundColor: '#0070d2',
      padding: 10,
      margin: 15,
      height: 56,
      marginBottom:40
   },
    submitButtonBack: {
      backgroundColor: '#0070d2',
      padding: 5,
      margin: 5,
      height: 40,
      marginBottom:20
   },
   
    otherProduct: {
      backgroundColor: '#0070d2',
      padding: 10,
      marginLeft:150,
      marginRight:12,
      height: 40,
      marginBottom:40
   },
    submitButtonText:{
       color: 'white'
    },
    ActivityIndicatorStyle:{    
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: .5,
    borderColor: '#000',
    height: 40,
    borderRadius: 5 ,
    margin: 10,
    marginLeft:15
},
})