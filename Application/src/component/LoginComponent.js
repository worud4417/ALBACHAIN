import React from 'react';
import {Text,View,StyleSheet,TouchableOpacity,Image,TextInput,KeyboardAvoidingView} from 'react-native';
import {Button,Input} from 'react-native-elements';
import {connect}from 'react-redux';
import ActionCreator from '../action/Index';
import Icon from 'react-native-vector-icons/Ionicons';

import {fetchLoginEmployee,fetchLoginEmployer} from '../api/LoginApi';

class LoginComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            id:"",
            password:""
        }
    }

    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.target != this.props.target){
            this.idTextinput.clear();
            this.pwTextInput.clear();
            return true;
        }
        else{
            return false;
        }
    }

    async _login(){
        if(this.props.status == 1){
            let result = await fetchLoginEmployer(this.state.id,this.state.password);
            if(result.status == 1){
                this.props.Login(result)
                return this.props.navigation.navigate("Main");
            }
            else if(result.status == 2){
                alert("입력값이 잘못되었습니다!");
                return null;
            }
            else{
                alert("서버 오류");
                return null;
            }
        }
        else{
            let result = await fetchLoginEmployee(this.state.id,this.state.password);
            if(result.status == 1){
                this.props.Login({
                    id : result.ID,
                    name : result.NAME,
                    callnumber : result.CALLNUMBER,
                    address : "",
                    registration : "",
                    socialsecurity : result.SOCIALSECURITY
                })
                return this.props.navigation.navigate("Main");
            }
            else if(result.status == 2){
                alert("입력값이 잘못되었습니다!");
                return null;
            }
            else{
                alert("서버 오류");
                return null;
            }
        }
    }

    render(){
        let target = null;
        if(this.props.status == 1){
            target = "고용주";
        }
        else{
            target = "아르바이트생";
        }
        return(
            <KeyboardAvoidingView>
                <View style={{marginBottom:"5%"}}>
                    <Input placeholder={" "+target+" ID"}
                        inputContainerStyle={{marginBottom:"4%"}}
                        onChangeText={(text)=>this.setState({id:text})} 
                        ref={input => {this.idTextinput = input}} 
                        leftIcon={<Icon name="ios-contact" size={24} color="gray"></Icon>} 
                        leftIconContainerStyle={{marginRight:"2%"}}>
                    </Input>
                    <Input placeholder=" PASSWORD" 
                        inputContainerStyle={{marginBottom:"4%"}}
                        onChangeText={(text)=>this.setState({password:text})} 
                        ref={input => {this.pwTextInput = input}} 
                        leftIcon={<Icon name="ios-lock" size={24} color="gray"></Icon>} 
                        leftIconContainerStyle={{marginRight:"2%"}}
                        secureTextEntry={true}>
                    </Input>
                </View>
                <View >
                    <Button buttonStyle={{marginBottom:"2%"}} onPress={()=>this._login()} title="로그인"></Button>
                    <Button buttonStyle={{marginBottom:"2%"}} onPress={()=>this.props.navigation.navigate("Join")} title="회원가입" type="outline"></Button>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

function mapStateToProps(state){
    return{
        status:state.status,
        user:state.user
    }
}

function mapDispatchToProps(dispatch){
    return{
        SetTarget : (status) => {
            dispatch(ActionCreator.SetTarget(status));
        },
        Login : (user) => {
            dispatch(ActionCreator.Login(user));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginComponent);