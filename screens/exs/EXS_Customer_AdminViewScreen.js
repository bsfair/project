
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
  ListItem,
  ImageBackground
} from 'react-native';
import { MonoText } from '../../components/StyledText';
import Moment from 'moment';
import { Button, Icon } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';

export default class EXS_Customer_AdminViewScreen extends React.Component {  
  
  static navigationOptions = ({ navigation }) => ({
    title: 'ข้อมูลสมาชิก(ADMIN)',
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
      created_at: "",
      updated_at: "",
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
      'http://172.17.146.223/traineedrive_F/public/api/exs/customer/' + this.state.id //
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
          created_at: responseJson.customer.created_at,
          updated_at: responseJson.customer.updated_at,
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
    const eXS_CustomersApi = new EXS_CustomersApi();

    try {        
      let response_msg = 'no delete';     
      response_msg = await EXS_CustomersApi.destroy(id);
      Alert.alert(JSON.stringify(response_msg));      
    } catch (error) {
      console.error(error);
    }

    navigate('EXS_Customer_AdminList');
  }




  render() {
    const {navigate} = this.props.navigation;                  

    return(     
      <View style={styles.container}>
        <ScrollView>
                    
          <Text style={styles.header}>
            ข้อมูลสมาชิก
          </Text>          
          
          <View>          
            <Text style={styles.text}>เลขบัตรประชาชน : { this.state.code }</Text>
            <Text style={styles.text}>ชื่อ - สกุล : { this.state.prefix + this.state.firstname + ' ' + this.state.lastname }</Text>                         
            <Text style={styles.text}>ประเภทผู้ใช้ : { this.state.customer_type }</Text> 
            <Text style={styles.text}>คณะ/หน่วยงาน : { this.state.department }</Text>
            <Text style={styles.text}>เบอร์โทร : { this.state.phone }</Text>
            <Text style={styles.text}>อีเมล : { this.state.email }</Text>
          </View>

          <View>
            <Button            
              title="แก้ไข"
              titleStyle={{ fontSize: 20 }}
              textStyle={{textAlign: 'center'}}
              raised
              icon={{}}
              buttonStyle={ styles.button }
              onPress={ () => {
                navigate('EXS_Customer_AdminEdit',{   
                  param_id: this.state.id,
           
                })
              }}
            />
          </View>

          <View>
            <Button
              title="ลบ"
              titleStyle={{ fontSize: 20 }} 
              textStyle={{textAlign: 'center'}}
              raised
              icon={{}}
              buttonStyle={ styles.button }            
              //onPress={ this.DeleteLocation.bind(this) }
              onPress={ this.DeleteConfirm.bind(this) }
                    
            />
          </View>



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
