import React,{Component} from 'react';
import {Text,View,StyleSheet,TouchableOpacity,Image,TextInput,KeyboardAvoidingView} from 'react-native';
import {connect}from 'react-redux';
import ActionCreator from '../action/Index';

class MyScreen extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        if(this.props.status == 1){
            return(
                <View>
                    <Text>고용주 정보</Text>
                    <Text>{this.props.user.id}</Text>
                    <Text>{this.props.user.name}</Text>
                    <Text>{this.props.user.callnumber}</Text>
                    <Text>{this.props.user.address}</Text>
                    <Text>{this.props.user.registration}</Text>
                </View>
            )
        }
        else {
            return(
                <View>
                    <Text>아르바이트생 정보</Text>
                    <Text>{this.props.user.id}</Text>
                    <Text>{this.props.user.name}</Text>
                    <Text>{this.props.user.callnumber}</Text>
                    <Text>{this.props.user.socialsecurity}</Text>
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
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MyScreen);