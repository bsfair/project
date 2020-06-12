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

export default class EXS_ListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'รายละเอียดจองตรวจข้อสอบ',
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


render() {
    const {navigate} = this.props.navigation;

    return (
          <ImageBackground source={require('../../image/detailBackground.jpg')}
        style={styles.backdrop}>  
      <View style={styles.container}>

        <ScrollView>

             

           
          <Text style={styles.header}>
            ขั้นตอนใช้บริการหลังจากจองสำเร็จ
          </Text>

          <Text style={styles.details}>
            1. กรอกแบบขอใช้บริการกระดาษคำตอบ / หน่วยงานภายนอกนำหนังสือขอจองตรวจข้อสอบถึง ผอ.ศูนย์คอมพิวเตอร์
          </Text>

          <Text style={styles.details}>
            2. ตรวจสอบการระบายกระดาษคำตอบให้เรียบร้อยก่อนส่งตรวจ
          </Text>

          <Text style={styles.details}>
            3. ส่งเฉลยกระดาษคำตอบที่ระบายถูกต้องเรียบร้อยแล้ว พร้อมแนบรหัส และรายชื่อนักศึกษาที่เข้าสอบ
          </Text>

          <Text style={styles.details}>            
              4. นัดหมายวันเวลาการตรวจข้อสอบกับเจ้าหน้าที่ศูนย์ ฯ เพื่อเป็นสักขีพยานในการดำเนินการตรวจข้อสอบ และเพื่อตรวจสอบ รวมทั้งแก้ไขข้อบกพร่องของกระดาษคำตอบที่อาจเกิดขึ้น
          </Text>       
      
          <Text style={styles.header}>
            เงื่อนไข/ขอบเขตการให้บริการ
          </Text>

          <Text style={styles.details}>
            1. กระดาษคำตอบที่ไม่ต้องสร้างฟอร์มใหม่(ไม่คิดค่าสร้างฟอร์ม)กระดาษคำตอบ ID 10 หลัก จำนวนข้อสอบ 180 ข้อ 5 ตัวเลือก
          </Text>

          <Text style={styles.details}>
            2. ศูนย์ ฯ ไม่รับผิดชอบการเพิ่มเติมหรือแก้ไขข้อผิดพลาดใด ๆ บนกระดาษคำตอบ
          </Text>

          <Text style={styles.details}>
            3. การพิมพ์ ลงคะแนนดิบและคะแนนที (T-score) ลงบน กระดาษ มี 2 แบบ ดังนี้
              -เรียงลำดับตามรหัสนักศึกษาหรือเลขที่นั่งสอบ จากน้อยไปหามาก
              -เรียงลำดับตามคะแนนดิบจากมากไปหาน้อย (กรณีข้อสอบที่มีมากกว่า1Subtest คะแนนดิบและ คะแนนที่ได้จะเป็นคะแนนรวมทุก Subtest)
          </Text>

          <Text style={styles.details}>
            4. สำเนาข้อมูลการตรวจและผลคะแนนจะจัดทำเป็น Excel file
          </Text>

          <Text style={styles.details}>
            5. ศูนย์ ฯ จะสำรองข้อมูลผลการตรวจกระดาษคำตอบไว้เพียง 7 วันทำการ หากพ้นกำหนด ศูนย์ ฯ จะไม่รับผิดชอบข้อมูลดังกล่าว
          </Text>


           <Button
              title="จองตรวจข้อสอบ"
              titleStyle={{ fontSize: 20 }}
              textStyle={{ textAlign: 'center' }}            
              icon={{}}
              buttonStyle={ styles.button }
              onPress={ () =>  navigate('EXS_Reserve_Add') }            
            /> 

    

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
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 15,
  },
  text: {
    marginBottom: 5,
    fontSize: 20,
  },
  details: {
    fontSize:14,
    color:"#000000",

    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
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
    backgroundColor: '#00B2EE',
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