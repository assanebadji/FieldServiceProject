import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  FlatList,
  PermissionsAndroid,
  Dimensions,
  ActivityIndicator
} from 'react-native';
//import MapView  from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import MapView, {
  Marker,
  AnimatedRegion,
  Polyline,
  PROVIDER_GOOGLE
} from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import { createStackNavigator } from '@react-navigation/stack';
import { oauth, net, network, smartstore, mobilesync} from 'react-native-force';
import { API_BASE_URL,API_BASE_URL_DETAIL,accessToken } from '../../../config';
import { Container, Header, Content, List, ListItem, Left,Table, Body, Title, Item, Input, Right, Icon, Button } from "native-base";
import Geolocation from '@react-native-community/geolocation';

//navigator.geolocation = require('@react-native-community/geolocation');

const Stack = createStackNavigator();
const origin = {latitude: 37.3318456, longitude: -122.0296002};
const destination = {latitude: 37.771707, longitude: -122.4053769};

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 14.867551500000001;
const LONGITUDE = -16.8178377;
const LATITUDE_DELTA = 0.8;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const GOOGLE_MAPS_APIKEY = 'AIzaSyBfD7rXFNzAE2mXa71YZiYa1eJAHvLucfU';


export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    // AirBnB's Office, and Apple Park
    this.state = {
      accounts: [],
      data: [],
      dataUsername: [],
      accessTokens:'',
      latitude: null,
      userId :'',
      userName :'',
      longitude: null,
      distance:null,
      duration:null,
      account:null,
      ActivityIndicator_Loading: false,
      error: null,
      coordinates: [
        {
          latitude: 14.867551500000001,
          longitude: -16.8178377,
        },
        {
          latitude: 14.867551500000001,
          longitude: -16.8178377,
        },
      ],
      routeCoordinates: [],
      distanceTravelled: 0,
      prevLatLng: {},
      coordinate: new AnimatedRegion({
      latitude: LATITUDE,
      longitude: LONGITUDE
    })
    };

    this.mapView = null;
  }

  onMapPress = (e) => {
    this.setState({
      coordinates: [
        ...this.state.coordinates,
        e.nativeEvent.coordinate,
      ],
    });
  }

 getAccounts=(accessTokens,userId) =>      {
    fetch(API_BASE_URL_DETAIL + `/account?userid=${userId}`, {
     headers: {
         Authorization: `Bearer ${accessTokens}`,
     },})
     .then(response => response.json())
     .then(responseJson => {
         this.setState({
           accounts:responseJson.data,
           account:JSON.stringify(responseJson.data),
         });
         this.setState({ ActivityIndicator_Loading : false });
     })
     .catch(error => {null;
       alert(error);
       this.setState({ ActivityIndicator_Loading : false});
   });
   
}

componentDidMount() {
  oauth.getAuthCredentials(
    (result) =>  this.getAccounts(result.accessToken,result.userId))
  this.setState({ ActivityIndicator_Loading : true })
}

  render() {
    return (
      <View style={styles.container}>
        {this.state.accounts && this.state.accounts.map((acc, index) => (
          <MapView 
            style={styles.map}
            initialRegion={{
            latitude: acc.latitude,
            longitude: acc.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        }}
        showUserLocation={true}
        followUserLocation={true}
        zoomEnabled={true}
        ref={c => this.mapView = c}
        onPress={this.onMapPress}
        >
        {this.state.accounts && this.state.accounts.map((acc, index) => (
        <MapView.Marker  coordinate={{
            latitude: acc.latitude,
            longitude: acc.longitude}} 
            title={acc.name}
            description={acc.phone}
            />
            ))
     }
          <MapViewDirections
            origin={{
              latitude: acc.latitude,
              longitude: acc.longitude,
          }}
            destination={{
              latitude: acc.latitude,
              longitude: acc.longitude,
          }}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="hotpink"
            optimizeWaypoints={true}

          />
     </MapView>  ))
     }
     {
      this.state.ActivityIndicator_Loading ? 
      <ActivityIndicator color='#4F8EF7' size='large' style={styles.ActivityIndicatorStyle} /> : null
    }
      </View>
    )
  }
}

//import MapView from 'react-native-maps';
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 600,
    //width: 500,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    marginBottom:100,
    marginTop:10
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
  welcome: {
    fontSize: 20,
    textAlign: "center",
    marginTop:150
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  coordonnee:{
    marginTop:80
  }
 });

/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5059ae',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 18,
    padding: 10,
    color: '#fff'
  }
})
 */