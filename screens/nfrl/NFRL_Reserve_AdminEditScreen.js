
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

export default class NFRL_Reserve_AdminEditScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'จัดการข้อมูลจองโน๊ตบุ๊ค(ADMIN)',
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
      name: this.CheckParam('name'),
      customer_id: this.CheckParam('customer_id'),
      staff_id: this.CheckParam('staff_id'),
      notebook_id: this.CheckParam('notebook_id'),
      num_machine: this.CheckParam('num_machine'),
      num_date: this.CheckParam('num_date'),
      reserve_status: this.CheckParam('reserve_status'),
      queue_order: this.CheckParam('queue_order'),
      reserve_date: this.CheckParam('reserve_date'),
      use_date: this.CheckParam('use_date'),
      appoint_date: this.CheckParam('appoint_date'),
      receive_date: this.CheckParam('receive_date'),
      return_date: this.CheckParam('return_date'),
      status: this.CheckParam('status'),
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

    this.GetReserve();
  }

  GetReserve = async () => {    

    fetch(
      'http://172.17.146.223/traineedrive/public/api/nfrl2/reserve/' + this.state.id
     

      
    )
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState(
          {
            isLoading: false,
            // dataSource: responseJson.examinee_exam[0].examinee,
            // dataSource_score: responseJson.examinee_exam[0].exam_score_includes,


            id: responseJson.reserve.id,
            code: responseJson.reserve.code,
            name: responseJson.reserve.name,
            customer_id: responseJson.reserve.customer_id,
            staff_id: responseJson.reserve.staff_id,
            notebook_id: responseJson.reserve.notebook_id,
            num_machine: responseJson.reserve.num_machine,
            reserve_status: responseJson.reserve.reserve_status,
            queue_order: responseJson.reserve.queue_order,
            reserve_date: responseJson.reserve.reserve_date,
            num_date: responseJson.reserve.num_date,
            use_date: responseJson.reserve.use_date,
            appoint_date: responseJson.reserve.appoint_date,
            receive_date: responseJson.reserve.receive_date,
            return_date: responseJson.reserve.return_date,
            status: responseJson.reserve.status,
            remark: responseJson.reserve.remark,
            created_by: responseJson.reserve.created_by,
            updated_by: responseJson.reserve.updated_by,
          
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
      code, name, customer_id, staff_id, notebook_id, 
      num_machine, reserve_status, queue_order, reserve_date, 
      num_date, use_date, appoint_date, receive_date, return_date, 
      status, remark, created_by, updated_by

    } = this.state;

    const nFRL_ReserveApi = new NFRL_ReserveApi();

    try {
        
      let response_msg = 'no update';
      let data = {
        
        id: id,
        code: code,
        name: name,
        customer_id: customer_id,
        staff_id: staff_id,
        notebook_id: notebook_id,
        num_machine: num_machine,
        reserve_status: reserve_status,
        queue_order: queue_order,
        reserve_date: reserve_date,
        num_date: num_date,
        use_date: use_date,
        appoint_date: appoint_date,
        receive_date: receive_date,
        return_date: return_date,
        status: status,
        remark: remark,
        created_by: created_by,
        updated_by: updated_by,


      
      };

      response_msg = await nFRL_ReserveApi.update(id, data);

      Alert.alert(JSON.stringify(response_msg));

    } catch (error) {
      console.error(error);
    }

    //navigate('DTS_Personnel_List')
    navigate('NFRL_Reserve_AdminView',{

      param_id: this.state.id,
      param_code: this.state.code,
      param_name: this.state.name,
      param_customer_id: this.state.customer_id,
      param_staff_id: this.state.staff_id,
      param_notebook_id: this.state.notebook_id,
      param_num_machine: this.state.num_machine,
      param_reserve_status: this.state.reserve_status,
      param_queue_order: this.state.queue_order,
      param_reserve_date: this.state.reserve_date,
      param_num_date: this.state.num_date,
      param_use_date: this.state.use_date,
      param_appoint_date: this.state.appoint_date,
      param_receive_date: this.state.receive_date,
      param_return_date: this.state.return_date,
      param_status: this.state.status,
      param_remark: this.state.remark,
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
            ข้อมูลการจอง
          </Text>

         
        
          <View style={{flex: 1, flexDirection: 'row'}}>
           

            <Text style={styles.text_index}>ลำดับรายการ : </Text>
            <TextInput
              value={this.state.id}
              onChangeText={(id) => this.setState({ id })}
              style={styles.input_index}
              editable={false} 
              keyboardType='numeric'
            />              
          </View>
          
          <Text style={styles.text}>รหัสรายการจอง :</Text>
          <TextInput 
            value={this.state.code}
            onChangeText={(code) => this.setState({ code })}
            placeholder={'รหัสรายการจอง'}
            style={styles.input} 
          />

          <Text style={styles.text}>ชื่อ-สกุลผู้จอง :</Text>
          <TextInput 
            value={this.state.name}
            onChangeText={(name) => this.setState({ name })}
            placeholder={'ชื่อ-สกุล'}
            style={styles.input} 
          />

          <Text style={styles.text}>รหัสสมาชิก :</Text>
          <TextInput 
            value={this.state.customer_id.toString()}
            onChangeText={(customer_id) => this.setState({ customer_id })}
            placeholder={'รหัสสมาชิก'}
            style={styles.input} 
          />

          <Text style={styles.text}>รหัสเครื่องเช่า :</Text>
          <TextInput 
            value={this.state.notebook_id}
            onChangeText={(notebook_id) => this.setState({ notebook_id })}
            placeholder={'รหัสเครื่องเช่า'}
            style={styles.input} 
          />

          <Text style={styles.text}>จำนวนโน๊ตบุ๊ค :</Text>
          <TextInput 
            value={this.state.num_machine.toString()}
            onChangeText={(num_machine) => this.setState({ num_machine })}
            placeholder={'จำนวนโน๊ตบุ๊ค'}
            style={styles.input} 
          />

          <Text style={styles.text}>สถานะการจอง :</Text>
          <TextInput 
            value={this.state.reserve_status}
            onChangeText={(reserve_status) => this.setState({ reserve_status })}
            placeholder={'สถานะการจอง'}
            style={styles.input} 
          />

          <Text style={styles.text}>วันที่จองใช้งาน :</Text>          
          <DatePicker            
            date={this.state.use_date}
            mode="datetime"
            placeholder="select date"
            format="YYYY-MM-DD HH:mm:ss"
            is24Hour={true} 
            minDate="2020-01-01"
            maxDate="2022-12-31"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            placeholder="วันที่จองใช้งาน"
            style={{
              minWidth: 300, 
              borderColor: 'gray',
              borderRadius: 20,    
              borderWidth: 1,
              height: 49,               
              borderRadius: 20,
              paddingLeft: 10,
              paddingTop: 5,
              paddingRight: 10,
              paddingBottom: 5,  
            }}
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36, 
                borderWidth: 0,                              
              },
              dateText: {                
                fontSize: 18,
                borderWidth: 0, 
              },
              placeholderText: {
                fontSize: 18,                
              }              
            }}
            onDateChange={(use_date) => this.setState({use_date})}
          />

          <Text style={styles.text}>วันกำหนดคืน :</Text>          
          <DatePicker            
            date={this.state.appoint_date}
            mode="datetime"
            placeholder="select date"
            format="YYYY-MM-DD HH:mm:ss"
            is24Hour={true} 
            minDate="2020-01-01"
            maxDate="2022-12-31"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            placeholder="วันกำหนดคืน"
            style={{
              minWidth: 300, 
              borderColor: 'gray',
              borderRadius: 20,    
              borderWidth: 1,
              height: 49,               
              borderRadius: 20,
              paddingLeft: 10,
              paddingTop: 5,
              paddingRight: 10,
              paddingBottom: 5,  
            }}
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36, 
                borderWidth: 0,                              
              },
              dateText: {                
                fontSize: 18,
                borderWidth: 0, 
              },
              placeholderText: {
                fontSize: 18,                
              }              
            }}
            onDateChange={(appoint_date) => this.setState({appoint_date})}
          /> 

          <Text style={styles.text}>สถานะ :</Text>
          <TextInput 
            value={this.state.status}
            onChangeText={(status) => this.setState({ status })}
            placeholder={'สถานะการจอง'}
            style={styles.input} 
          />

          <Text style={styles.text}>หมายเหตุ :</Text>
          <TextInput 
            value={this.state.remark}
            onChangeText={(remark) => this.setState({ remark })}
            placeholder={'หมายเหตุ'}
            style={styles.input} 
          />   

           
          <Button
            title={`บันทึก`}
            titleStyle={{ fontSize: 20 }}
            textStyle={{textAlign: 'center'}}           
            raised
            icon={{}}
            buttonStyle={ styles.button }            
            onPress={ this.UpdateData.bind(this) }
          />
                
          <Button
            title="ยกเลิก"
            titleStyle={{ fontSize: 20 }}
            textStyle={{ textAlign: 'center' }}            
            raised
            icon={{}}
            buttonStyle={ styles.button }
            onPress={ () =>  navigate('NFRL_Reserve_AdminView') }            
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
