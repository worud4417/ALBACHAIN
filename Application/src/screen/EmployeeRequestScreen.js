import React,{Component} from 'react';
import {Text,View,StyleSheet,TouchableOpacity,Image,TextInput,KeyboardAvoidingView} from 'react-native';
import {Button} from 'react-native-elements';
import {connect}from 'react-redux';
import ActionCreator from '../action/Index';

import {fetchMatchRequest} from '../api/MatchedJobApi';

class EmployeeRequestScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            okSubmit : false
        }
    }

    async _onSubmit(){
        let result = await fetchMatchRequest(this.props.navigation.getParam('jobOffer')._id,this.props.user.id);
        console.log(result);
    }

    render(){
        if(!this.state.okSubmit){
            return(
                <View>
                    <Text>EmployeeRequestScreen</Text>
                    <Text>아이디 : {this.props.navigation.getParam('jobOffer')._id}</Text>
                    <Text>시작일짜 : {this.props.navigation.getParam('jobOffer').startdate}</Text>
                    <Text>기간 : {this.props.navigation.getParam('jobOffer').period}</Text>
                    <Text>사업자 이름 : {this.props.navigation.getParam('jobOffer').name}</Text>
                    <Text>사업자 등록번호 : {this.props.navigation.getParam('jobOffer').registration}</Text>
                    <Text>사업자 전화번호 : {this.props.navigation.getParam('jobOffer').callnumber}</Text>
                    <Text>사업자 주소 : {this.props.navigation.getParam('jobOffer').address}</Text>
                    <Text>설명 : {this.props.navigation.getParam('jobOffer').text}</Text>
                    <Button title="신청하기" onPress={()=>{this.setState({okSubmit:true})}}></Button>
                    <Button title="취소" onPress={()=>{this.props.navigation.navigate("Main")}}></Button>
                </View>
            )
        }
        else{
            return(
                <View>
                    <View>
                        <Text>EmployeeRequestScreen</Text>
                        <Text>번호 : {this.props.navigation.getParam('jobOffer')._id}</Text>
                        <Text>시작일짜 : {this.props.navigation.getParam('jobOffer').startdate}</Text>
                        <Text>기간 : {this.props.navigation.getParam('jobOffer').period}</Text>
                        <Text>사업자 이름 : {this.props.navigation.getParam('jobOffer').name}</Text>
                        <Text>사업자 등록번호 : {this.props.navigation.getParam('jobOffer').registration}</Text>
                        <Text>사업자 전화번호 : {this.props.navigation.getParam('jobOffer').callnumber}</Text>
                        <Text>사업자 주소 : {this.props.navigation.getParam('jobOffer').address}</Text>
                        <Text>설명 : {this.props.navigation.getParam('jobOffer').text}</Text>
                    </View>
                    <View>
                        <Text>신청자 이름 : {this.props.user.name}</Text>
                        <Text>신청자 전화번호 : {this.props.user.callnumber}</Text>
                        <Text>주민등록번호 : {this.props.user.socialsecurity}</Text>
                    </View>
                    <Button title="확인" onPress={()=>this._onSubmit()}></Button>
                    <Button title="취소" onPress={()=>{this.props.navigation.navigate("Main")}}></Button>   
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