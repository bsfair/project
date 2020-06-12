
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

export default class NFRL_Reserve_ViewScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'รายละเอียดโน๊ตบุ๊ค',
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
      no: this.CheckParam('no'),
      name: this.CheckParam('name'),
      nb_code: this.CheckParam('nb_code'),
      nb_serial: this.CheckParam('nb_serial'),
      nb_brand: this.CheckParam('nb_brand'),
      nb_details: this.CheckParam('nb_details'),
      nb_status: this.CheckParam('nb_status'),

      
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

    this.ShowNFRLNotebook();
  }

  ShowNFRLNotebook = async () => {

    fetch(
      'http://172.17.146.223/traineedrive/public/api/nfrl2/notebook/' + this.state.id
      //'http://172.17.146.223/traineedrive/public/api/nfrl2/reserve/' + this.state.id

    )
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState(
          {
            isLoading: false,
            // dataSource: responseJson.examinee_exam[0].examinee,
            // dataSource_score: responseJson.examinee_exam[0].exam_score_includes,
            id: responseJson.notebook.id,
            no: responseJson.notebook.no,
            name: responseJson.notebook.name,
            nb_code: responseJson.notebook.nb_code,
            nb_serial: responseJson.notebook.nb_serial,
            nb_brand: responseJson.notebook.nb_brand,
            nb_details: responseJson.notebook.nb_details,
            nb_status: responseJson.notebook.nb_status,

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
    const nFRL_NotebookApi = new NFRL_NotebookApi();

    try {        
      let response_msg = 'no delete';     
      response_msg = await nFRL_NotebookApi.destroy(id);
      Alert.alert(JSON.stringify(response_msg));      
    } catch (error) {
      console.error(error);
    }

    navigate('NFRL_Notebook_List');
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
          onDidFocus={() => this.ShowNFRLNotebook()}
        />
        <ScrollView>

          <Text style={styles.header}>
            รายละเอียดโน๊ตบุ๊ค
          </Text>
        

          <Text style={styles.text}>รหัสโน๊ตบุ๊ค : {this.state.nb_code}</Text>
          <Text style={styles.text}>รหัสผลิตภัณฑ์  : {this.state.nb_serial}</Text>
          <Text style={styles.text}>ยี่ห้อ : {this.state.nb_brand}</Text>
          <Text style={styles.text}>รายละเอียด : {this.state.nb_details}</Text>
         
     

          <View style={styles.buttonSection}>
            <Button
              onPress={() => {
                navigate('NFRL_Notebook_List', {})
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
    /*flex: 1,*/
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingLeft: 20,
    paddingRight: 20,
  },
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
