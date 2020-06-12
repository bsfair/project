
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

export default class EXS_Customer_AdminAddScreen extends React.Component {  
  
  static navigationOptions = ({ navigation }) => ({
    title: 'จัดการข้อมูลสมาชิก(ADMIN)',
    headerStyle: {
      backgroundColor: '#3366CC',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      textAlign: 'center',
      flexGrow:1,
      alignSelf:'center',
      marginRight: 70,
    },    
  });

  constructor(props) {
    super(props)
    
    this.state = {

      dataSource: null,
      dataSource_score: null,

      id: this.CheckParam('id'),
      
      code: "",
      prefix: "",
      firstname: "",
      lastname: "",
      customer_type: "",
      cus_status: "",
      department: "",
      phone: "",
      email: "",
      remark: "",
      created_by: "",
      updated_by: "",
    };    
  }
  
  componentDidMount(){ 
    /*const { navigate } = this.props.navigation;
    AsyncStorage.multiGet(['username', 'password']).then((data) => {
        let username = data[0][1];
        let password = data[1][1];

        //if (username !== 'tonlove') {
        if(typeof username !== 'string' || username === null || username === undefined) {
          navigate('SignIn', {name: 'User'})        
        }
    });*/

    this.GetCustomer();      
  }  
  
  GetCustomer = async () => {     
    
    fetch(      
      //'http://172.17.146.223/traineedrive/public/api/exs/customer/' + this.state.id 
      'http://172.17.146.223/traineedrive_F/public/api/exs/customer/1'
      )   
      .then((response) => response.json())
      .then((responseJson) => {

      this.setState(
        {
          isLoading: false,          
          //dataSource: responseJson.examinee_exam[0].examinee, //
          //dataSource_score: responseJson.examinee_exam[0].exam_score_includes, //
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
        function(){ }
      );
    })
    .catch((error) =>{
      console.error(error);
    });
  }
  CheckParam(p_name){
    let p_val = this.props.navigation.getParam('param_'+p_name);     
    return ( p_val == null ? "" : (p_val != "null" ? String(p_val) : "") );
  } 


AddData = async () => {                      

    const { navigate } = this.props.navigation;

    const { 
      id, code, prefix, firstname, lastname, customer_type,       
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

      //alert('firstname'+this.state.firstname);

      response_msg = await eXS_CustomersApi.create(data); //

      Alert.alert(JSON.stringify(response_msg));

    } catch (error) {
      console.error(error);
    }

    //navigate('DTS_Personnel_List')
    navigate('EXS_Customer_AdminList',{

      param_id: this.state.id,
      //id: id,
      param_code: code,
      param_prefix: prefix,
      param_firstname: firstname,
      param_lastname: lastname,
      param_customer_type: customer_type,
      param_cus_status: cus_status,
      param_department: department,
      param_phone: phone,
      param_email: email,
      param_remark: remark,
      param_created_by: created_by,
      param_updated_by: updated_by,
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
            value={this.state.customer_type}
            onChangeText={(customer_type) => this.setState({ customer_type })}
            placeholder={'ประเภท'}
            style={styles.input} 
          />


          <Text style={styles.text}>คำนำหน้าชื่อ :</Text>
          <TextInput 
            value={this.state.prefix}
            onChangeText={(prefix) => this.setState({ prefix })}
            placeholder={'คำนำหน้า'}
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


          <Text style={styles.text}>หน่วยงาน/คณะ :</Text>
          <TextInput 
            value={this.state.faculty}
            onChangeText={(faculty) => this.setState({ faculty })}
            placeholder={'หน่วยงาน/คณะ'}
            style={styles.input}
          />           

          <Text style={styles.text}>เบอร์โทรศัพท์ :</Text>
          <TextInput 
            value={this.state.phone}
            onChangeText={(phone) => this.setState({ phone })}
            placeholder={'เบอร์โทรศัพท์'}
            style={styles.input}
          />

          <Text style={styles.text}>อีเมล์ :</Text>
          <TextInput 
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
            placeholder={'อีเมล์'}
            style={styles.input}
          />

            <Button
            title={`บันทึก`}
            titleStyle={{ fontSize: 20 }}
            textStyle={{textAlign: 'center'}}           
            raised
            icon={{}}
            buttonStyle={ styles.button }            
            onPress={ this.AddData.bind(this) }
          />
                
          <Button
            title="ยกเลิก"
            titleStyle={{ fontSize: 20 }}
            textStyle={{ textAlign: 'center' }}            
            raised
            icon={{}}
            buttonStyle={ styles.button }
            onPress={ () =>  navigate('EXSHome_Admin') }            
          />

        

        </ScrollView>
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
    /*borderColor: 'gray',
    borderColor: 'gray',
    backgroundColor: 'lightgray', */
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
