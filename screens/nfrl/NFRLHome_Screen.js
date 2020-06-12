import React from 'react';
import { Alert,FormattedDate, Image, Platform, ScrollView,StyleSheet, 
  Text, TextInput, TouchableOpacity, View, ImageBackground, AsyncStorage, 
  BackHandler, FlatList, ActivityIndicator, List, ListItem} from 'react-native';
import { MonoText } from '../../components/StyledText';
import Moment from 'moment';
import { Button, Icon } from 'react-native-elements';

export default class NFRLHome_Screen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'จองคอมพิวเตอร์โน๊ตบุ๊ค',
    headerStyle: {
      backgroundColor: '#57337f',
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
      <ImageBackground source={require('../../image/menuBackgroundImage.jpg')}
      style={styles.backdrop}>

      <View style={styles.title}>
          <Image source={require('../../image/main_nb.png')} style={{width: 300, height: 200}}/>
      </View>

        <View style={styles.buttonSection}>
          <Button
            onPress={() => {
              navigate('NFRL_Customer_Add', {})
            }}
            buttonStyle={styles.button}
            titleStyle={{ fontSize: 18 }}
            title="สมัครสมาชิก">
          </Button>
        </View>
        
        <View style={styles.buttonSection}>
          <Button
            onPress={() => {
              navigate('NFRL_List', {})
            }}
            buttonStyle={styles.button2}
            titleStyle={{ fontSize: 18 }}
            title="ทำรายการจอง">
          </Button>
        </View>

        <View style={styles.buttonSection}>
          <Button
            onPress={() => {
              navigate('NFRL_Reserve_Status', {})
            }}
            buttonStyle={styles.button3}
            titleStyle={{ fontSize: 18 }}
            title="สถานะจอง">
          </Button>
        </View>       

        <View style={styles.buttonSection}>
          <Button
            onPress={() => {
              navigate('NFRL_SignIn', {})
            }}
            buttonStyle={styles.button4}
            titleStyle={{ fontSize: 18 }}
            title="จัดการข้อมูล(ADMIN)">
          </Button>
        </View>

        
        <Text style={styles.textshow}>
            หมายเหตุ : หากท่านยังไม่เป็น "สมาชิก" 
            กรุณา "สมัครสมาชิก"ก่อนทำรายการ
          </Text>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo:{
    fontWeight:"bold",
    fontSize:40,
    color:"#000000",
    marginBottom:40
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
    backgroundColor: '#9900FF',
    height: 44,
    marginTop: 20,
    marginLeft: 70,
    marginRight: 70,
  },
  button2: {
    borderRadius: 10,
    backgroundColor: '#9900CC',
    height: 44,
    marginTop: 20,
    marginLeft: 70,
    marginRight: 70,
  },
  button3: {
    borderRadius: 10,
    backgroundColor: '#990099',
    height: 44,
    marginTop: 20,
    marginLeft: 70,
    marginRight: 70,
  },
  button4: {
    borderRadius: 10,
    backgroundColor: '#990066',
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
    marginTop: 20,

  },
  errorMsg: {
    color: 'red'
  },
  icon: {
    paddingLeft: 10,
  }


})