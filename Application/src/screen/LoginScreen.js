import React,{Component} from 'react';
import {Text,View,StyleSheet,TouchableOpacity,Image,TextInput,KeyboardAvoidingView} from 'react-native';
import {connect}from 'react-redux';
import {Button} from 'react-native-elements';
import ActionCreator from '../action/Index';

import LoginComponent from '../component/LoginComponent';

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
                <View style={{flex:1,justifyContent:"center",marginLeft:"5%",marginRight:"5%"}}>
                    <LoginComponent target="고용주" navigation = {this.props.navigation}></LoginComponent>
                    <Button onPress = {()=>this._onChangeStatus()} title="아르바이트생 로그인"></Button>
                </View>
            )
        }
        else {
            return(
                <View style={{flex:1,justifyContent:"center",marginLeft:"5%",marginRight:"5%"}}>
                    <LoginComponent target="아르바이트생" navigation = {this.props.navigation}></LoginComponent>
                    <Button onPress = {()=>this._onChangeStatus()} title="고용주 로그인"></Button>
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