import React from 'react'
import { View, Text, TouchableOpacity, TextInput, Picker,StyleSheet,Button,SafeAreaView, 
  ScrollView ,Alert,ActivityIndicator,Image} from 'react-native';
import { Container, Card, CardItem, Content, Right,Left, Icon, Input} from "native-base";
import { API_BASE_URL } from '../../../config';
import { oauth, net, network, smartstore, mobilesync} from 'react-native-force';
import Geolocation from '@react-native-community/geolocation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Select from 'react-select/src/Select';

 
export default class AccountScreen extends React.Component {
   
state = {
    nameAccount:'',
    nameZone:'',
    firstname:'',
    lastname:'',
    phone:'',
    token:'',
    address:'',
    city: '',
    longitude: '',
    latitude: '',
    error: null,
    isLoading: false,
    accessTokens:'',
    userId :'',
    ActivityIndicator_Loading: false,
    fieldError:'',
    fieldErrorZone:'',
    errorStaus:[],
    status:'',
  }

  handleNameAccount = (text) => {
    this.setState({ nameAccount: text })
  }

  handleNameZone = (text) => {
    this.setState({ nameZone: text })
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
  
  handleAddress = (text) => {
    this.setState({ address: text })
  }
  handleCity = (text) => {
    this.setState({ city: text })
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
  
  addAccount = (accessToken,nameAccount,nameZone,firstname, lastname,address,phone,
                city,longitude,latitude) =>
   {
    //const accessToken = this.state.token;
    
    this.setState({ ActivityIndicator_Loading : true }, () =>
    {
      if (nameAccount == "") {
        this.setState(() => ({ fieldError: "champ  obligatoire." }));
      }
       /* else if (nameZone.trim() === "") {
        this.setState(() => ({ fieldErrorZone: "champ  obligatoire." }));
      }
      else if (firstname.trim() === "") {
        this.setState(() => ({ fieldError: "champ obligatoire." }));
      }
      else if (lastname.trim() === "") {
        this.setState(() => ({ fieldError: "champ  obligatoire." }));
      }
      else if (address.trim() === "") {
        this.setState(() => ({ fieldError: "champ  obligatoire." }));
      }
      else if (phone.trim() === "") {
        this.setState(() => ({ fieldError: "champ  obligatoire." }));
      }
      else if (city.trim() === "") {
        this.setState(() => ({ fieldError: "champ obligatoire." }));
      }
      else if (longitude.trim() === "") {
        this.setState(() => ({ fieldError: "champ obligatoire." }));
      }
      else if (latitude.trim() === "") {
        this.setState(() => ({ fieldError: "champ  obligatoire." }));
      }
      else {
        this.setState(() => ({ fieldError: null }));
      }
 */
      fetch(API_BASE_URL + '/account', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            "infodto":{
                   "name":nameAccount,
                   "firstname":firstname,
                   "lastname":lastname,
                   "phone":phone,
                   "adresse":address,
                   "city":city,
                   "longitude":longitude,
                   "latitude":latitude
            },
            "zonedto": {
                      "name":nameZone
            }
           }),
      })
      .then((response) => response.json())
      .then((responseData) => {
              "POST Response",
              "Response Body -> " + JSON.stringify(responseData)
              this.setState({
                status:responseData.status,
                errorStaus:responseData.error,
              });        
              if (this.state.status=='KO') {
                  this.state.errorStaus.map((acc, index) => (alert(acc.message)))
                //alert('Erreur creation de compte, veuillez remplir tous les champs');
              }
              if (this.state.status=='OK') {
                alert('Compte créé avec succé');
              }
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
            <Text>  <Ionicons name="create" size={30} color="#4F8EF7" /> Creation d'un compte</Text>
            <Right>
             {/*  <Icon name="close" /> */}
            </Right>
          </CardItem>
        </Card>
        <ScrollView  style = {styles.container}>
        <View style={styles.SectionStyle}>
          <Ionicons name="information-circle-outline" size={30} color="#0070d2" />
            <TextInput style={{flex:1,borderColor: '#0070d2'}}
              underlineColorAndroid = "transparent"
              placeholder = "Nom entreprise"
              placeholderTextColor = ""
              autoCapitalize = "none"
              onChangeText = {this.handleNameAccount}/>
        {!!this.state.fieldError && (
             <Text style={{ color: "#0070d2" }}>{this.state.fieldError}</Text>
        )}
        </View>
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
          <Ionicons name="phone-portrait" size={30} color="#0070d2" />
          <TextInput style={{flex:1,borderColor: '#0070d2'}}
            underlineColorAndroid = "transparent"
            placeholder = "Telephone"
            placeholderTextColor = ""
            autoCapitalize = "none"
            onChangeText = {this.handlePhone}/>
            
        </View>
        <View style={styles.SectionStyle}>
          <Ionicons name="home" size={30} color="#0070d2" />
          <TextInput style={{flex:1,borderColor: '#0070d2'}}
            underlineColorAndroid = "transparent"
            placeholder = "Adresse"
            placeholderTextColor = ""
            autoCapitalize = "none"
            onChangeText = {this.handleAddress}/>
          
        </View>
        <View style={styles.SectionStyle}>
          <Ionicons name="analytics" size={30} color="#0070d2" />
          <TextInput style={{flex:1,borderColor: '#0070d2'}}
            underlineColorAndroid = "transparent"
            placeholder = "Ville"
            placeholderTextColor = ""
            autoCapitalize = "none"
            onChangeText = {this.handleCity}/>
             
        </View>
        <TouchableOpacity
            style = {styles.submitButtonCoordonnee}
            onPress = {
              () => this.findCoordinates()
            }>
          <Text style = {styles.submitButtonText}>
          <Ionicons name="pin" size={30} color="white" /> Obtenir mes coordonnés GPS? </Text>
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
        <View style={styles.SectionStyle}>
          <Ionicons name="globe" size={30} color="#0070d2" />
          <TextInput style={{flex:1,borderColor: '#0070d2'}}
            underlineColorAndroid = "transparent"
            placeholder = "Nom de la zone"
            placeholderTextColor = ""
            autoCapitalize = "none"
            onChangeText = {this.handleNameZone}/>
           
          </View>
          <CardItem>
             <Left>
               <TouchableOpacity
                  style = {styles.submitButton}
                  onPress = {
                    () => this.addAccount(this.state.accessTokens,this.state.nameAccount,this.state.nameZone,this.state.firstname,
                      this.state.lastname,this.state.address,this.state.phone,this.state.city,this.state.longitude,
                      this.state.latitude)
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
      marginBottom:40,
      borderRadius: 5 
   },
   submitButtonCoordonnee: {
     backgroundColor: '#0070d2',
     padding: 10,
     margin: 15,
     height: 56,
     marginBottom:40,
     borderRadius: 5 
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
       color: 'white',
     
    },
    ActivityIndicatorStyle:{    
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
  }
  })