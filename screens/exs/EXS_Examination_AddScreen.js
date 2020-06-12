
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
    ListItem,
} from 'react-native';
import { MonoText } from '../../components/StyledText';
import Moment from 'moment';
import EXS_ExaminationApi from '../../class_api/EXS_ExaminationApi';
import { Button, Icon } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';

export default class EXS_Examination_AddScreen extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: 'เพิ่มข้อมูลงานตรวจข้อสอบ',
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
            code: "",
            name: "",
            faculty: "",
            machine: "",
            subject: "",
            num_sheet: "",
            staffname: "",
            exs_date: "",
            status: "",
            remark: "",
            created_by: "",
            updated_by: "",
            created_at: "",
            updated_at: "",
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

        this.GetTrace();
    }

    GetTrace = async () => {

        fetch(
            //http://172.17.146.223/traineedrive_F/public/api/exs/trace/' + this.state.id
            'http://172.17.146.223/traineedrive_F/public/api/exs/trace/1'
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


    AddData = async () => {

        const { navigate } = this.props.navigation;

        const {

            id, code, name, faculty, machine, subject,
            num_sheet, staffname, exs_date, status,
            remark, created_by, updated_by, created_at, updated_at,
        } = this.state;

        const eXS_ExaminationApi = new EXS_ExaminationApi();

        try {

            let response_msg = 'no update';
            let data = {
                id: id,
                code: code,
                name: name,
                faculty: faculty,
                machine: machine,
                subject: subject,
                num_sheet: num_sheet,
                staffname: staffname,
                exs_date: exs_date,
                status: status,
                remark: remark,
                created_by: created_by,
                updated_by: updated_by,
                created_at: created_at,
                updated_at: updated_at,
            };

            response_msg = await eXS_ExaminationApi.create(data);

            Alert.alert(JSON.stringify(response_msg));

        } catch (error) {
            console.error(error);
        }

        //navigate('DTS_Personnel_List')
        navigate('EXS_Examination_List', {


            param_id: this.state.id,
            param_code: this.state.code,
            param_name: this.state.name,
            param_faculty: this.state.faculty,
            param_machine: this.state.machine,
            param_subject: this.state.subject,
            param_num_sheet: this.state.num_sheet,
            param_staffname: this.state.staffname,
            param_exs_date: this.state.exs_date,
            param_status: this.state.status,
            param_remark: this.state.remark,
            param_created_by: this.state.created_by,
            param_updated_by: this.state.updated_by,
            param_created_at: this.state.created_at,
            param_updated_at: this.state.updated_at,
        });

    }


    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>
                <ScrollView>

                    <Text style={styles.header}>
                        ข้อมูลงานตรวจข้อสอบ
                        </Text>

                    <View style={{ flex: 1, flexDirection: 'row' }}>


                        <Text style={styles.text_index}>ลำดับรายการ : </Text>
                        <TextInput
                            value={this.state.id}
                            onChangeText={(id) => this.setState({ id })}
                            style={styles.input_index}
                            editable={false}
                            keyboardType='numeric'
                        />
                    </View>

                    <Text style={styles.text}>ลำดับที่ :</Text>
                    <TextInput
                        value={this.state.code}
                        onChangeText={(code) => this.setState({ code })}
                        placeholder={'ลำดับที่'}
                        style={styles.input}
                    />

                    <Text style={styles.text}>เครื่องตรวจ :</Text>
                    <TextInput
                        value={this.state.machine.toString()}
                        onChangeText={(machine) => this.setState({ machine })}
                        placeholder={'เครื่องตรวจ'}
                        style={styles.input}
                    />

                    <Text style={styles.text}>ว/ด/ป :</Text>
                    <TextInput
                        value={this.state.exs_date}
                        onChangeText={(exs_date) => this.setState({ exs_date })}
                        placeholder={'ว/ด/ป'}
                        style={styles.input}
                    />

                    <Text style={styles.text}>ชื่อ :</Text>
                    <TextInput
                        value={this.state.name}
                        onChangeText={(name) => this.setState({ name })}
                        placeholder={'ชื่อ'}
                        style={styles.input}
                    />

                    <Text style={styles.text}>หน่วยงาน :</Text>
                    <TextInput
                        value={this.state.faculty}
                        onChangeText={(faculty) => this.setState({ faculty })}
                        placeholder={'หน่วยงาน'}
                        style={styles.input}
                    />

                    <Text style={styles.text}>วิชา :</Text>
                    <TextInput
                        value={this.state.subject}
                        onChangeText={(subject) => this.setState({ subject })}
                        placeholder={'วิชา'}
                        style={styles.input}
                    />

                    <Text style={styles.text}>จำนวน :</Text>
                    <TextInput
                        value={this.state.num_sheet.toString()}
                        onChangeText={(num_sheet) => this.setState({ num_sheet })}
                        placeholder={'จำนวน'}
                        style={styles.input}
                    />

                    <Text style={styles.text}>เจ้าหน้าที่ :</Text>
                    <TextInput
                        value={this.state.staffname}
                        onChangeText={(staffname) => this.setState({ staffname })}
                        placeholder={'เจ้าหน้าที่'}
                        style={styles.input}
                    />

                    <Text style={styles.text}>หมายเหตุ :</Text>
                    <TextInput
                        value={this.state.remark}
                        onChangeText={(remark) => this.setState({ remark })}
                        placeholder={'หมายเหตุ'}
                        style={styles.input}
                    />



                    <Button
                        title={`บันทึก`}
                        titleStyle={{ fontSize: 20 }}
                        textStyle={{ textAlign: 'center' }}
                        raised
                        icon={{}}
                        buttonStyle={styles.button}
                        onPress={this.AddData.bind(this)}
                    />

                    <Button
                        title="ยกเลิก"
                        titleStyle={{ fontSize: 20 }}
                        textStyle={{ textAlign: 'center' }}
                        raised
                        icon={{}}
                        buttonStyle={styles.button}
                        onPress={() => navigate('EXS_Examination_View')}
                    />


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
