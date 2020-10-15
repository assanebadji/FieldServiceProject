import React from "react";
import { AppRegistry, Image, StatusBar } from "react-native";
import { Container, Content, Text, List, ListItem } from "native-base";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../HomeScreen/HomeScreen";  
import ProductScreen from "../ProductScreen/Product";
import Profile from "../ProfileScreen/ProfileScreen";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';


const Tab = createBottomTabNavigator();
export default class TabNavBar extends React.Component {

  render() {
    return (
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Planification') {
            iconName = focused
              ? 'ios-calendar'
              : 'ios-calendar';
          } else if (route.name === 'Produits') {
            iconName = focused ? 'ios-list' : 'ios-list';
          }
          else if (route.name === 'Profil') {
            iconName = focused ? 'man' : 'man';
          }
          

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color="#4F8EF7" />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
      >
      <Tab.Screen name="Planification" component={HomeScreen} />
      <Tab.Screen name="Produits" component={ProductScreen} />
      <Tab.Screen name="Profil" component={Profile} /> 
    </Tab.Navigator>
    );
  }
}
