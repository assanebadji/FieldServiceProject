import React from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet,Button,SafeAreaView, ScrollView } from 'react-native';

export default class EventScreen extends React.Component {

constructor(props) {
  super(props);
  this.state = {
    info: '',
    inputCount: 3,
    data: [{ name: 'input1' }, { name: 'input2' }, { name: 'input3' }],
  };
  this.inputRefs = {};
}
state = {
    subject:'',
    description:'',
    startDateEvent:'',
    endDateEvent:'',
    nameEvent:'',
    relatedTo:''
  }

  onAddMore() {
    const newData = this.state.data;
    newData.push({ name: `input${this.state.inputCount + 1}` });
    this.setState(prevState => ({
      inputCount: prevState.inputCount + 1,
      data: newData,
    }));
  }

  _onChangeText(text, inputName) {
    console.log('Input Name:', inputName, text);
    console.log("Inout's Ref:", this.inputRefs[inputName]);
    const info = `${inputName} changed text`;
    this.setState({
      info: this.state.info + '\n\r' + info
    });
  }

  _onChange(event, inputName) {
    console.log('Input Name:', inputName);
  }

  handleSubject= (text) => {
    this.setState({ subject: text })
  }
  handleDescription = (text) => {
    this.setState({ description: text })
  }
  handleStartDateEvent = (text) => {
    this.setState({ startevent: text })
  }
  handleEndDateEvent = (text) => {
    this.setState({ endevent: text })
  }
  
  handleNameEvent = (text) => {
    this.setState({ nameEvent: text })
  }

  handleRelatedTo = (text) => {
    this.setState({ relatedTo: text })
  }

  login = (email, pass) => {
    alert('email: ' + email + ' password: ' + pass)
  }

  render() {
    return (
        <ScrollView  style = {styles.container}>
            {this.state.data.map(d => (
          <View style={styles.inputWrapper} key={d.name}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => { this._onChangeText(text, d.name); }}
              onChange={(event) => { this._onChange(event, d.name); }}
              ref={ref => {
                this.inputRefs[d.name] = ref;
              }}
              defaultValue={d.name}
            />
            
          </View>
        ))}
        <Button
          onPress={this.onAddMore.bind(this)}
          title="Add More"
          color="#841584"
        />
        <TextInput
          multiline={true}
          editable={false}
          style={styles.info}>
            {this.state.info}
        </TextInput>

        <TextInput style = {styles.input}
            underlineColorAndroid = "transparent"
            placeholder = "Sujet"
            placeholderTextColor = ""
            autoCapitalize = "none"
            onChangeText = {this.handleSubject}/>

        <TextInput style = {styles.input}
            underlineColorAndroid = "transparent"
            placeholder = "Description"
            placeholderTextColor = ""
            autoCapitalize = "none"
            onChangeText = {this.handleDescription}/>

        <TextInput style = {styles.input}
            underlineColorAndroid = "transparent"
            placeholder = "Date de debut"
            placeholderTextColor = ""
            autoCapitalize = "none"
            onChangeText = {this.handleStartDateEvent}/>
        
        <TextInput style = {styles.input}
            underlineColorAndroid = "transparent"
            placeholder = "Date de fin "
            placeholderTextColor = ""
            autoCapitalize = "none"
            onChangeText = {this.handleEndDateEvent}/>
            
        <TextInput style = {styles.input}
            underlineColorAndroid = "transparent"
            placeholder = "Nom evenement"
            placeholderTextColor = ""
            autoCapitalize = "none"
            onChangeText = {this.handleNameEvent}/>
        

        <TextInput style = {styles.input}
            underlineColorAndroid = "transparent"
            placeholder = "Relier à"
            placeholderTextColor = ""
            autoCapitalize = "none"
            onChangeText = {this.handleRelatedTo}/>

        
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