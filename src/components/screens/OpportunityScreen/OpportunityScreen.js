import React from 'react'
import { View, Text, TouchableOpacity, TextInput,FlatList,
  Button, Picker,StyleSheet,SafeAreaView, 
  ScrollView ,Alert,Image,ActivityIndicator } from 'react-native';
import { Container, Card, CardItem, Content, Right,Left, Icon, Input} from "native-base";
import { oauth, net, network, smartstore, mobilesync} from 'react-native-force';
import { API_BASE_URL,API_BASE_URL_DETAIL } from '../../../config';
import Ionicons from 'react-native-vector-icons/Ionicons';

//import { InputAutoSuggest } from 'react-native-autocomplete-search';
import Autocomplete from 'react-native-autocomplete-input';

import Geolocation from '@react-native-community/geolocation';


export default class OpportunityScreen extends React.Component {

state = {
    accountNumber:'',
    opportunitieName:'',
    closeddate:'',
    codProd:'',
    quantite:'',
    ActivityIndicator_Loading: false,
    info: '',
    inputCount: 3,
    data: [{ name: '' }],
    productDTO: [
        {
            "codProd":'',
            "quantite":'',
        }
      ],
    accessTokens:'',
    userId :'',
    searchKeyword: '',
    searchKeywordproduct: '',
    searchResultsAccounts: [],
    searchResultsProducts: [],
    account: null,
    isShowingResults: false,
    isShowingResultsProducts: false,
    ActivityIndicator_Loading: false,
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

  handleAccountNumber = (text) => {
    this.setState({ accountNumber: text })
  }
  
  handleOpportunitieName = (text) => {
    this.setState({ opportunitieName: text })
  }

  handleCodProd = (text) => {
    this.setState({ codProd: text })
  }
  
handleQuantite = (text) => {
   this.setState({ quantite: text })
}


searchAccounts=(accessTokens,text) => {
    this.setState({searchKeyword: text});
    fetch(API_BASE_URL_DETAIL + `/account?name=${this.state.searchKeyword}`, {
     headers: {
         Authorization: `Bearer ${accessTokens}`,
     },})
     .then(response => response.json())
     .then(responseJson => {
         this.setState({
          searchResultsAccounts:responseJson.data,
          account:JSON.stringify(responseJson.data),
          isShowingResults: true,
         });
         this.setState({ ActivityIndicator_Loading : false });
     })
     .catch(error => {null;
       alert(error);
       this.setState({ ActivityIndicator_Loading : false});
   }); 
}

searchProducts=(accessTokens,text) => {
  this.setState({searchKeywordproduct: text});
  fetch(API_BASE_URL_DETAIL + `/products?searchname=${this.state.searchKeywordproduct}`, {
   headers: {
       Authorization: `Bearer ${accessTokens}`,
   },})
   .then(response => response.json())
   .then(responseJson => {
       this.setState({
        searchResultsProducts:responseJson.data,
        account:JSON.stringify(responseJson.data),
        isShowingResultsProducts: true,
       });
       this.setState({ ActivityIndicator_Loading : false });
   })
   .catch(error => {null;
     alert(error);
     this.setState({ ActivityIndicator_Loading : false});
 }); 
}
handleBackHome = (props) =>  {
  this.props.navigation.goBack()
}

componentDidMount() {
    oauth.getAuthCredentials(
    (result) =>  this.setState({accessTokens: result.accessToken,
                                userId:result.userId,
   }))
 
 }
  addOpportunity = (accessToken,accountNumber,opportunitieName,codProd,quantite) =>
   {

    
    this.setState({ ActivityIndicator_Loading : true }, () =>
    {
      fetch(API_BASE_URL + '/opportunitie', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            "opportunitieDTO":{
             "id":accountNumber,
             "opportunitieName":opportunitieName,
             "closeddate":"20200928"
            },
            "productDTO": {
                         "items": [
                                   {
                                    "codProd":codProd,
                                    "quantite":quantite
                                   }
                                 ]
                        }
                           
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
      <Container>
      <Content padder>
      <Card>
        <CardItem>
          {/* <Icon active name="info" /> */}
          <Text> <Ionicons name="create" size={30} color="#4F8EF7" /> Creation d'une opportunitée</Text>
          <Right>
           {/*  <Icon name="close" /> */}
          </Right>
        </CardItem>
      </Card>
      <ScrollView  style = {styles.container}>
      
      <View style={styles.SectionStyle}>
           <Ionicons name="business" size={30} color="#0070d2" />
          <TextInput
              style={{flex:1,borderColor: '#0070d2'}}
              placeholder = "Nom Opportunitée"
              placeholderTextColor = ""
              autoCapitalize = "none"
              underlineColorAndroid="transparent"
              onChangeText = {this.handleOpportunitieName}
              />
      </View>

    {/*   <TextInput style = {styles.input}
            underlineColorAndroid = "transparent"
            placeholder = "Nom Opportunitée"
            placeholderTextColor = ""
            autoCapitalize = "none"
            onChangeText = {this.handleOpportunitieName}/> */}

      <View style={styles.SectionStyle}>
          <Ionicons name="search" size={30} color="#0070d2" />
          <TextInput
              style={{flex:1,borderColor: '#0070d2'}}
              placeholder="Rechercher un compte"
             // returnKeyType="recherche"
              underlineColorAndroid="transparent"
              onChangeText={(text) => this.searchAccounts(this.state.accessTokens,text)}
              value={this.state.searchKeyword}/>
      </View>
          {this.state.isShowingResults && (
            <FlatList
              data={this.state.searchResultsAccounts}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={styles.resultItem}
                    onPress={() =>
                      this.setState({
                        searchKeyword: item.id,
                        isShowingResults: false,
                      })
                    }>
                    <Text style={styles.resultText}>{item.name}</Text>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item) => item.id}
              style={styles.searchResultsContainer}
            />
          )}
      
      <View style={styles.SectionStyle}>
          <Ionicons name="search" size={30} color="#0070d2" />
          <TextInput
              style={{flex:1,borderColor: '#0070d2'}}
              placeholder="Rechercher un produit"
             // returnKeyType="recherche"
              underlineColorAndroid="transparent"
              onChangeText={(text) => this.searchProducts(this.state.accessTokens,text)}
              value={this.state.searchKeywordproduct}
              />
      </View>
          {this.state.isShowingResultsProducts && (
            <FlatList
              data={this.state.searchResultsProducts}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={styles.resultItem}
                    onPress={() =>
                      this.setState({
                        searchKeywordproduct: item.codeProduct,
                        isShowingResultsProducts: false,
                      })
                    }>
                    <Text  style={styles.resultText}>{item.name}</Text>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item) => item.id}
              style={styles.searchResultsContainer}
            />
          )}

      <View style={styles.SectionStyle}>
        <Ionicons name="cart" size={30} color="#0070d2" />
          <TextInput
              style={{flex:1,borderColor: '#0070d2'}}
              placeholder = "Quantité produit"
              placeholderTextColor = ""
              autoCapitalize = "none"
              underlineColorAndroid="transparent"
              onChangeText = {this.handleQuantite}
              />
      </View>

        <CardItem>
           <Left>
             <TouchableOpacity
                style = {styles.submitButton}
                onPress = {
                  () => this.addOpportunity(this.state.accessTokens,
                    this.state.searchKeyword,this.state.opportunitieName,this.state.searchKeywordproduct,this.state.searchKeyword)
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
    resultText:{
      color: 'white'
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
    input: {
       margin: 15,
       height: 40,
       borderColor: '#0070d2',
       borderWidth: 1
    },
    autocompleteInput: {
      margin: 15,
      height: 5,
      //borderWidth: 1
   },
   autocompleteContainer: {
    backgroundColor: 'white',
    marginLeft:15,
    marginRight:15,
    borderColor: '#0070d2',
    borderWidth: 0
  },
    submitButton: {
      backgroundColor: '#0070d2',
      padding: 2,
      margin: 0,
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
  submitButtonText:{
       color: 'white'
  },
  descriptionContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    autocompleteContainer: {
      zIndex: 1,
    },
    searchResultsContainer: {
      width: 340,
      height: 200,
      backgroundColor: '#0070d2',
      color:'white',
      position: 'absolute',
      top: 50,
    },
    dummmy: {
      width: 600,
      height: 200,
      backgroundColor: 'hotpink',
      marginTop: 20,
    },
    resultItem: {
      width: '100%',
      justifyContent: 'center',
      height: 40,
      color:'white',
      borderBottomColor: 'white',
      borderBottomWidth: 1,
      paddingLeft: 15,
    },
    ImageStyle: {
      padding: 10,
      margin: 5,
      height: 25,
      width: 25,
      resizeMode : 'stretch',
      alignItems: 'center'
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