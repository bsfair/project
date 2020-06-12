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
export default class NFRL_Customer_EditScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'แก้ไขข้อมูลสมาชิก',
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

      dataSource: null,
      dataSource_score: null,

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
     
   /* code, citizenid, studentid, passport, prename, firstname, lastname,
    type, faculty, department, address, phone, email, isblacklist, username, 
    password, created_by, updated_by*/
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

    this.GetNFRLCustomer();
  }

  GetNFRLCustomer = async () => {    

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


UpdateData = async () => {    

    const { navigate } = this.props.navigation;

    const { id,
      code, studentid, passport, prename, firstname, lastname,
    type, faculty, department, address, phone, email, isblacklist, username, 
    password, created_by, updated_by
    } = this.state;

    const nFRL_CustomersApi = new NFRL_CustomersApi();

    try {
        
      let response_msg = 'no update';
      let data = {
        
        id: id,
        code: code,
        studentid: studentid,
        passport: passport,
        prename: prename,
        firstname: firstname,
        lastname: lastname,
        type: type,
        faculty: faculty,
        department: department,
        address: address,
        phone: phone,
        email: email,
        isblacklist: isblacklist,
        username: username,
        password: password,
        created_by: created_by,
        updated_by: updated_by,
 
      };

      response_msg = await nFRL_CustomersApi.update(id, data);

      Alert.alert(JSON.stringify(response_msg));

    } catch (error) {
      console.error(error);
    }

    //navigate('DTS_Personnel_List')
    navigate('NFRL_Customer_View',{

      param_id: this.state.id,
      param_code: this.state.code,
      param_studentid: this.state.studentid,
      param_passport: this.state.passport,
      param_prename: this.state.prename,
      param_firstname: this.state.firstname,
      param_lastname: this.state.lastname,
      param_type: this.state.type,
      param_faculty: this.state.faculty,
      param_department: this.state.department,
      param_address: this.state.address,
      param_phone: this.state.phone,
      param_email: this.state.email,
      param_isblacklist: this.state.isblacklist,
      param_username: this.state.username,
      param_password: this.state.password,
      param_created_by: this.state.created_by,
      param_updated_by: this.state.updated_by,
    });
    
  }


  render() {
    const {navigate} = this.props.navigation;

    return (
      <ImageBackground source={require('../../image/detailBackgroundImage.jpg')}
        style={styles.backdrop}>  
      <View style={styles.container}>
        <ScrollView>

          <Text style={styles.header}>
            ข้อมูลผู้ใช้บริการ
          </Text>

          
          <Text style={styles.text}>ประเภท(นักศึกษา/บุลคลากร) :</Text>
          <TextInput 
            value={this.state.type}
            onChangeText={(type) => this.setState({ type })}
            placeholder={'ประเภท'}
            style={styles.input} 
          />

          <Text style={styles.text}>เลขบัตรประชาชน :</Text>
          <TextInput 
            value={this.state.code}
            onChangeText={(citizenid) => this.setState({ code })}
            placeholder={'x-xxxx-x-xx-x'}
            style={styles.input} 
          />

          <Text style={styles.text}>รหัสนักศึกษา/บุลคลากร :</Text>
          <TextInput 
            value={this.state.studentid}
            onChangeText={(studentid) => this.setState({ studentid })}
            placeholder={'xxxxxxxxxx'}
            style={styles.input} 
          />

          <Text style={styles.text}>คำนำหน้าชื่อ :</Text>
          <TextInput 
            value={this.state.prename}
            onChangeText={(prename) => this.setState({ prename })}
            placeholder={'คำนำหน้า'}
            style={styles.input} 
          />

          <Text style={styles.text}>ชื่อ :</Text>
          <TextInput 
            value={this.state.firstname}
            onChangeText={(firstname) => this.setState({ firstname })}
            placeholder={'ทดสอบ'}
            style={styles.input} 
          />

          <Text style={styles.text}>สกุล :</Text>
          <TextInput 
            value={this.state.lastname}
            onChangeText={(lastname) => this.setState({ lastname })}
            placeholder={'สมัครสมาชิก'}
            style={styles.input} 
          />


          <Text style={styles.text}>คณะ :</Text>
          <TextInput 
            value={this.state.faculty}
            onChangeText={(faculty) => this.setState({ faculty })}
            placeholder={'คณะ'}
            style={styles.input}
          />           

          <Text style={styles.text}>ภาควิชา :</Text>
          <TextInput 
            value={this.state.department}
            onChangeText={(department) => this.setState({ department })}
            placeholder={'ภาควิชา'}
            style={styles.input}
          />

           <Text style={styles.text}>เบอร์โทร :</Text>
          <TextInput 
            value={this.state.phone}
            onChangeText={(phone) => this.setState({ phone })}
            placeholder={'เบอร์โทร'}
            style={styles.input}
          />

        <Text style={styles.text}>อีเมล :</Text>
          <TextInput 
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
            placeholder={'อีเมล'}
            style={styles.input}
          />

           <Text style={styles.text}>ที่อยู่ :</Text>
          <TextInput 
            value={this.state.address}
            onChangeText={(address) => this.setState({ address })}
            placeholder={'15 ถ.กาญจนวนิชย์, หาดใหญ่, สงขลา 9011'}
            style={styles.input}
          />

              


      
                  

          <View style={styles.buttonSection}>
              <Button
                onPress={ this.UpdateData.bind(this) }
                buttonStyle={styles.button}
                titleStyle={{ fontSize: 18 }}
                title="บันทึก"
                      >
              </Button>
          </View> 
                


          <View style={styles.buttonSection}>
              <Button
                onPress={ () =>  navigate('NFRL_Customer_View') }      
                buttonStyle={styles.button2}
                titleStyle={{ fontSize: 18 }}
                title="ยกเลิก"
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
    borderRadius: 10,
    backgroundColor: '#0430fb',
    height: 44,
    marginTop: 20,
    marginLeft: 70,
    marginRight: 70,
  },
  button2: {
    borderRadius: 10,
    backgroundColor: '#fb0404',
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
