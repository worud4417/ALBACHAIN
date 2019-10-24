import React,{Component} from 'react';
import {Text,View,StyleSheet,TouchableOpacity,Image,TextInput,KeyboardAvoidingView} from 'react-native';
import {connect}from 'react-redux';
import ActionCreator from '../action/Index';

class EmployerResponseScreen extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View>
                <Text>번호 : {this.props.navigation.getParam('jobOffer')._id}</Text>
                <Text>시작일짜 : {this.props.navigation.getParam('jobOffer').startdate}</Text>
                <Text>기간 : {this.props.navigation.getParam('jobOffer').period}</Text>
                <Text>사업자 이름 : {this.props.navigation.getParam('jobOffer').name}</Text>
                <Text>사업자 등록번호 : {this.props.navigation.getParam('jobOffer').registration}</Text>
                <Text>사업자 전화번호 : {this.props.navigation.getParam('jobOffer').callnumber}</Text>
                <Text>사업자 주소 : {this.props.navigation.getParam('jobOffer').address}</Text>
                <Text>설명 : {this.props.navigation.getParam('jobOffer').text}</Text>
            </View>
        )
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
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EmployerResponseScreen); 