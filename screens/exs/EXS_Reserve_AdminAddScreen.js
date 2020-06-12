
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

export default class EXS_Reserve_AdminAddScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'เพิ่มข้อมูลจองตรวจข้อสอบ(ADMIN)',
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
  });

  constructor(props) {
    super(props)

    this.state = {

      dataSource: null,
      //dataSource_score: null,
      dataSource_staff: null,
      dataSource_customer: null,
      dataSource_machine: null,
      dataSource_reserve: null,
      dataSource_examination: null,


      //id: this.CheckParam('id'),
      id: "",
      code: "",
      name: "",
      subject_id: "",
      number_subject: "",
      name_subject: "",
      num_sheet: "",
      customer_id: "",
      staff_id: "",
      room_id: "",
      machine_id: "",
      reserve_status: "",
      queue_order: "",
      reserve_date: "",
      examination_date: "",
      status: "",
      remark: "",
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

    
    this.GetEXSTNew();
    this.GetStaff();
    this.GetCustomer();
    this.GetMachine();
    this.GetReserve();
    this.GetExamination();
    
    
  }

  CheckParam(p_name) {
    let p_val = this.props.navigation.getParam('param_' + p_name);
    return (p_val == null ? "" : (p_val != "null" ? String(p_val) : ""));
  }
  
  GetEXSTNew = async () => {    

    fetch(
      //'http://172.17.146.223/traineedrive_F/public/api/exs/reserve/' + this.state.id
      'http://172.17.146.223/traineedrive_F/public/api/exs/reserve/1'
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
          function () { }
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }
   
  GetStaff = async () => {   

    fetch(
      //'http://172.17.146.223/traineedrive_F/public/api/exs/reserve/' + this.state.id
      'http://172.17.146.223/traineedrive_F/public/api/exs/staff/1'
    )
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState(
          {
            isLoading: false,
            //dataSource_score: responseJson.examinee_exam[0].exam_score_includes,
            dataSource_staff: responseJson.staff,           
          },
          function () { }
        );
      })
      .catch((error) => {
        console.error(error);
      });

  }

  GetCustomer = async () => {  

    fetch(
      //'http://172.17.146.223/traineedrive_F/public/api/exs/customer/' + this.state.id
      'http://172.17.146.223/traineedrive_F/public/api/exs/customer/1'
    )
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState(
          {
            isLoading: false,
            dataSource_customer: responseJson.customer,
          },
          function () { }
        );
      })
      .catch((error) => {
        console.error(error);
      });
    
  }

  GetMachine= async () => {  

    fetch(
      //'http://172.17.146.223/traineedrive_F/public/api/exs/machine/' + this.state.id
      'http://172.17.146.223/traineedrive_F/public/api/exs/machine/1'
    )
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState(
          {
            isLoading: false,
            dataSource_machine: responseJson.machine,
          },
          function () { }
        );
      })
      .catch((error) => {
        console.error(error);
      });
    
  }

  GetReserve = async () => {  

    fetch(
      //'http://172.17.146.223/traineedrive_F/public/api/exs/reserve/' + this.state.id
      'http://172.17.146.223/traineedrive_F/public/api/exs/reserve/1'
    )
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState(
          {
            isLoading: false,
            dataSource_reserve: responseJson.reserve,
          },
          function () { }
        );
      })
      .catch((error) => {
        console.error(error);
      });
    
  }

  GetExamination = async () => {  

    fetch(
     //'http://172.17.146.223/traineedrive_F/public/api/exs/examination/' + this.state.id
     'http://172.17.146.223/traineedrive_F/public/api/exs/examination/1'
    )
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState(
          {
            isLoading: false,
            dataSource_examination: responseJson.examination,
          },
          function () { }
        );
      })
      .catch((error) => {
        console.error(error);
      });
    
  }
  
  AddData = async () => {    

    const { navigate } = this.props.navigation;

    const { /*id,
      code,  no, prefix, firstname, surname,
      position, personneltype, address, telephone, email, 
      division, detail, remark, created_at, updated_at,*/
      id, 
      code, name, subject_id, number_subject, name_subject, num_sheet, customer_id, 
      staff_id, room_id, machine_id, reserve_status, queue_order, reserve_date, 
      examination_date, status, remark, created_by, updated_by

    } = this.state;


    const eXS_ReserveApi = new EXS_ReserveApi();

    try {
        
      let response_msg = 'no update';

      // เงื่อนไขการจอง
      /*
      1. Load Notbook_All
      2. Load Notbook_Rent
      3. Load Customer
      4. Load Reserve
      */
      //
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

      response_msg = await eXS_ReserveApi.create(data);

      Alert.alert(JSON.stringify(response_msg));

    } catch (error) {
      console.error(error);
    }

    //navigate('DTS_Personnel_List')
    navigate('EXS_Reserve_View',{

      param_id: this.state.id,
      param_code: this.state.code,
      param_name: this.state.name,
      param_subject_id: this.state.subject_id,
      param_number_subject: this.state.number_subject,
      param_name_subject: this.state.name_subject,
      param_num_sheet: this.state.num_sheet,
      param_customer_id: this.state.customer_id,
      param_staff_id: this.state.staff_id,
      param_room_id: this.state.room_id,
      param_machine_id: this.state.machine_id,
      param_reserve_status: this.state.reserve_status,
      param_queue_order: this.state.queue_order,
      param_reserve_date: this.state.reserve_date,
      param_examination_date: this.state.examination_date,
      param_status: this.state.status,
      param_remark: this.state.remark,
      param_created_by: this.state.created_by,
      param_updated_by: this.state.updated_by,
      /*
      param_name: this.state.name,
      param_grouptype: this.state.grouptype,
      param_latitude: this.state.latitude,
      param_longitude: this.state.longitude
      */
    });
    
  }


render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.container}>
        <ScrollView>

          <Text style={styles.header}>
            จองตรวจข้อสอบ
          </Text>

          <Text style={styles.text_index}>รหัส :</Text>
          <TextInput 
            value={this.state.code.toString()}
            onChangeText={(code) => this.setState({ code })}
            style={styles.input_index} 
            editable={false}
            keyboardType='numeric'
          />

          <Text style={styles.text}>ชื่อผู้ขอใช้บริการ :</Text>
          <TextInput 
            value={this.state.name}
            onChangeText={(name) => this.setState({ name })}
            placeholder={'ชื่อผู้ขอใช้บริการ'}
            style={styles.input} 
          />


          <Text style={styles.text}>วันที่ดำเนินการจอง :</Text>
          <TextInput 
            value={this.state.reserve_date}
            onChangeText={(reserve_date) => this.setState({ reserve_date })}
            placeholder={'วันที่ดำเนินการจอง'}
            style={styles.input} 
          />

          <Text style={styles.text}>วันที่ต้องการเจองตรวจ :</Text>
          <TextInput 
            value={this.state.examination_date}
            onChangeText={(examination_date) => this.setState({ examination_date })}
            placeholder={'วันที่ต้องการเริ่มจอง'}
            style={styles.input} 
          />

          <Text style={styles.text}>จำนวนวิชา :</Text>
          <TextInput 
            value={this.state.number_subject.toString()}
            onChangeText={(number_subject) => this.setState({ number_subject })}
            placeholder={'จำนวนวิชา'}
            style={styles.input} 
          />


          <Text style={styles.text}>รหัสวิชา :</Text>
          <TextInput 
            value={this.state.subject_id.toString()}
            onChangeText={(subject_id) => this.setState({ subject_id })}
            placeholder={'รหัสวิชา'}
            style={styles.input} 
          />

          <Text style={styles.text}>ชื่อวิชา :</Text>
          <TextInput 
            value={this.state.name_subject}
            onChangeText={(name_subject) => this.setState({ name_subject })}
            placeholder={'ชื่อวิชา'}
            style={styles.input} 
          />

          <Text style={styles.text}>กระดาษคำตอบที่ต้องการตรวจโดยประมาณ(จำนวนแผ่น) :</Text>
          <TextInput 
            value={this.state.num_sheet.toString()}
            onChangeText={(num_sheet) => this.setState({ num_sheet })}
            placeholder={'จำนวนแผ่น'}
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
            onPress={ () =>  navigate('EXS_ListScreen') }            
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
