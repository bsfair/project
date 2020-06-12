
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
import { Button, Icon } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import NFRL_ReserveApi from '../../class_api/NFRL_ReserveApi';

export default class NFRL_Reserve_AdminViewScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'รายละเอียดการจอง(ADMIN)',
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

    this.ShowNFRLReserve();
  }

  ShowNFRLReserve = async () => {

    fetch(
      'http://172.17.146.223/traineedrive/public/api/nfrl2/reserve/' + this.state.id
      //'http://172.17.146.223/traineedrive/public/api/nfrl2/reserve/' + this.state.id

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
            num_date: responseJson.reserve.num_date,
            reserve_status: responseJson.reserve.reserve_status,
            queue_order: responseJson.reserve.queue_order,
            reserve_date: responseJson.reserve.reserve_date,
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
    const nFRL_ReserveApi = new NFRL_ReserveApi();

    try {        
      let response_msg = 'no delete';     
      response_msg = await nFRL_ReserveApi.destroy(id);
      Alert.alert(JSON.stringify(response_msg));      
    } catch (error) {
      console.error(error);
    }

    navigate('NFRL_Reserve_AdminList');
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>

      <NavigationEvents
          //onWillFocus={payload => console.log('will focus',payload)}
          //onDidFocus={payload => console.log('did focus',payload)}
          //onWillBlur={payload => console.log('will blur',payload)}
          //onDidBlur={payload => console.log('did blur',payload)}
          onDidFocus={() => this.ShowNFRLReserve()}
        />
        <ScrollView>

          <Text style={styles.header}>
            ข้อมูลการจองเช่า
          </Text>
        
          <Text style={styles.text}>ลำดับรายการ : {this.state.id}</Text>
          <Text style={styles.text}>รหัสรายการจอง : {this.state.code}</Text>
          <Text style={styles.text}>ชื่อ-สกุลผู้จอง  : {this.state.name}</Text>
          <Text style={styles.text}>รหัสสมาชิก  : {this.state.customer_id}</Text>
          <Text style={styles.text}>รหัสเครื่องเช่า  : {this.state.notebook_id}</Text>
          <Text style={styles.text}>จำนวนโน๊ตบุ๊ค  : {this.state.num_machine}</Text>
          <Text style={styles.text}>สถานะการจอง : {this.state.reserve_status}</Text>
          <Text style={styles.text}>วันที่ดำเนินการจอง : {this.state.reserve_date}</Text>
          <Text style={styles.text}>วันที่ต้องการใช้งาน : {this.state.use_date}</Text>
          <Text style={styles.text}>วันกำหนดคืน : {this.state.appoint_date}</Text>
          <Text style={styles.text}>สถานะ : {this.state.status}</Text>
          <Text style={styles.text}>หมายเหตุ : {this.state.remark}</Text>

        <View>
          <Button            
            title="แก้ไข"
            titleStyle={{ fontSize: 20 }}
            textStyle={{textAlign: 'center'}}
            raised
            icon={{}}
            buttonStyle={ styles.button }
            onPress={ () => {
              navigate('NFRL_Reserve_AdminEdit',{
                param_id: this.state.id,
                param_code: this.state.code,
                param_name: this.state.name,
                param_customer_id: this.state.customer_id,
                param_notebook_id: this.state.notebook_id,
                param_num_machine: this.state.num_machine,
                param_reserve_status: this.state.reserve_status,
                param_use_date: this.state.use_date,
                param_appoint_date: this.state.appoint_date,
                param_status: this.state.status,
                param_remark: this.state.remark,

                
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

        <View style={styles.buttonSection}>
          <Button
            onPress={() => {
              navigate('NFRL_Reserve_AdminList', {})
            }}
            buttonStyle={styles.button}
            titleStyle={{ fontSize: 18 }}
            title="กลับไปยังหน้าหลัก"
                  >
          </Button>
        </View>
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
