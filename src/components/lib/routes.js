import * as React from 'react';
import { Text, View,Button,TouchableOpacity,Image,Icon } from 'react-native';
import { NavigationContainer,DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LeadScreen from "../screens/LeadScreen/LeadScreen";
import { oauth, net, network, smartstore, mobilesync} from 'react-native-force';
import ContactScreen from "../screens/ContactScreen/ContactScreen";
import CaseScreen from "../screens/CaseScreen/CaseScreen";
import OpportunityScreen from "../screens/OpportunityScreen/OpportunityScreen";
import EventScreen from "../screens/EventScreen/EventScreen";
import AccountScreen from "../screens/AccountScreen/AccountScreen";
import TabNavBar from "../screens/TabNavBar/TabNavBar"; 
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

handleLogoutClick = () =>  {
  oauth.logout();
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Deconnexion"
        onPress = {
          () => this.handleLogoutClick()
        }
        icon={({ focused, color, size }) => {
          return (
            <Ionicons name="power" size={30} color="#4F8EF7" />
          );
        }}
        > 
      </DrawerItem>
      <DrawerItem
        label="Fermer la fenetre"
        onPress={() => props.navigation.closeDrawer()}
        icon={({ focused, color, size }) => {
          return (
            <Ionicons name="close-circle" size={30} color="#4F8EF7" />
          );
        }}
        >
        </DrawerItem>
    </DrawerContentScrollView>
  );
}


const Drawer = createDrawerNavigator();
function MyDrawer() {
  return (
    
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Accueil" component={MyStacks}
        options={{ drawerLabel: 'Accueil',
        drawerIcon: (({focused}) => <Ionicons name="home" size={30} color="#4F8EF7" />)
        }} 
      />
      <Drawer.Screen name="Nouveau Prospect" component={LeadScreen} 
        options={{ drawerLabel: 'Nouveau Prospect',
        drawerIcon: (({focused}) => <Ionicons name="add-circle" size={30} color="#4F8EF7" />)
        }} 
      />
      <Drawer.Screen name="Nouveau Account" component={AccountScreen}
        options={{ drawerLabel: 'Nouveau Account',
        drawerIcon: (({focused}) => <Ionicons name="person-add" size={30} color="#4F8EF7" />)
        }} 
       />
      <Drawer.Screen name="Nouvelle Opportunitée" component={OpportunityScreen} 
        options={{ drawerLabel: 'Nouvelle Opportunitée',
        drawerIcon: (({focused}) => <Ionicons name="medkit" size={30} color="#4F8EF7" />)
        }} 
      />
     {/*  <Drawer.Screen name="Nouveau Contact" component={ContactScreen} /> */}
    </Drawer.Navigator>
  );
}


const Stack = createStackNavigator();
function MyStacks({ navigation }) {
  return (
    <View  style={{ flex: 1}}>
       
        <Stack.Navigator>
          <Stack.Screen
            name="Planification"
            component={TabNavBar}
            options={{ title: '',
            headerStyle: {
              backgroundColor: '#0070d2',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              
              headerLeft: () => (
                <TouchableOpacity  onPress={() => navigation.openDrawer()}>
                   <Ionicons name="menu" size={30} color="white" />
                {/*   <Image source={require('../images/menu-button.png')} style={{ marginLeft:10}}/> */}
                </TouchableOpacity>
              ), }}     
          />
          
      </Stack.Navigator>
    </View>
  
		
  );
}


export default function App() {
  return (
    <NavigationContainer >
      <MyDrawer /> 
    </NavigationContainer>
  );
  
}
