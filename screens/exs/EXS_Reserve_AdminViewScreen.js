
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
import { Button, Icon } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';

export default class EXS_Reserve_AdminViewScreen extends React.Component {  
  
  static navigationOptions = ({ navigation }) => ({
    title: 'รายละเอียดจองตรวจข้อสอบ',
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

    this.ShowEXSReserve();      
  }  
  
  ShowEXSReserve = async () => {     
    
    fetch(      
      'http://172.17.146.223/traineedrive_F/public/api/exs/reserve/' + this.state.id //
      )   
      .then((response) => response.json())
      .then((responseJson) => {

      this.setState(
        {
          isLoading: false,          
          //dataSource: responseJson.examinee_exam[0].examinee, //
          //dataSource_score: responseJson.examinee_exam[0].exam_score_includes, //
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
    const eXS_ReserveApi = new EXS_ReserveApi();

    try {        
      let response_msg = 'no delete';     
      response_msg = await eXS_ReserveApi.destroy(id);
      Alert.alert(JSON.stringify(response_msg));      
    } catch (error) {
      console.error(error);
    }

    navigate('EXS_Reserve_List');
  }




  render() {
    const {navigate} = this.props.navigation;                  

    return(     
      <View style={styles.container}>

        <NavigationEvents
          //onWillFocus={payload => console.log('will focus',payload)}
          //onDidFocus={payload => console.log('did focus',payload)}
          //onWillBlur={payload => console.log('will blur',payload)}
          //onDidBlur={payload => console.log('did blur',payload)}
          onDidFocus={() => this.ShowEXSReserve()}
        />
      
        <ScrollView>
                    
          <Text style={styles.header}>
            ข้อมูลจองตรวจข้อสอบ
          </Text>          
          
          <View>
            <Text style={styles.text}>ลำดับ : { this.state.id }</Text>
            <Text style={styles.text}>รหัส : { this.state.code }</Text>
            <Text style={styles.text}>ชื่อ-สกุลผู้จอง : { this.state.name }</Text>   
            <Text style={styles.text}>วันที่ดำเนินการจอง : { this.state.reserve_date }</Text>
            <Text style={styles.text}>วันที่ต้องการเจองตรวจ : { this.state.examination_date }</Text>
            <Text style={styles.text}>จำนวนวิชา : { this.state.number_subject }</Text>  
            <Text style={styles.text}>จำนวนวิชา : { this.state.number_subject }</Text>  
            <Text style={styles.text}>รหัสวิชา : { this.state.subject_id }</Text>  
            <Text style={styles.text}>ชื่อวิชา : { this.state.name_subject }</Text> 
            <Text style={styles.text}>จำนวนแผ่น : { this.state.num_sheet }</Text>
                  
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
                navigate('EXS_Reserve_Edit',{   
                  param_id: this.state.id,
                  param_code: this.state.code,
                  param_name: this.state.subject_id,
                  param_subject_id: this.state.number_subject,
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
                  param_updated_by:this.state.updated_by,


                  /*
                  param_name: this.state.name,
                  param_grouptype: this.state.grouptype,
                  param_latitude: this.state.latitude,
                  param_longitude: this.state.longitude
                  */
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
