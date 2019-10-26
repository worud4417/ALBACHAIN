import React,{Component} from 'react';
import {Text,View,StyleSheet,TouchableOpacity,Image,TextInput,ScrollView} from 'react-native';
import {Button} from 'react-native-elements';
import {connect}from 'react-redux';
import ActionCreator from '../action/Index';

import TextInfoComponent from '../component/TextInfoComponent';
import {sky} from '../utils/Color';

import {fetchMatchRequest} from '../api/MatchedJobApi';

class EmployeeRequestScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            okSubmit : false
        }
    }

    static navigationOptions = ({ navigation }) => {
        return{
            headerTitle:() =>{
                return(
                    <Text>구직 신청</Text>
                )
            },
            headerStyle:{
                backgroundColor: sky
            }
        }
    };

    async _onSubmit(){
        let result = await fetchMatchRequest(this.props.navigation.getParam('jobOffer')._id,this.props.user.id);
        if(result.status == 1){
            this.props.navigation.navigate("Main");
        }
    }

    render(){
        if(!this.state.okSubmit){
            return(
                <View style={{flex:1, justifyContent:"center"}}>
                    <View style={{flex:3,margin:"5%",borderBottomWidth:2,borderBottomColor:sky}}>
                        <ScrollView>
                            <TextInfoComponent icon="ios-contact" text={"번호 : "+this.props.navigation.getParam('jobOffer')._id}></TextInfoComponent>
                            <TextInfoComponent icon="ios-time" text={"시작일짜 : "+this.props.navigation.getParam('jobOffer').startdate}></TextInfoComponent>
                            <TextInfoComponent icon="ios-hourglass" text={"기간 : "+this.props.navigation.getParam('jobOffer').period}></TextInfoComponent>
                            <TextInfoComponent icon="ios-person" text={"사업자 이름 : "+this.props.navigation.getParam('jobOffer').name}></TextInfoComponent>
                            <TextInfoComponent icon="ios-briefcase" text={"사업자 등록번호 : "+this.props.navigation.getParam('jobOffer').registration}></TextInfoComponent>
                            <TextInfoComponent icon="ios-call" text={"사업자 전화번호 : "+this.props.navigation.getParam('jobOffer').callnumber}></TextInfoComponent>
                            <TextInfoComponent icon="ios-home" text={"사업자 주소 : "+this.props.navigation.getParam('jobOffer').address}></TextInfoComponent>
                            <TextInfoComponent icon="ios-information-circle-outline" text={"설명 : "+this.props.navigation.getParam('jobOffer').text}></TextInfoComponent>
                        </ScrollView>
                    </View>
                    <View style={{flex:1,justifyContent:"center",margin:"5%"}}>
                        <Button buttonStyle={{marginBottom:"3%"}} title="신청하기" onPress={()=>{this.setState({okSubmit:true})}}></Button>
                        <Button buttonStyle={{marginBottom:"3%"}} title="취소" onPress={()=>{this.props.navigation.navigate("Main")}}></Button>
                    </View>
                </View>
            )
        }
        else{
            return(
                <View style={{flex:1, justifyContent:"center"}}>
                    <View style={{flex:3, borderBottomWidth:2,margin:"5%",borderBottomColor:sky}}>
                        <ScrollView>
                            <TextInfoComponent icon="ios-contact" text={"번호 : "+this.props.navigation.getParam('jobOffer')._id}></TextInfoComponent>
                            <TextInfoComponent icon="ios-time" text={"시작일짜 : "+this.props.navigation.getParam('jobOffer').startdate}></TextInfoComponent>
                            <TextInfoComponent icon="ios-hourglass" text={"기간 : "+this.props.navigation.getParam('jobOffer').period}></TextInfoComponent>
                            <TextInfoComponent icon="ios-person" text={"사업자 이름 : "+this.props.navigation.getParam('jobOffer').name}></TextInfoComponent>
                            <TextInfoComponent icon="ios-briefcase" text={"사업자 등록번호 : "+this.props.navigation.getParam('jobOffer').registration}></TextInfoComponent>
                            <TextInfoComponent icon="ios-call" text={"사업자 전화번호 : "+this.props.navigation.getParam('jobOffer').callnumber}></TextInfoComponent>
                            <TextInfoComponent icon="ios-home" text={"사업자 주소 : "+this.props.navigation.getParam('jobOffer').address}></TextInfoComponent>
                            <TextInfoComponent icon="ios-information-circle-outline" text={"설명 : "+this.props.navigation.getParam('jobOffer').text}></TextInfoComponent>
                        </ScrollView>
                    </View>
                    <View style={{flex:2}}>
                        <ScrollView style={{margin:"5%"}}>
                            <TextInfoComponent icon="ios-person" text={"신청자 이름 : "+this.props.user.name}></TextInfoComponent>
                            <TextInfoComponent icon="ios-call" text={"신청자 전화번호 : "+this.props.user.callnumber}></TextInfoComponent>
                            <TextInfoComponent icon="ios-today" text={"주민등록번호 : "+this.props.user.socialsecurity}></TextInfoComponent>
                        </ScrollView>
                    </View>
                    <View style={{flex:1,justifyContent:"center",margin:"5%"}}>
                        <Button buttonStyle={{marginBottom:"3%"}} title="확인" onPress={()=>this._onSubmit()}></Button>
                        <Button buttonStyle={{marginBottom:"3%"}} title="취소" onPress={()=>{this.props.navigation.navigate("Main")}}></Button>  
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
        },
        InitJobOffer : () => {
            dispatch(ActionCreator.InitJobOffer());
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EmployeeRequestScreen);