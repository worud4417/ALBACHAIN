import React from 'react';
import {Text,View,StyleSheet,TouchableOpacity,Image,TextInput,KeyboardAvoidingView} from 'react-native';
import {connect}from 'react-redux';
import ActionCreator from '../action/Index';

import ButtonComponent from './ButtonComponent';

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
                this.props.Login({
                    id : result.ID,
                    name : result.NAME,
                    callnumber : result.CALLNUMBER,
                    address : result.ADDRESS,
                    registration : result.REGISTRATION,
                    socialsecurity : ""
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
        return(
            <KeyboardAvoidingView>
                <Text>{this.props.target} 로그인</Text>
                <Text>ID</Text>
                    <TextInput style={styles.textinput} onChangeText={(text)=>this.setState({id:text})} ref={input => {this.idTextinput = input}}></TextInput>
                    <Text>PASSWORD</Text>
                    <TextInput style={styles.textinput} onChangeText={(text)=>this.setState({password:text})} ref={input => {this.pwTextInput = input}}></TextInput>
                    <ButtonComponent fun={()=>this._login()} title="로그인"></ButtonComponent>
                    <ButtonComponent fun={()=>this.props.navigation.navigate("Join")} title="회원가입"></ButtonComponent>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    keyboardavoidingview:{
        alignContent:"center",
        justifyContent:"center",
        flex:1
    },
    image:{
        width:"25%",height:"20%",alignSelf:"center",marginBottom:"20%"
    },
    text:{
        fontSize:20,
        fontWeight:"bold",
        alignSelf:"center"
    }, 
    textinput:{
        borderBottomWidth:1,
        width:"100%",
        marginBottom:"5%"
    },
    touchableopacity:{
        marginLeft:"10%",
        marginTop:"5%",
        backgroundColor: "#00000020",
        padding:"3%",
        width:"80%",
        borderWidth:2,
        borderRadius:10
    }
})

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