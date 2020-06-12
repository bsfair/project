
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
import NFRL_NotebookApi from '../../class_api/NFRL_NotebookApi';
import { Button, Icon } from 'react-native-elements';

import DatePicker from 'react-native-datepicker';

export default class NFRL_Notebook_AddScreen extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: 'เพิ่มข้อมูลโน๊ตบุ๊ค',
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
            no: "",
            name: "",
            nb_code: "",
            nb_serial: "",
            nb_brand: "",
            nb_details: "",
            nb_status: "",
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

        this.GetReserve();
    }

    GetReserve = async () => {

        fetch(
            //'http://172.17.148.164/traineedrive/public/api/nfrl2/reserve/' + this.state.id
            'http://172.17.146.223/traineedrive/public/api/nfrl2/notebook/1'
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


    AddData = async () => {

        const { navigate } = this.props.navigation;

        const {

            id, no, name, nb_code, nb_serial,
            nb_brand, nb_details, nb_status,
        } = this.state;

        const nFRL_NotebookApi = new NFRL_NotebookApi();

        try {

            let response_msg = 'no update';
            let data = {
                id: id,
                no: no,
                name: name,
                nb_code: nb_code,
                nb_serial: nb_serial,
                nb_brand: nb_brand,
                nb_details: nb_details,
                nb_status: nb_status,
            };

            response_msg = await nFRL_NotebookApi.create(data);

            Alert.alert(JSON.stringify(response_msg));

        } catch (error) {
            console.error(error);
        }

        //navigate('DTS_Personnel_List')
        navigate('NFRL_Notebook_List', {


            param_id: this.state.id,
            param_no: this.state.no,
            param_name: this.state.name,
            param_nb_code: this.state.nb_code,
            param_nb_serial: this.state.nb_serial,
            param_nb_brand: this.state.nb_brand,
            param_nb_details: this.state.nb_details,
            param_nb_status: this.state.nb_status,
        });

    }


    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>
                <ScrollView>

                    <Text style={styles.header}>
                        ข้อมูลโน๊ตบุ๊ค
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

                    <Text style={styles.text}>รหัส :</Text>
                    <TextInput
                        value={this.state.no}
                        onChangeText={(no) => this.setState({ no })}
                        placeholder={'รหัส'}
                        style={styles.input}
                    />

                    <Text style={styles.text}>ชื่อ :</Text>
                    <TextInput
                        value={this.state.name}
                        onChangeText={(name) => this.setState({ name })}
                        placeholder={'ชื่อ'}
                        style={styles.input}
                    />

                    <Text style={styles.text}>รหัสโน๊ตบุ๊ค :</Text>
                    <TextInput
                        value={this.state.nb_code}
                        onChangeText={(nb_code) => this.setState({ nb_code })}
                        placeholder={'รหัสโน๊ตบุ๊ค'}
                        style={styles.input}
                    />

                    <Text style={styles.text}>รหัสผลิตภัณฑ์ :</Text>
                    <TextInput
                        value={this.state.nb_serial}
                        onChangeText={(nb_serial) => this.setState({ nb_serial })}
                        placeholder={'รหัสผลิตภัณฑ์'}
                        style={styles.input}
                    />

                    <Text style={styles.text}>ยี่ห้อ :</Text>
                    <TextInput
                        value={this.state.nb_brand}
                        onChangeText={(nb_brand) => this.setState({ nb_brand })}
                        placeholder={'ยี่ห้อ'}
                        style={styles.input}
                    />

                    <Text style={styles.text}>รายละเอียด :</Text>
                    <TextInput
                        value={this.state.nb_details}
                        onChangeText={(nb_details) => this.setState({ nb_details })}
                        placeholder={'รายละเอียด'}
                        style={styles.input}
                    />

                    <TextInput
                        value={this.state.nb_status}
                        onChangeText={(nb_status) => this.setState({ nb_status })}
                        placeholder={'สถานะ'}
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
                        onPress={() => navigate('NFRL_Notebook_View')}
                    />


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
