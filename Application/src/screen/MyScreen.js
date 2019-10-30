import React,{Component} from 'react';
import {Text,View,StyleSheet,TouchableOpacity,Image,TextInput,KeyboardAvoidingView, Alert} from 'react-native';
import {connect}from 'react-redux';
import ActionCreator from '../action/Index';
import {ButtonGroup,Button} from 'react-native-elements';

import  TextInfoComponent from '../component/TextInfoComponent';
import {fetchDeleteEmployee,fetchDeleteEmployer} from '../api/JoinApi';
import {fetchLoginEmployer,fetchLoginEmployee} from '../api/LoginApi';
import {color} from '../utils/Color';

class MyScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            selectedIndex:0
        }
        this.updateIndex = this.updateIndex.bind(this)
    }

    static navigationOptions = ({ navigation }) => {
        return{
            headerTitle:() =>{
                return(
                    <Text style={{color:"white",marginLeft:"5%",fontSize:20}}>내 정보</Text>
                )
            },
            headerStyle:{
                backgroundColor: color.blue
            }
        }
    };

    async _deleteUser(){
        if(this.props.status == 1){
            let result = await fetchDeleteEmployer(this.props.user[0].ID);
            if(result.status == 1){
                return this.props.navigation.navigate("Login");
            }
        }
        else{
            let result = await fetchDeleteEmployee(this.props.user[0].ID);
            if(result.status == 1){
                return this.props.navigation.navigate("Login");
            }
        }
    }

    updateIndex (selectedIndex) {
        this.setState({selectedIndex})
        if(selectedIndex == 1){
            Alert.alert(
                '회원탈퇴',
                '탈퇴하시겠습니까?',
                [
                    {text: "예",onPress:()=>this._deleteUser()},
                    {text : "아니오",onPress:()=>{return null}},
                ],
                {cancelable:false},
            )
            return null;
        }
        else{
            return this.props.navigation.navigate("Update");
        }
    }
    
    render(){
        const { selectedIndex } = this.state;
        if(this.props.status == 1){
            console.log(this.props.user)
            return(
                <View style={{flex:1}}>
                    <View style={{flex:3,margin:"5%"}}>
                        <TextInfoComponent icon={"ios-contact"} text={"ID : " + this.props.user[0].ID}></TextInfoComponent>
                        <TextInfoComponent icon={"ios-person"} text={"사업자 이름 : " + this.props.user[0].NAME}></TextInfoComponent>
                        <TextInfoComponent icon={"ios-call"} text={"사업자 전화번호 : " + this.props.user[0].CALLNUMBER}></TextInfoComponent>
                        <TextInfoComponent icon={"ios-home"} text={"사업자 주소 : " + this.props.user[0].ADDRESS}></TextInfoComponent>
                        <TextInfoComponent icon={"ios-briefcase"} text={"사업자 등록번호 : " + this.props.user[0].REGISTRATION}></TextInfoComponent>
                    </View>
                    <View style={{flex:1,margin:"5%"}}>
                        <ButtonGroup onPress={this.updateIndex} selectedIndex={selectedIndex} buttons={["회원정보수정","회원탈퇴"]} containerStyle={{height:"30%"}}></ButtonGroup>
                    </View>
                </View>
            )
        }
        else {
            return(
                <View style={{flex:1}}>
                    <View style={{flex:3,margin:"5%"}}>
                        <TextInfoComponent icon={"ios-contact"} text={"ID : " + this.props.user[0].ID}></TextInfoComponent>
                        <TextInfoComponent icon={"ios-person"} text={"이름 : " + this.props.user[0].NAME}></TextInfoComponent>
                        <TextInfoComponent icon={"ios-call"} text={"전화번호 : " + this.props.user[0].CALLNUMBER}></TextInfoComponent>
                        <TextInfoComponent icon={"ios-today"} text={"주민등록번호 : " + this.props.user[0].SOCIALSECURITY}></TextInfoComponent>
                    </View>
                    <View style={{flex:1,margin:"5%"}}>
                        <Button buttonStyle={{height:"50%",marginBottom:"3%",marginHorizontal:"20%"}} title="내 이력 보기" onPress={()=>console.log("a")}></Button>
                        <ButtonGroup onPress={this.updateIndex} selectedIndex={selectedIndex} buttons={["회원정보수정","회원탈퇴"]} containerStyle={{height:"30%"}}></ButtonGroup>
                    </View>
                </View>
            )
        }
    }
}

function mapStateToProps(state){
    return{
        status:state.status,
        user:state.user,
        jobOffer:state.jobOffer
    }
}

function mapDispatchToProps(dispatch){
    return{
        SetTarget : (status) => {
            dispatch(ActionCreator.SetTarget(status));
        },
        Login : (user) => {
            dispatch(ActionCreator.Login(user));
        },
        JobOffer : (jobOffer) => {
            dispatch(ActionCreator.JobOffer(jobOffer));
        },
        Logout : () => {
            dispatch(ActionCreator.Logout());
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MyScreen);