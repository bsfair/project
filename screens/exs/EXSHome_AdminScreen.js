import React from 'react';
import {
  Alert,
  FormattedDate,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  AsyncStorage, 
  BackHandler,
  FlatList, 
  ActivityIndicator,
  List, 
  ListItem
} from 'react-native';
import { MonoText } from '../../components/StyledText';
import Moment from 'moment';
import { Button, Icon } from 'react-native-elements';

export default class EXSHome_AdminScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'จองตรวจข้อสอบ',
    headerStyle: {
      backgroundColor: '#3366CC',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      textAlign: 'center',
      flexGrow: 1,
      marginLeft: -45,
      alignSelf: 'center',
    },
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.toggleDrawer()} >
        <Image
          source={require('../../image/drawer.png')}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 35,
            width: 35,
            marginLeft: 10,
            resizeMode: 'stretch',
            backgroundColor: 'white',
          }}
        />
      </TouchableOpacity>
    ),
  }); 



  
render(){
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.container}>
      <ImageBackground source={require('../../image/menuEXSBackground.jpg')}
      style={styles.backdrop}>

      <View style={styles.title}>
          <Image source={require('../../image/exam.png')} style={{width: 300, height: 200}}/>
      </View>

        
        <View style={styles.buttonSection}>
          <Button
            onPress={() => {
              navigate('EXS_Customer_AdminList', {})
            }}
            buttonStyle={styles.button2}
            titleStyle={{ fontSize: 18 }}
            title="จัดการข้อมูลสมาชิก">
          </Button>
        </View>

        <View style={styles.buttonSection}>
          <Button
            onPress={() => {
              navigate('EXS_Reserve_AdminList', {})
            }}
            buttonStyle={styles.button3}
            titleStyle={{ fontSize: 18 }}
            title="จัดการข้อมูลการจอง">
          </Button>
        </View>       



        </ImageBackground>
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
  },

  backdrop: {width: '100%', height: '100%'},

  textshow:{
    fontSize:18,
    textAlign:'center',
    color:"#000000",
    marginBottom:50,
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
    fontWeight: 'bold'
  },
  button: {
    borderRadius: 10,
    backgroundColor: '#00BFFF',
    height: 44,
    marginTop: 50,
    marginLeft: 70,
    marginRight: 70,
  },
  button2: {
    borderRadius: 10,
    backgroundColor: '#00B2EE',
    height: 44,
    marginTop: 20,
    marginLeft: 70,
    marginRight: 70,
  },
  button3: {
    borderRadius: 10,
    backgroundColor: '#009ACD',
    height: 44,
    marginTop: 20,
    marginLeft: 70,
    marginRight: 70,
  },
  button4: {
    borderRadius: 10,
    backgroundColor: '#00688B',
    height: 44,
    marginTop: 20,
    marginLeft: 70,
    marginRight: 70,
  },

 

  error: {
    marginTop: 10,
  },

  title: {
    fontSize: 30,
    textAlign: 'center',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 50,

  },
  errorMsg: {
    color: 'red'
  },
  icon: {
    paddingLeft: 10,
  }


})