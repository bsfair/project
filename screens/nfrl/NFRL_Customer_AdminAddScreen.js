
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
  AsyncStorage, 
  BackHandler,
  FlatList, 
  ActivityIndicator,
  List, 
  ListItem
} from 'react-native';
import { MonoText } from '../../components/StyledText';
import Moment from 'moment';
import NFRL_CustomersApi from '../../class_api/NFRL_CustomersApi';
import { Button, Icon } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';

export default class NFRL_Customer_AdminAddScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'เพิ่มข้อมูลสมาชิก(ADMIN)',
    headerStyle: {
      backgroundColor: '#3366CC',
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

      //id: this.CheckParam('id'),
      id: "",
      code: "",
      studentid: "",
      passport: "",
      prename: "",
      firstname: "",
      lastname: "",
      type: "",
      faculty: "",
      department: "",
      address: "",
      phone: "",
      email: "",
      isblacklist: "",
      username: "",
      password: "",
      created_by: "",
      updated_by: "",
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
     // 'http://172.17.146.223/traineedrive/public/api/nfrl2/customer/' + this.state.id
     'http://172.17.146.223/traineedrive/public/api/nfrl2/customer/1'
    )
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState(
          {
            isLoading: false,
            // dataSource: responseJson.examinee_exam[0].examinee,
            // dataSource_score: responseJson.examinee_exam[0].exam_score_includes,

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


AddData = async () => {    

    //Alert.alert("NCA Add");

    const { navigate } = this.props.navigation;

    const { /*id,
      code,  no, prefix, firstname, surname,
      position, personneltype, address, telephone, email, 
      division, detail, remark, created_at, updated_at,*/

      code, studentid, passport, prename,
      firstname, lastname, type, faculty, department, address,
      phone, email, isblacklist, username, password, created_by,
      updated_by,
    } = this.state;

    const nFRL_CustomersApi = new NFRL_CustomersApi();

    try {
        
      let response_msg = 'no update';
      let data = {
        
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

      //response_msg = await nFRL_CustomersApi.create(data);

      //Alert.alert("NCA"+JSON.stringify(response_msg));

    } catch (error) {
      console.error(error);
    }

    //Alert.alert("NCA Add 2");

    navigate('NFRL_Reserve_View',{
    //navigate('NFRL_Customer_List',{

      //param_id: this.state.id,
      /*
      param_name: this.state.name,
      param_grouptype: this.state.grouptype,
      param_latitude: this.state.latitude,
      param_longitude: this.state.longitude
      */
    //});
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
      <View style={styles.container}>
        <ScrollView>

          <Text style={styles.header}>
            ป้อนข้อมูลสมัครสมาชิก
          </Text>

          <Text style={styles.text}>เลขบัตรประชาชน :</Text>
          <TextInput 
            value={this.state.code}
            onChangeText={(code) => this.setState({ code })}
            placeholder={'เลขบัตรประชาชน'}
            style={styles.input} 
          />
        
          <Text style={styles.text}>ประเภท :</Text>
          <TextInput 
            value={this.state.type}
            onChangeText={(type) => this.setState({ type })}
            placeholder={'ประเภท'}
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

          <Text style={styles.text}>นามสกุล :</Text>
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



          


                  
          <Button
            title={`บันทึก`}
            titleStyle={{ fontSize: 20 }}
            textStyle={{textAlign: 'center'}}           
            raised
            icon={{}}
            buttonStyle={ styles.button }            
            onPress={ this.AddData.bind(this)  }
          />
                
          <Button
            title="ยกเลิก"
            titleStyle={{ fontSize: 20 }}
            textStyle={{ textAlign: 'center' }}            
            raised
            icon={{}}
            buttonStyle={ styles.button }
            onPress={ () =>  navigate('NFRL_Home') }            
          />


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
    marginBottom: 5,
    fontSize: 18,
  },
  textAreaContainer: {
    borderColor: '#92a8d1',
    borderWidth: 1,
    padding: 5
  },
  textArea: {
    height: 150,
    justifyContent: "flex-start"
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
  errorMsg: {
    color: 'red'
  },
  icon: {
    paddingLeft: 10,
  }
})
