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

export default class EXS_Reserve_EditScreen extends React.Component { 

  static navigationOptions = ({ navigation }) => ({
    title: 'แก้ไขข้อมูลจองตรวจข้อสอบ',
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
      'http://172.17.146.223/traineedrive_F/public/api/exs/reserve/' + this.state.id 
     

      
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
  CheckParam(p_name) {
    let p_val = this.props.navigation.getParam('param_' + p_name);
    return (p_val == null ? "" : (p_val != "null" ? String(p_val) : ""));
  }


UpdateData = async () => {    

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

      response_msg = await eXS_ReserveApi.update(id, data);

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
      <ImageBackground source={require('../../image/detailBackground.jpg')}
        style={styles.backdrop}>  
      <View style={styles.container}>
        <ScrollView>

          <Text style={styles.header}>
          ข้อมูลจองตรวจข้อสอบ
          </Text>

          <Text style={styles.text}>ชื่อ-สกุล :</Text>
          <TextInput 
            value={this.state.name}
            onChangeText={(name) => this.setState({ name })}
            placeholder={'ชื่อ-สกุล'}
            style={styles.input} 
          />

          <Text style={styles.text}>วันที่ดำเนินการจอง :</Text>          
          <DatePicker            
            date={this.state.reserve_date}
            mode="datetime"
            placeholder="select date"
            format="YYYY-MM-DD HH:mm:ss"
            is24Hour={true} 
            minDate="2020-01-01"
            maxDate="2022-12-31"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            placeholder="วันที่ดำเนินการจอง"
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
            onDateChange={(reserve_date) => this.setState({reserve_date})}
          />

          <Text style={styles.text}>วันที่ต้องการตรวจข้อสอบ :</Text>          
          <DatePicker            
            date={this.state.examination_date}
            mode="datetime"
            placeholder="select date"
            format="YYYY-MM-DD HH:mm:ss"
            is24Hour={true} 
            minDate="2020-01-01"
            maxDate="2022-12-31"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            placeholder="วันที่ต้องการตรวจข้อสอบ"
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
            onDateChange={(examination_date) => this.setState({examination_date})}
          />

          <Text style={styles.text}>จำนวนวิชา :</Text>
          <TextInput 
            value={this.state.number_subject.toString()}
            onChangeText={(number_subject) => this.setState({ number_subject })}
            placeholder={'จำนวนวิชา'}
            style={styles.input} 
          />

          <Text style={styles.text}>จำนวนกระดาษคำตอบ(แผ่น) :</Text>
          <TextInput 
            value={this.state.num_sheet.toString()}
            onChangeText={(num_sheet) => this.setState({ num_sheet })}
            placeholder={'จำนวนกระดาษคำตอบ'}
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
                onPress={ () =>  navigate('EXS_Reserve_View') }      
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
    marginTop:10,
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
    marginTop: 5,
    marginBottom: 15,
    paddingLeft: 20,
    paddingTop: 10,
    paddingRight: 20,
/*    paddingBottom: 10,*/

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
