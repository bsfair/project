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
import EXS_CustomersApi from '../../class_api/EXS_CustomersApi';
import { NavigationEvents } from 'react-navigation';
export default class EXS_Customer_EditScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'แก้ไขข้อมูลสมาชิก',
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

        id: this.CheckParam('id'),
        code: this.CheckParam('code'),
        prefix: this.CheckParam('prefix'),
        firstname: this.CheckParam('firstname'),
        lastname: this.CheckParam('lastname'),
        customer_type: this.CheckParam('customer_type'),
        cus_status: this.CheckParam('cus_status'),
        department: this.CheckParam('department'),
        phone: this.CheckParam('phone'),
        email: this.CheckParam('email'),
        remark: this.CheckParam('remark'),
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

    this.GetEXSCustomer();
  }

  GetEXSCustomer = async () => {    

    fetch(
      'http://172.17.146.223/traineedrive_F/public/api/exs/customer/' + this.state.id
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
            prefix: responseJson.customer.prefix,
            firstname: responseJson.customer.firstname,
            lastname: responseJson.customer.lastname,
            customer_type: responseJson.customer.customer_type,
            cus_status: responseJson.customer.cus_status,
            department: responseJson.customer.department,
            phone: responseJson.customer.phone,
            email: responseJson.customer.email,
            remark: responseJson.customer.remark,
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
      code, prefix, firstname, lastname, customer_type,       
      cus_status, department, phone, email, remark,
      created_by, updated_by,      
    } = this.state;

    const eXS_CustomersApi = new EXS_CustomersApi();

    try {
        
      let response_msg = 'no update';
      let data = {
        
        id: id,
        code: code,         
        prefix: prefix,
        firstname: firstname,
        lastname: lastname,
        customer_type: customer_type,
        cus_status: cus_status,
        department: department,
        phone: phone,
        email: email,
        remark: remark,
        created_by: created_by,
        updated_by: updated_by,

      };

      response_msg = await eXS_CustomersApi.update(id, data);

      Alert.alert(JSON.stringify(response_msg));

    } catch (error) {
      console.error(error);
    }

    //navigate('DTS_Personnel_List')
    navigate('EXS_Customer_View',{

      param_id: this.state.id,
      param_code: this.state.code,         
      param_prefix: this.state.prefix,
      param_firstname: this.state.firstname,
      param_lastname: this.state.lastname,
      param_customer_type: this.state.customer_type,
      param_cus_status: this.state.cus_status,
      param_department: this.state.department,
      param_phone: this.state.phone,
      param_email: this.state.email,
      param_remark: this.state.remark,
      param_created_by: this.state.created_by,
      param_updated_by: this.state.updated_by,


    });
    
  }


  render() {
    const {navigate} = this.props.navigation;

    return (
      <ImageBackground source={require('../../image/detailBackground.jpg')}
        style={styles.backdrop}>  
      <View style={styles.container}>
        <ScrollView>

          <Text style={styles.header}>
            ข้อมูลผู้ใช้บริการ
          </Text>


          <Text style={styles.text}>เลขบัตรประชาชน :</Text>
          <TextInput
            value={this.state.code}
            onChangeText={(code) => this.setState({ code })}
            placeholder={'เลขบัตรประชาชน'}
            style={styles.input}
          />

          <Text style={styles.text}>ประเภทสมาชิก :</Text>
          <TextInput
            value={this.state.customer_type.toString()}
            onChangeText={(customer_type) => this.setState({ customer_type })}
            placeholder={'ประเภทสมาชิก'}
            style={styles.input}
          />

          <Text style={styles.text}>คำนำหน้าชื่อ :</Text>
          <TextInput
            value={this.state.prefix}
            onChangeText={(prefix) => this.setState({ prefix })}
            placeholder={'คำนำหน้าชื่อ'}
            style={styles.input}
          />

          <Text style={styles.text}>ชื่อ :</Text>
          <TextInput
            value={this.state.firstname}
            onChangeText={(firstname) => this.setState({ firstname })}
            placeholder={'ชื่อ'}
            style={styles.input}
          />

          <Text style={styles.text}>นามสกุล :</Text>
          <TextInput
            value={this.state.lastname}
            onChangeText={(lastname) => this.setState({ lastname })}
            placeholder={'นามสกุล'}
            style={styles.input}
          />

          <Text style={styles.text}>คณะ/หน่วยงาน :</Text>
          <TextInput
            value={this.state.department}
            onChangeText={(department) => this.setState({ department })}
            placeholder={'คณะ/หน่วยงาน'}
            style={styles.input}
          />

          <Text style={styles.text}>โทรศัพท์ :</Text>
          <TextInput
            value={this.state.phone}
            onChangeText={(phone) => this.setState({ phone })}
            placeholder={'โทรศัพท์'}
            style={styles.input}
          />

          <Text style={styles.text}>อีเมล :</Text>
          <TextInput
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
            placeholder={'อีเมล'}
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
