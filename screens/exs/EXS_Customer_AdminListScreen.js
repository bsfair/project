
import React from "react";
import { 
  Alert, 
  StyleSheet, 
  Text, 
  TextInput, 
  View, 
  ScrollView, 
  Image,
  AsyncStorage, 
  BackHandler,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ImageBackground
} from 'react-native';
import { Button, Icon } from 'react-native-elements'
import { MonoText } from '../../components/StyledText';
import ActionButton from 'react-native-action-button';

export default class EXS_Customer_AdminListScreen extends React.Component {
    
  static navigationOptions = ({ navigation }) => ({
    title: 'รายการสมาชิก(ADMIN)',
    headerStyle: {
      backgroundColor: '#3366CC',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      textAlign: 'center',
      flexGrow:1,
      marginLeft: -45,
      alignSelf:'center',
    },
    headerLeft: (
      <TouchableOpacity  onPress={() => navigation.toggleDrawer()} >
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
    this.arrayholder = [] ;
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
  
  // sitthinai 2019_09_19, add code, for refresh screen
    //Here is the Trick
    const { navigation } = this.props;
    //Adding an event listner om focus
    //So whenever the screen will have focus it will set the state to zero
    this.focusListener = navigation.addListener('didFocus', () => {
      this.setState({         
        dataSource: null,
      });
      this.ShowEXSCustomer();
    });    
  }

  // sitthinai 2019_09_19, add code, for refresh screen
  //componentWillUnmount() {
  //  // Remove the event listener before removing the screen from the stack
  //  this.focusListener.remove();      
  //}
    
  ShowEXSCustomer =  async () => {       
    await fetch( 
    'http://172.17.146.223/traineedrive_F/public/api/exs/customer'
    )
    .then((response) => response.json())
    .then((responseJson) => {

      this.setState(
        {
          isLoading: false,
          dataSource: responseJson.customer,
        }, 
        function(){ }
      );
      this.arrayholder = responseJson.customer;
    })
    .catch((error) =>{
      console.error(error);
    });
  }
      

  SearchFilterFunction(text){
    let str = '';
    const newData = this.arrayholder.filter(function(item){
      const schedule = 'COP-'+String(item.examScheduleID).padStart(4, '0');
      const itemData = str.concat(item.examineeAccount, item.moduleNameAbbr, schedule).toUpperCase()
      //const itemData = item.ExamScheduleID.toUpperCase()
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
        width:"100%",
        backgroundColor:"rgba(0,0,0,0.5)",
        
      }}/>
    );
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.ShowEXSCustomer().then(() => {
      this.setState({refreshing: false});
    });
  }

  render() {
    const {navigate} = this.props.navigation;       

    return(     
      <View style={styles.container}>

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          <View style={styles.searchSection}>
            <Icon style={styles.searchIcon} firstname="search" size={20} color='#696969'/>
            <TextInput 
                style={styles.input}
                onChangeText={(text) => this.SearchFilterFunction(text)}
                value={this.state.text}
                underlineColorAndroid='black'
                placeholder="ค้นหาสมาชิกจากชื่อ"
            /> 
          </View>

          <FlatList
            data={this.state.dataSource}
            ItemSeparatorComponent = {this.FlatListItemSeparator}
            renderItem = { ({item}) =>              
              <TouchableOpacity 
                onPress={() => {
                  navigate('EXS_Customer_AdminView', {   

                    param_id: item.id,
                    param_firstname: item.firstname,
                    param_lastname: item.lastname,
                    param_faculty: item.department,
                    param_phone: item.phone,      
                    

                  })
                }} 
                style={styles.list} 
              >            
                <Text style={styles.text}>ลำดับที่ : { item.id }</Text>
                <Text  style={styles.text}>ชื่อ สกุล : {item.firstname} {item.lastname} </Text>
                <Text style={styles.text}>หน่วยงาน/คณะ : {item.department}</Text>
                <Text style={styles.text}>โทรศัพท์ : {item.phone}</Text>
               
                <View style={styles.buttonSection}>
                  <Button
                    onPress={() => {
                      navigate('EXS_Customer_AdminView', {
                        
                        param_id: data.item.id, 
                        param_firstname: data.item.firstname,
                        param_lastname: data.item.lastname,
                        param_faculty: data.item.department,
                        param_phone: data.item.phone,    
                        
                      })
                    }}
                    buttonStyle={ styles.button }                      
                    titleStyle={{ fontSize: 18 }}
                    title="ข้อมูลเพิ่มเติม"
                  >                
                  </Button>
                </View>
              </TouchableOpacity>
            }
            //keyExtractor={({id}, index) => id}   
            keyExtractor={item=>item.id.toString()}         
          >
            <ActionButton 
            buttonColor="rgba(231,76,60,1)" 
            onPress = {()=> {navigate('EXS_Customer_AdminAdd')}}   
          />




          </FlatList>


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
  loader:{
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
    borderRadius: 20 ,
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
    resizeMode : 'stretch',
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
  list:{
    paddingVertical: 4,
    paddingLeft: 10,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 0,
    marginTop: 0,
    backgroundColor: "#fff",    
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