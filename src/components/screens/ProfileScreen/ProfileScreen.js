import React from "react";
import { AppRegistry, Alert,
  FlatList,
  Image,
  ImageBackground,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View } from "react-native";
import { Container, Header, Left, Body, Title, Card, CardItem, Content, Right, Icon, Button } from "native-base";
import Ionicons from 'react-native-vector-icons/Ionicons';

const image = { uri: "https://reactjs.org" };

export default class Profile extends React.Component {

  renderHeader = () => {
  /*   const {
      avatar,
      avatarBackground,
      name,
      address: { city, country },
    } = this.props */

    return (
      <View style={styles.headerContainer}>
        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={10}
          source={image} 
        >
          <View style={styles.headerColumn}>
            <Image
              style={styles.userImage}
              source={require('../../images/user.jpg')}
            
            />
            <Text style={styles.userNameText}>Sana Badji</Text> 
            <View style={styles.userAddressRow}>
              <View>
                 <Ionicons name="information-circle" size={30} color="#4F8EF7" />
              </View>
              <View style={styles.userCityRow}>
                <Text style={styles.userCityText}>
                Agent Commercial
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
        <Text style = {styles.text}>
            <Text style = {styles.capitalLetter}>
               L
            </Text>
            
            <Text>
               orem ipsum dolor sit amet, sed do eiusmod.
            </Text>
            
            <Text>
               Ut enim ad <Text style = {styles.wordBold}>minim </Text> veniam,
               quis aliquip ex ea commodo consequat.
            </Text>
            
            <Text style = {styles.italicText}>
               Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.
            </Text>
            
            <Text style = {styles.textShadow}>
               Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
               deserunt mollit anim id est laborum.
            </Text>
         </Text>
      
      </View>
    )
  }

  
  componentDidMount() {
   // Alert.alert("No Users Found", "Oops, Looks like you are not signed in");
  }
 
  renderContent = () => (
    <FlatList
      contentContainerStyle={styles.telContainer}
      data={this.props.tels}
      renderItem={(list) => {
        const { id, name, number } = list.item

        return (
          <Tel
            key={`tel-${id}`}
            index={list.index}
            name={name}
            number={number}
            onPressSms={this.onPressSms}
            onPressTel={this.onPressTel}
          />
        )
      }}
    />
  )
 
/*   renderEmail = () => (
    <FlatList
      contentContainerStyle={styles.emailContainer}
      data={this.props.emails}
      renderItem={(list) => {
        const { email, id, name } = list.item

        return (
          <Email
            key={`email-${id}`}
            index={list.index}
            name={name}
            email={email}
            onPressEmail={this.onPressEmail}
          />
        )
      }}
    />
  )
 */
  render() {
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
            {this.renderHeader()}
           {/*  {this.renderTel()} */}
            {/* {Separator()}
            {this.renderEmail()} */}
          </Card>
        </View>
      </ScrollView>
    )
  }
}



const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
  },
  emailContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 45,
  },
  headerContainer: {},
  headerColumn: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        alignItems: 'center',
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: 'center',
      },
    }),
  },
  placeIcon: {
    color: 'white',
    fontSize: 26,
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  telContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  userAddressRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userCityRow: {
    backgroundColor: 'transparent',
  },
  userCityText: {
    color: '#A5A5A5',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  userImage: {
    borderColor: '#FFF',
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  userNameText: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
  },
})
