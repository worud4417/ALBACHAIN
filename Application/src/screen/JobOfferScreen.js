import React,{Component} from 'react';
import {Text,View,StyleSheet,TouchableOpacity,Image,TextInput,KeyboardAvoidingView} from 'react-native';
import {connect}from 'react-redux';
import ActionCreator from '../action/Index';

import ButtonComponent from '../component/ButtonComponent';

import {fetchJobOfferSubmit} from '../api/JobOfferApi';

class JobOffer extends Component{
    constructor(props){
        super(props);
        this.state={
            startdate : "",
            period : "",
            text : ""
        }
    }

    async _onSubmit(){
        const result = await fetchJobOfferSubmit(this.props.user.id,this.state.startdate,this.state.period,this.state.text);
        if(result.status == 1){
            this.props.navigation.navigate("Main");
        }
    }

    render(){
        return(
            <View style={{flex:1}}>
                <KeyboardAvoidingView style={{marginLeft:"10%",flex:3,justifyContent:"flex-end",marginRight:"10%"}} behavior="padding" enabled>
                    <Text style={{fontSize:20,fontWeight:"bold",alignSelf:"center",paddingBottom:"5%"}}>구인 등록</Text>
                    <Text>아이디 : {this.props.user.id}</Text>
                    <Text>아르바이트 시작 일짜</Text>
                    <TextInput style={styles.textinput} onChangeText={(text)=>{this.setState({startdate:text})}}></TextInput>
                    <Text>아르바이트 기간</Text>
                    <TextInput style={styles.textinput} onChangeText={(text)=>{this.setState({period:text})}}></TextInput>
                    <Text>아르바이트 설명</Text>
                    <TextInput style={styles.textinput} onChangeText={(text)=>{this.setState({text:text})}}></TextInput>
                </KeyboardAvoidingView>
                <ButtonComponent fun = {()=>this._onSubmit()} title="확인"></ButtonComponent>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view:{
        alignContent:"center",
        justifyContent:"center",
        flex:1
    },
    text:{
        fontSize:15,
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
});

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

export default connect(mapStateToProps,mapDispatchToProps)(JobOffer);