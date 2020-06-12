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
import { Button, Icon, CheckBox } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import NFRL_CustomersApi from '../../class_api/NFRL_CustomersApi';
import { NavigationEvents } from 'react-navigation';

export default class NFRL_Customer_ViewScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'ข้อมูลสมาชิก',
    headerStyle: {
      backgroundColor: '#57337f',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      textAlign: 'center',
      flexGrow: 1,
      alignSelf: 'center',
      marginRight: 70,
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

  constructor(props) {
    super(props)

    this.state = {

        id: this.CheckParam('id'),
        code: this.CheckParam('code'),
        studentid: this.CheckParam('studentid'),
        passport: this.CheckParam('passport'),
        prename: this.CheckParam('prename'),
        firstname: this.CheckParam('firstname'),
        lastname: this.CheckParam('lastname'),
        type: this.CheckParam('type'),
        faculty: this.CheckParam('faculty'),
        department: this.CheckParam('department'),
        address: this.CheckParam('address'),
        phone: this.CheckParam('phone'),
        email: this.CheckParam('email'),
        isblacklist: this.CheckParam('isblacklist'),
        username: this.CheckParam('username'),
        password: this.CheckParam('password'),
        created_by: this.CheckParam('created_by'),
        updated_by: this.CheckParam('updated_by'),

    };
  }

  componentDidMount() {
    /*
    const { navigate } = this.props.navigation;
    AsyncStorage.multiGet(['username', 'password']).then((data) => {
        let username = data[0][1];
        let password = data[1][1];

        //if (username !== 'tonlove') {
        if(typeof username !== 'string' || username === null || username === undefined) {
          navigate('SignIn', {name: 'User'})        
        }
    });
    */

    this.ShowNFRLCustomer();
  }

  ShowNFRLCustomer = async () => {

    fetch(
      'http://172.17.146.223/traineedrive/public/api/nfrl2/customer/' + this.state.id
    )
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState(
          {
            isLoading: false,
            // dataSource: responseJson.examinee_exam[0].examinee,
            // dataSource_score: responseJson.examinee_exam[0].exam_score_includes,
            id: responseJson.customer.id,
            code: responseJson.customer.code,
            studentid: responseJson.customer.studentid,
            passport: responseJson.customer.passport,
            prename: responseJson.customer.prename,
            firstname: responseJson.customer.firstname,
            lastname: responseJson.customer.lastname,
            type: responseJson.customer.type,
            faculty: responseJson.customer.faculty,
            department: responseJson.customer.department,
            address: responseJson.customer.address,
            phone: responseJson.customer.phone,
            email: responseJson.customer.email,
            isblacklist: responseJson.customer.isblacklist,
            username: responseJson.customer.username,
            password: responseJson.customer.password,
            created_by: responseJson.customer.created_by,
            updated_by: responseJson.customer.updated_by,

          },
          function () { }
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }
  CheckParam(p_name) {
    let p_val = this.props.navigation.getParam('param_' + p_name);
    return (p_val == null ? "" : (p_val != "null" ? String(p_val) : ""));
  }

  DeleteConfirm(){
    Alert.alert(
      'Confirm delete record!',
      'Are you sure you want to delete this record?',
        [
          { 
            text: 'NO', 
            onPress: () => { 
              //Alert.alert("Record Not Deleted"); 
            }
          },
          { 
            text: 'YES', 
            onPress: () => {   
              //Alert.alert("Deleted Complete");            
              this.DeleteData();
            } 
          },
        ]
      );
  }

  DeleteData = async () => {

    const { navigate } = this.props.navigation;
    const { id } = this.state; 
    const nFRL_CustomersApi = new NFRL_CustomersApi();

    try {        
      let response_msg = 'no delete';     
      response_msg = await nFRL_CustomersApi.destroy(id);
      Alert.alert(JSON.stringify(response_msg));      
    } catch (error) {
      console.error(error);
    }

    navigate('NFRL_Customer_List');
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
    <ImageBackground source={require('../../image/menuBackgroundImage.jpg')}
        style={styles.backdrop}>  
      <View style={styles.container}>

      <NavigationEvents
          
          onDidFocus={() => this.ShowNFRLCustomer()}
        />
        <ScrollView>

          <Text style={styles.header}>
            ข้อมูลสมาชิก
          </Text>
         
          <Text style={styles.text}>ประเภทลูกค้า : {this.state.type}</Text>
          <Text style={styles.text}>เลขบัตรประชาชน : {this.state.code}</Text>
          <Text style={styles.text}>รหัสนักศึกษา/บุลคลากร  : {this.state.studentid}</Text>
          <Text style={styles.text}>คำนำหน้าชื่อ : {this.state.prename}</Text>
          <Text style={styles.text}>ชื่อ : {this.state.firstname}</Text>
          <Text style={styles.text}>นามสกุล : {this.state.lastname}</Text>
          <Text style={styles.text}>คณะ : {this.state.faculty}</Text>
          <Text style={styles.text}>ภาควิชา : {this.state.department}</Text>
          <Text style={styles.text}>เบอร์โทรศัพท์ : {this.state.phone}</Text>
          <Text style={styles.text}>อีเมล : {this.state.email}</Text>
          <Text style={styles.text}>ที่อยู่ : {this.state.address}</Text>

        
        

        <View style={styles.buttonSection}>
            <Button
              onPress={ () => {
                navigate('NFRL_Customer_Edit',{   
                  param_id: this.state.id,
                 
                })
              }}
              buttonStyle={styles.button}
              titleStyle={{ fontSize: 18 }}
              title="แก้ไขข้อมูล"
                    >
            </Button>
          </View> 


          <View style={styles.buttonSection}>
            <Button
              onPress={ () =>  navigate('NFRLHome') }
              buttonStyle={styles.button2}
              titleStyle={{ fontSize: 18 }}
              title="ข้อมูลถูกต้อง"
                    >
            </Button>
          </View> 

        </ScrollView>
      </View>
      </ImageBackground>
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
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 15,
  },
  text: {
    marginBottom: 5,
    fontSize: 18,
  },
  text_index: {
    alignItems: 'center',
    fontSize: 18,
    marginTop: 20,
    marginBottom: 15,
  },
  input: {
    borderColor: 'gray',
    borderColor: 'gray',
    backgroundColor: 'lightgray',
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
    borderRadius: 10,
    backgroundColor: '#fb0404',
    height: 44,
    marginTop: 20,
    marginLeft: 70,
    marginRight: 70,
  },
    button2: {
    borderRadius: 10,
    backgroundColor: '#00a316',
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
    marginBottom: 15,

  },
  errorMsg: {
    color: 'red'
  },
  icon: {
    paddingLeft: 10,
  }
})
