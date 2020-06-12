
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
  AsyncStorage, 
  BackHandler,
  FlatList, 
  ActivityIndicator,
  List, 
  ListItem,
  ImageBackground
} from 'react-native';
import { MonoText } from '../../components/StyledText';
import NFRL_NotebookApi from '../../class_api/NFRL_NotebookApi';
import Moment from 'moment';
import { Button, Icon } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';


export default class NFRL_Notebook_AdminViewScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'รายละเอียดสมาชิก(ADMIN)',
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

        id: this.CheckParam('id'),
        no: this.CheckParam('no'),
        name: this.CheckParam('name'),
        nb_code: this.CheckParam('nb_code'),
        nb_serial: this.CheckParam('nb_serial'),
        nb_brand: this.CheckParam('nb_brand'),
        nb_details: this.CheckParam('nb_details'),
        nb_status: this.CheckParam('nb_status'),
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

    this.ShowNFRLNotebook();
  }

  ShowNFRLNotebook = async () => {

    fetch(
      'http://172.17.146.223/traineedrive/public/api/nfrl2/notebook/' + this.state.id
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
            
            created_by: responseJson.notebook.created_by,
            updated_by: responseJson.notebook.updated_by,

 
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
    const nFRL_CustomersApi = new NFRL_NotebookApi();

    try {        
      let response_msg = 'no delete';     
      response_msg = await nFRL_CustomersApi.destroy(id);
      Alert.alert(JSON.stringify(response_msg));      
    } catch (error) {
      console.error(error);
    }

    navigate('NFRL_Notebook_AdminList');
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
    <ImageBackground source={require('../../image/detailBackgroundImage.jpg')}
        style={styles.backdrop}>  
      <View style={styles.container}>

      <NavigationEvents
          
          onDidFocus={() => this.ShowNFRLNotebook()}
        />
        <ScrollView>

          <Text style={styles.header}>
            ข้อมูลสมาชิก
          </Text>
         
          <Text style={styles.text}>รหัสโน๊ตบุ๊ค : {this.state.nb_code}</Text>
          <Text style={styles.text}>รหัสผลิตภัณฑ์  : {this.state.nb_serial}</Text>
          <Text style={styles.text}>ยี่ห้อ : {this.state.nb_brand}</Text>
          <Text style={styles.text}>รายละเอียด : {this.state.nb_details}</Text>
          <Text style={styles.text}>สถานะ : {this.state.nb_status}</Text>

        <View style={styles.buttonSection}>
            <Button
              onPress={ () => {
                navigate('NFRL_Notebook_AdminEdit',{   
                  param_id: this.state.id,
                 
                })
              }}
              buttonStyle={styles.button}
              titleStyle={{ fontSize: 18 }}
              title="แก้ไขข้อมูล"
                    >
            </Button>
          </View> 

           <View style={styles.buttonSection}>
            <Button
              onPress={ this.DeleteConfirm.bind(this) } 
              buttonStyle={styles.button2}
              titleStyle={{ fontSize: 18 }}
              title="ลบ"
                    >
            </Button>
          </View> 

          <View style={styles.buttonSection}>
            <Button
              onPress={ () =>  navigate('NFRLHome_Admin') }
              buttonStyle={styles.button3}
              titleStyle={{ fontSize: 18 }}
              title="กลับหน้าหลักAdmin"
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
    borderRadius: 10,
    backgroundColor: '#FF6600',
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

   button3: {
    borderRadius: 10,
    backgroundColor: '#00a316',
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
