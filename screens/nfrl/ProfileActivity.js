
import React from 'react';
import {
  Alert, 
  Button, 
  Image, 
  Platform, 
  ScrollView, 
  StatusBar,
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View,
  ImageBackground
} from 'react-native';
import { MonoText } from '../../components/StyledText';
import AppNavigator from '../../navigation/AppNavigator';
import AsyncStorage from '@react-native-community/async-storage';

export default class ProfileActivity   extends React.Component {
 
  static navigationOptions = ({ navigation }) => ({
    title: 'PSU-ProfileActivity',
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
 

 

   render()
   {

     const {goBack} = this.props.navigation;

      return(
         <View style = { styles.MainContainer }>
 
            <Text style = {styles.TextComponentStyle}> { this.props.navigation.state.params.Email } </Text>

            <Button title="Click here to Logout" onPress={ () => goBack(null) } />
 
         </View>
      );
   }
}

 
const styles = StyleSheet.create({
 
MainContainer :{
 
justifyContent: 'center',
flex:1,
margin: 10,
},
 
TextInputStyleClass: {
 
textAlign: 'center',
marginBottom: 7,
height: 40,
borderWidth: 1,
// Set border Hex Color Code Here.
 borderColor: '#2196F3',
 
 // Set border Radius.
 borderRadius: 5 ,

},

 TextComponentStyle: {
   fontSize: 20,
  color: "#000",
  textAlign: 'center', 
  marginBottom: 15
 }
});