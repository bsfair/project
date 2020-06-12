
import React from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
  ImageBackground
} from 'react-native';
import { ScrollView, Image } from "react-native";
import { Button, Icon } from 'react-native-elements'
import { SearchBar } from 'react-native-elements'
import { AsyncStorage, BackHandler, } from 'react-native'
import { MonoText } from '../../components/StyledText';

import ActionButton from 'react-native-action-button';
import { ActivityIndicator,FlatList, TouchableOpacity, RefreshControl, } from "react-native";


export default class NFRL_Notebook_ListScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'โน๊ตบุ๊คให้บริการ',
    headerStyle: {
      backgroundColor: '#57337f',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      textAlign: 'center',
      flexGrow: 1,
      marginLeft: -45,
      alignSelf: 'center',
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
    super(props);

    this.state = {
      loading: true,
      refreshing: false,
      text: '',

      dataSource: null,
    };
    this.arrayholder = [];
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

    // sitthinai 2019_09_19, add code, for refresh screen
    //Here is the Trick
    const { navigation } = this.props;
    //Adding an event listner om focus
    //So whenever the screen will have focus it will set the state to zero
    this.focusListener = navigation.addListener('didFocus', () => {
      this.setState({
        dataSource: null,
      });
      this.ShowNFRL_Notebook();
    });
  }

  // sitthinai 2019_09_19, add code, for refresh screen
  //componentWillUnmount() {
  //  // Remove the event listener before removing the screen from the stack
  //  this.focusListener.remove();      
  //}

  ShowNFRL_Notebook = async () => {
    await fetch(
      'http://172.17.146.223/traineedrive/public/api/nfrl2/notebook'
      //'http://172.17.146.223/traineedrive/public/api/nfrl2/reserve'
      
    )
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState(
          {
            isLoading: false,
            dataSource: responseJson.notebook,
          },
          function () { }
        );
        this.arrayholder = responseJson.notebook;
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  SearchFilterFunction(text) {
    let str = '';
    const newData = this.arrayholder.filter(function (item) {
      ////const itemData = item.ExamScheduleID.toUpperCase() //
      ////const textData = text.toUpperCase()      
      
      //const schedule = 'COP-' + String(item.examScheduleID).padStart(4, '0');
      //const itemData = str.concat(item.examineeAccount, item.moduleNameAbbr, schedule).toUpperCase()
      //const textData = text.toUpperCase()
            
      const itemData = item.id.toUpperCase()
      const textData = text.toUpperCase()

      return itemData.indexOf(textData) > -1
    })
    this.setState({
      dataSource: newData,
      text: text
    })
  }

  FlatListItemSeparator = () => {
    return (
      <View style={{
        height: 1,
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",

      }} />
    );
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.ShowNFRL_Notebook().then(() => {
      this.setState({ refreshing: false });
    });
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <ImageBackground source={require('../../image/detailBackgroundImage.jpg')}
        style={styles.backdrop}>  
      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          
          

          <FlatList
            data={this.state.dataSource}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            renderItem={({ item }) =>
              <TouchableOpacity
                onPress={() => {
                  navigate('NFRL_Notebook_View', {
                    param_id: item.id, //เปิด id
              
                    /*
                    
                    param_examineeid: item.examineeID,
                    param_examinee_account: item.examineeAccount,
                    param_module_name_abbr: item.moduleNameAbbr,
                    param_scheduleid: item.examScheduleID,
                    param_enter_score_people: item.enterScorePeople,
                    param_enter_score_date: item.enterScoreDate,
                    param_is_enter_score: item.isEnterScore,
                    param_totalscore: item.totalScore,
                    param_examresult: item.examResult,
                    */


                  })
                }}
                style={styles.list}
              >
                <Text style={styles.text}>หมายเลขเครื่อง : {item.nb_code}</Text>
                <Text style={styles.text}>สถานะ : {item.nb_status}</Text>
                

                <View style={styles.buttonSection}>
                  <Button
                    onPress={() => {navigate('NFRL_Notebook_View', {
                       param_id: item.id, //เปิด id
                        /*
                        param_id: data.item.id,
                        param_code: data.item.code,
                        param_name: data.item.name,
                        */
                      })
                    }}
                    buttonStyle={styles.button}
                    titleStyle={{ fontSize: 18 }}
                    title="รายละเอียดเพิ่มเติม"
                  >
                  </Button>
                </View>
              </TouchableOpacity>
            }
            //keyExtractor={({ id }, index) => id}
            keyExtractor={item => item.id.toString()}
          >
          </FlatList>
        </ScrollView >
         
      </View >
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
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 0,
    marginTop: 15,
    marginRight: 0,
    marginBottom: 5,
  },
  searchSection_bk: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    /*borderWidth: 1,*/
    /*height: 44,*/
    borderRadius: 20,
    marginLeft: 10,
    marginTop: 15,
    marginRight: 10,
    marginBottom: 5,
    /*minWidth: 350,*/
  },
  searchIcon: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  input: {
    borderColor: 'gray',
    borderRadius: 20,
    borderWidth: 0,
    fontSize: 20,
    height: 44,
    minWidth: 250,
    /*marginTop: 5,
    marginBottom: 15,*/
    /*paddingLeft: 20,
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,*/
  },
  list: {
    paddingVertical: 4,
    paddingLeft: 10,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 0,
    marginTop: 0,
    //backgroundColor: "#fff",
  },
  searchIcon: {    
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode : 'stretch',
    alignItems: 'center',
  },
  text: {
    marginBottom: 5,
    fontSize: 18,
    marginLeft: 0,
  },
  buttonSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 0,
    marginTop: 10,
    marginRight: 0,
    marginBottom: 10,
  },
  button: {
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#004fff',
    height: 44,
    minWidth: 200,
    marginLeft: 10,
    marginTop: 0,
    marginRight: 10,
    marginBottom: 0,
  },

});