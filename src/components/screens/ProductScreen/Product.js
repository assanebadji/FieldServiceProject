import React, {Component} from 'react';  
import { StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList} from 'react-native'; 
import { oauth, net, network, smartstore, mobilesync} from 'react-native-force';
import { Container, Header, Content, List, ListItem, Left,Table, Body, Title, Item, Input, Right, Icon, Button } from "native-base";
//import Icon from 'react-native-vector-icons/Ionicons';  
export default class Product extends Component{  
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }
    fetchData() {
        var that = this;
        net.query('SELECT Id, Name FROM Product2 LIMIT 100',
            (response) => that.setState({ data: response.records })
        );
    }

    componentDidMount() {
        var that = this;
        oauth.getAuthCredentials(
            () => that.fetchData(), // already logged in
            () => {
                oauth.authenticate(
                    () => that.fetchData(),
                    (error) => console.log('Failed to authenticate:' + error)
                );
            });
    }

    render(){  
        return(  
            <View style={styles.container}>  
                <Text style={styles.textStyle}>Liste des produits</Text> 
          <List
            dataArray={this.state.data}
            renderRow={item => (
              <ListItem style = {{ marginTop:5, }}>
                <Left>
                  <Text style = { styles.item }>{item.Name}</Text>
                </Left>
                <Right>
                    <TouchableOpacity  hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}>
                        <Image source={require('../../images/logo.png')} style={{ width:50,height:35, marginLeft:10}}/>
                    </TouchableOpacity>
                </Right>
              </ListItem>
            )}
          />
                {/* <FlatList data = { this.state.data }
                     renderItem = {
                    ({ item }) => <Text style = { styles.item } > { item.Name } </Text>
                }
                    keyExtractor = {
                        (item, index) => 'key_' + index }
                    />  */}
            </View>  
        )  
    }  
}  



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
    },
    textStyle: {
      fontWeight: 'bold',
      fontSize: 18,
      padding: 10,
      color: 'black'
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    }
  })
  