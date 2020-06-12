
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
import EXS_ReserveApi from '../../class_api/EXS_ReserveApi';
import { Button, Icon } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';

export default class EXS_Reserve_AdminEditScreen extends React.Component {  
  
  static navigationOptions = ({ navigation }) => ({
    title: 'จัดการข้อมูลจองตรวจข้อสอบ(ADMIN)',
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
      code: this.CheckParam('code'),
      name: this.CheckParam('name'),
      subject_id: this.CheckParam('subject_id'),
      number_subject: this.CheckParam('number_subject'),
      name_subject: this.CheckParam('name_subject'),
      num_sheet: this.CheckParam('num_sheet'),
      customer_id: this.CheckParam('customer_id'),
      staff_id: this.CheckParam('staff_id'),
      room_id: this.CheckParam('room_id'),
      machine_id: this.CheckParam('machine_id'),
      reserve_status: this.CheckParam('reserve_status'),
      queue_order: this.CheckParam('queue_order'),
      reserve_date: this.CheckParam('reserve_date'),
      examination_date: this.CheckParam('examination_date'),
      status: this.CheckParam('status'),
      remark: this.CheckParam('remark'),
      created_by: this.CheckParam('created_by'),
      updated_by: this.CheckParam('updated_by'),
  
    };    
  }
  
  componentDidMount() { 
    /*const { navigate } = this.props.navigation;
    AsyncStorage.multiGet(['username', 'password']).then((data) => {
        let username = data[0][1];
        let password = data[1][1];

        //if (username !== 'tonlove') {
        if(typeof username !== 'string' || username === null || username === undefined) {
          navigate('SignIn', {name: 'User'})        
        }
    });*/

    this.GetCoPTNew();      
  }  
  
  GetCoPTNew = async () => {     
    
    fetch(      
      'http://172.17.146.223/traineedrive_F/public/api/exs/reserve/' + this.state.id 
      )   
      .then((response) => response.json())
      .then((responseJson) => {

      this.setState(
        {
          isLoading: false,          
          //dataSource: responseJson.examinee_exam[0].examinee, //
          //dataSource_score: responseJson.examinee_exam[0].exam_score_includes, 
          id: responseJson.reserve.id,
          code: responseJson.reserve.code,
          name: responseJson.reserve.name,
          subject_id: responseJson.reserve.subject_id,
          number_subject: responseJson.reserve.number_subject,
          name_subject: responseJson.reserve.name_subject,
          num_sheet: responseJson.reserve.num_sheet,
          customer_id: responseJson.reserve.customer_id,
          staff_id: responseJson.reserve.staff_id,
          room_id: responseJson.reserve.room_id,
          machine_id: responseJson.reserve.machine_id,
          reserve_status: responseJson.reserve.reserve_status,
          queue_order: responseJson.reserve.queue_order,
          reserve_date: responseJson.reserve.reserve_date,
          examination_date: responseJson.reserve.examination_date,
          status: responseJson.reserve.status,
          remark: responseJson.reserve.remark,
          created_by: responseJson.reserve.created_by,
          updated_by: responseJson.reserve.updated_by,

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


UpdateData = async () => {                      //

    const { navigate } = this.props.navigation;

    const { id, code, name, subject_id, number_subject, name_subject, num_sheet, customer_id, 
      staff_id, room_id, machine_id, reserve_status, queue_order, reserve_date, 
      examination_date, status, remark, created_by, updated_by

    } = this.state;

    const eXS_ReserveApi = new EXS_ReserveApi(); 

    try {
        
      let response_msg = 'no update';
      let data = {
   
        id: id,
        code: code,
        name: name,
        subject_id: subject_id,
        number_subject: number_subject,
        name_subject: name_subject,
        num_sheet: num_sheet,
        customer_id: customer_id,
        staff_id: staff_id,
        room_id: room_id,
        machine_id: machine_id,
        reserve_status: reserve_status,
        queue_order: queue_order,
        reserve_date: reserve_date,
        examination_date: examination_date,
        status: status,
        remark: remark,
        created_by: created_by,
        updated_by: updated_by,
      };

      //alert('firstname'+this.state.firstname);

      response_msg = await eXS_ReserveApi.update(id, data); //

      Alert.alert(JSON.stringify(response_msg));

    } catch (error) {
      console.error(error);
    }

    //navigate('DTS_Personnel_List')
    navigate('EXS_Reserve_View',{

      param_id: this.state.id,
      code: this.state.code,
      name: this.state.name,
      subject_id: this.state.subject_id,
      number_subject: this.state.number_subject,
      name_subject: this.state.name_subject,
      num_sheet: this.state.num_sheet,
      customer_id: this.state.customer_id,
      staff_id: this.state.staff_id,
      room_id: this.state.room_id,
      machine_id: this.state.machine_id,
      reserve_status: this.state.reserve_status,
      queue_order: this.state.queue_order,
      reserve_date: this.state.reserve_date,
      examination_date: this.state.examination_date,
      status: this.state.status,
      remark: this.state.remark,
      created_by: this.state.created_by,
      updated_by: this.state.updated_by,
    });
    
  }


  render() {
    const {navigate} = this.props.navigation;                  

     return (
      <View style={styles.container}>
        <ScrollView>

          <Text style={styles.header}>
            ข้อมูลผู้ใช้บริการ
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
          
          <Text style={styles.text}>รหัส :</Text>
          <TextInput 
            value={this.state.code}
            onChangeText={(code) => this.setState({ code })}
            placeholder={'รหัส'}
            style={styles.input} 
          />

          <Text style={styles.text}>ชื่อ-สกุลผู้ :</Text>
          <TextInput 
            value={this.state.name}
            onChangeText={(name) => this.setState({ name })}
            placeholder={'ชื่อ-สกุล'}
            style={styles.input} 
          />

          <Text style={styles.text}>รหัสเครื่องเช่า :</Text>
          <TextInput 
            value={this.state.notebook_id}
            onChangeText={(notebook_id) => this.setState({ notebook_id })}
            placeholder={'รหัสเครื่องเช่า'}
            style={styles.input} 
          />

          <Text style={styles.text}>วันที่ทำรายการจอง :</Text>
          <TextInput 
            value={this.state.reserve_date}
            onChangeText={(reserve_date) => this.setState({ reserve_date })}
            placeholder={'วันที่ทำรายการจอง'}
            style={styles.input} 
          />

          <Text style={styles.text}>วันที่ใช้เครื่อง :</Text>
          <TextInput 
            value={this.state.use_date}
            onChangeText={(use_date) => this.setState({ use_date })}
            placeholder={'วันที่ใช้เครื่อง'}
            style={styles.input} 
          />

          <Text style={styles.text}>วันที่จะคืนเครื่อง :</Text>
          <TextInput 
            value={this.state.receive_date}
            onChangeText={(receive_date) => this.setState({ receive_date })}
            placeholder={'วันที่จะคืนเครื่อง'}
            style={styles.input} 
          />

          <Text style={styles.text}>สถานะการจอง :</Text>
          <TextInput 
            value={this.state.status}
            onChangeText={(status) => this.setState({ status })}
            placeholder={'สถานะการจอง'}
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
            onPress={ () =>  navigate('EXS_Reserve_List') }            
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
    backgroundColor: 'lightgray',*/
    
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
