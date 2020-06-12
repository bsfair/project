import React from 'react';
import {
  Alert,
  //Button,
  FormattedDate,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { MonoText } from '../../components/StyledText';
import { AsyncStorage, BackHandler } from 'react-native';

import { FlatList, ActivityIndicator } from 'react-native';
import Moment from 'moment';
import { List, ListItem } from 'react-native';
import NFRL_ReserveApi from '../../class_api/NFRL_ReserveApi';
import { Button, Icon } from 'react-native-elements';

import DatePicker from 'react-native-datepicker';

export default class UserScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Admin & Customer',
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



render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.container}>
        <ScrollView>
        


        <Text style={styles.header}>
            รายละเอียดเครื่องเช่า
          </Text>

        

          <View style={styles.buttonSection}>
          <Button
            onPress={() => {
              navigate('NFRL_Reserve_Add', {})
            }}
            buttonStyle={styles.button_regis}
            titleStyle={{ fontSize: 18 }}
            title="ผู้ดูแลระบบ/เจ้าหน้าที่"
                  >
          </Button>
        </View>

          <View style={styles.buttonSection}>
          <Button
            onPress={() => {
              navigate('NFRL_Customer_Add', {})
            }}
            buttonStyle={styles.button_regis}
            titleStyle={{ fontSize: 18 }}
            title="ผู้ใช้บริการ"
                  >
          </Button>
        </View>


        <Text style={styles.text}>
            หมายเหตุ : หากท่านยังไม่เป็น "สมาชิก" กรุณา "สมัครสมาชิก"ก่อนทำรายการ
          </Text>




             
          


        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    /*flex: 1,*/
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingLeft: 20,
    paddingRight: 20,
  },
  header: {
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 15,
  },
  text: {
     fontSize:15,
    textAlign:'center',
    color:"#000000",
    marginBottom:50,
    marginTop: 30,
  },
  text_index: {
    alignItems: 'center',
    fontSize: 18,
    marginTop: 20,
    marginBottom: 15,
  },
  input: {
    //borderColor: 'gray',
    //borderColor: 'gray',
    //backgroundColor: 'lightgray',
    color: 'black',
    borderRadius: 20,
    borderWidth: 1,
    fontSize: 18,
    /*height: 44,*/
    marginTop: 5,
    marginBottom: 15,
    minWidth: 350,
    paddingLeft: 20,
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
  },
  input_index: {
    alignItems: 'center',
    marginTop: 13,
    /*marginBottom: 15,*/
    borderColor: 'gray',
    backgroundColor: 'lightgray',
    color: 'black',
    borderRadius: 20,
    borderWidth: 1,
    fontSize: 18,
    height: 44,
    minWidth: 100,
    paddingLeft: 20,
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
  },
  button: {
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#004fff',
    height: 44,
    marginTop: 5,
    minWidth: 300,
  },
  error: {
    marginTop: 10,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 15,

  },
   button_regis: {
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: '#004fff',
    height: 44,
    width:150,
    marginTop: 30,
    minWidth: 10,
  },

  errorMsg: {
    color: 'red'
  },
  icon: {
    paddingLeft: 10,
  }
})
