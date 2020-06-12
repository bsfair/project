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
  View, ImageBackground,
} from 'react-native';
import { MonoText } from '../../components/StyledText';
import { AsyncStorage, BackHandler } from 'react-native';
import { FlatList, ActivityIndicator } from 'react-native';
import Moment from 'moment';
import { List, ListItem } from 'react-native';
import NFRL_ReserveApi from '../../class_api/NFRL_ReserveApi';
import { Button, Icon } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';

export default class NFRL_ListScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'RESERVE NOTEBOOK',
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

render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.container}>

      <ImageBackground source={require('../../image/detailBackgroundImage.jpg')}
        style={styles.backdrop}>  
      <ScrollView>

      <View style={styles.title}>
          <Image source={require('../../image/main_nb.png')} style={{width: 300, height: 200}}/>
      </View> 

         
      <View style={styles.buttonSection}>
          <Button
            onPress={() => {
              navigate('NFRL_Reserve_Add', {})
            }}
            buttonStyle={styles.button}
            titleStyle={{ fontSize: 18 }}
            title="จองโน๊ตบุ๊ค"
                  >
          </Button>
      </View> 


       <View style={styles.buttonSection}>
          <Button
            onPress={() => {
              navigate('NFRL_Notebook_List', {})
            }}
            buttonStyle={styles.button2}
            titleStyle={{ fontSize: 18 }}
            title="รายละเอียดโน๊ตบุ๊ค"
                  >
          </Button>
       </View>

      <Text style={styles.header}>
        อัตราค่าบริการ
      </Text>

        <Text style={styles.details}>
          Notebook สำหรับนักศึกษา ม.อ. 50 บาท/เครื่อง/วัน
          Notebook สำหรับบุคลากร ม.อ. 150 บาท/เครื่อง/วัน
          Notebook สำหรับหน่วยงานภายใน 150 บาท/เครื่อง/วัน
          Notebook สำหรับหน่วยงานภายนอก 300 บาท/เครื่อง/วัน
        </Text>

      <Text style={styles.header}>
        ติดต่อขอใช้บริการได้ที่
      </Text>

        <Text style={styles.details}>
        - กลุ่มงานบริการวิชาการ ศูนย์คอมพิวเตอร์ โทร.0-7428-2116 ทุกวันทำการในเวลาราชการ
        </Text>

      <Text style={styles.header}>
        หลักฐานประกอบการเช่า
      </Text>

      <Text style={styles.details}>
        *นักศึกษาและบุคลากร ม.อ. ใช้บัตรนักศึกษาและบัตรประชาชน (นักศึกษาต่างชาติ ใช้บัตรนักศึกษาและ หนังสือ Passport)
      </Text>
      <Text style={styles.details}>
        *สำหรับหน่วยงาน ทำหนังสือถึง ผู้อำนวยการศูนย์คอมพิวเตอร์
      </Text>
      
         
      <Text style={styles.header}>อุปกรณ์ประกอบ</Text>


      <View style={styles.title}>
          <Image source={require('../../image/labtop.png')} style={{width: 250, height: 150}}/>
      </View>    
      <Text style={styles.title}>เครื่องNotebook</Text>


      <View style={styles.title}>
          <Image source={require('../../image/mouse.png')} style={{width: 250, height: 150}}/>
      </View>    
      <Text style={styles.title}>mouse</Text>
          
 
      <View style={styles.title}>
          <Image source={require('../../image/adapter.png')} style={{width: 250, height: 150}}/>
      </View>    
      <Text style={styles.title}>adapter</Text>


      <View style={styles.title}>
          <Image source={require('../../image/plug.png')} style={{width: 250, height: 200}}/>
      </View>    
      <Text style={styles.title}>plug</Text>
          


      <View style={styles.title}>
          <Image source={require('../../image/bag.png')} style={{width: 200, height: 250}}/>
      </View>    
      <Text style={styles.title}>bag</Text>

         




             
          

          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {width: '100%', height: '100%'},
  details: {
    fontSize:14,
    color:"#000000",

    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
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
    fontSize:15,
    textAlign:'center',
    color:"#000000",
    marginBottom:50,
    marginTop: 30,
  },
  text_index: {
    alignItems: 'center',
    fontSize: 18,
    marginTop: 20,
    marginBottom: 15,
  },
  

  button: {
    borderRadius: 10,
    backgroundColor: '#9900FF',
    height: 44,
    marginTop: 20,
    marginLeft: 70,
    marginRight: 70,
  },
  button2: {
    borderRadius: 10,
    backgroundColor: '#9900CC',
    height: 44,
    marginTop: 20,
    marginLeft: 70,
    marginRight: 70,
  },
  error: {
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 15,
  },
 

  errorMsg: {
    color: 'red'
  },
  icon: {
    paddingLeft: 10,
  }
})
