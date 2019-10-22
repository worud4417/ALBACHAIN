import React,{Component} from 'react';
import {Text,View,StyleSheet,TouchableOpacity,Image,TextInput,KeyboardAvoidingView} from 'react-native';
import {connect}from 'react-redux';
import ActionCreator from '../action/Index';

import LoginComponent from '../component/LoginComponent';
import ButtonComponent from '../component/ButtonComponent'

class LoginScreen extends React.Component{

    constructor(props){
        super(props);
    }

    _onChangeStatus(){
        if(this.props.status == 1){
            this.props.SetTarget(2);
        }
        else{
            this.props.SetTarget(1);
        }
    }

    render(){
        if(this.props.status == 1){
            return(
                <View>
                    <LoginComponent target="고용주" navigation = {this.props.navigation}></LoginComponent>
                    <ButtonComponent fun = {()=>this._onChangeStatus()} title="아르바이트생 로그인"></ButtonComponent>
                </View>
            )
        }
        else {
            return(
                <View>
                    <LoginComponent target="아르바이트생" navigation = {this.props.navigation}></LoginComponent>
                    <ButtonComponent fun = {()=>this._onChangeStatus()} title="고용주 로그인"></ButtonComponent>
                </View>
            )
        }
    }
}

function mapStateToProps(state){
    return{
        status:state.status
    }
}

function mapDispatchToProps(dispatch){
    return{
        SetTarget : (status) => {
            dispatch(ActionCreator.SetTarget(status));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginScreen);