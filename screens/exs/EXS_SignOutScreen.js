
import React from 'react';
import {
  Alert,
  Button,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground
} from 'react-native';
import { MonoText } from '../../components/StyledText';
import AppNavigator from '../navigation/AppNavigator';
//import AsyncStorage from '@react-native-community/async-storage';

export default class EXS_SignOutScreen extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
    };    
  }

  onSingOut() {
    const { username, password } = this.state;    

    const {navigate} = this.props.navigation;
    
    this.clearData();
    navigate('EXS_SignIn', {name: 'User'})
  }

  clearData = async () => {
    try {
      await AsyncStorage.removeItem('uname');      
    } catch (e) {
      // saving error
    }
  }

  render() {    
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          KBW Group
        </Text>
        
        <Button
          title={'Sign Out'}
          style={styles.input} 
          onPress={this.onSingOut.bind(this)}            
        />        
                        
      </View>
    );
  } 

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },

  backdrop: {width: '100%', height: '100%'},
  header: {
    alignItems: 'center',
    fontWeight: '900',
  },
  input: {
    width: 300,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },  
  button: {
    backgroundColor: 'green',
    width: 300,
    height: 44,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
