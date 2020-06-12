
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
import EXS_ExaminationApi from '../../class_api/EXS_ExaminationApi';

export default class EXS_Examination_ViewScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'ข้อมูลงานตรวจข้อสอบ',
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
      faculty: this.CheckParam('faculty'),
      machine: this.CheckParam('machine'),
      subject: this.CheckParam('subject'),
      num_sheet: this.CheckParam('num_sheet'),
      staffname: this.CheckParam('staffname'),
      exs_date: this.CheckParam('exs_date'),
      status: this.CheckParam('status'),
      remark: this.CheckParam('remark'),
      created_by: this.CheckParam('created_by'),
      updated_by: this.CheckParam('updated_by'),
      created_at: this.CheckParam('created_at'),
      updated_at: this.CheckParam('updated_at'),

      
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

    this.ShowExsTrace();
  }

  ShowExsTrace = async () => {

    fetch(
      'http://172.17.146.223/traineedrive_F/public/api/exs/trace/' + this.state.id

    )
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState(
          {
            isLoading: false,
            // dataSource: responseJson.examinee_exam[0].examinee,
            // dataSource_score: responseJson.examinee_exam[0].exam_score_includes,
            id: responseJson.trace.id,
            code: responseJson.trace.code,
            name: responseJson.trace.name,
            faculty: responseJson.trace.faculty,
            machine: responseJson.trace.machine,
            subject: responseJson.trace.subject,
            num_sheet: responseJson.trace.num_sheet,
            staffname: responseJson.trace.staffname,
            exs_date: responseJson.trace.exs_date,
            status: responseJson.trace.status,
            remark: responseJson.trace.remark,
            created_by: responseJson.trace.created_by,
            updated_by: responseJson.trace.updated_by,
            created_at: responseJson.trace.created_at,
            updated_at: responseJson.trace.updated_at,

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
    const eXS_ExaminationApi = new EXS_ExaminationApi();

    try {        
      let response_msg = 'no delete';     
      response_msg = await eXS_ExaminationApi.destroy(id);
      Alert.alert(JSON.stringify(response_msg));      
    } catch (error) {
      console.error(error);
    }

    navigate('EXS_Examination_List');
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
          onDidFocus={() => this.ShowExsTrace()}
        />
        <ScrollView>

          <Text style={styles.header}>
            รายละเอียดงานตรวจข้อสอบ
          </Text>
        

          <Text style={styles.text}>ลำดับที่ : {this.state.code}</Text>
          <Text style={styles.text}>เครื่องตรวจ  : {this.state.machine}</Text>
          <Text style={styles.text}>ว/ด/ป : {this.state.exs_date}</Text>
          <Text style={styles.text}>ชื่อ : {this.state.name}</Text>
          <Text style={styles.text}>หน่วยงาน : {this.state.faculty}</Text>
          <Text style={styles.text}>วิชา  : {this.state.subject}</Text>
          <Text style={styles.text}>จำนวน : {this.state.num_sheet}</Text>
          <Text style={styles.text}>เจ้าหน้าที่ : {this.state.staffname}</Text>

          <View style={styles.buttonSection}>
            <Button
              onPress={() => {
                navigate('EXS_Examination_List', {})
              }}
              buttonStyle={styles.button}
              titleStyle={{ fontSize: 18 }}
              title="ย้อนกลับ"
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
    textAlign: 'center',
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
