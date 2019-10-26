import React,{Component} from 'react';
import {Text,View,StyleSheet,TouchableOpacity,Image,KeyboardAvoidingView, ScrollView} from 'react-native';
import {connect}from 'react-redux';
import ActionCreator from '../action/Index';
import {Button,Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import {fetchJobOfferSubmit} from '../api/JobOfferApi';
import {color} from '../utils/Color';
import TextInfoComponent from '../component/TextInfoComponent';

class JobOffer extends Component{
    constructor(props){
        super(props);
        this.state={
            year :2000,
            month : 1,
            day : 1,
            hour : 8,
            minute : 0,
            // startdate : "",
            period : "",
            text : ""
        }
    }

    static navigationOptions = ({ navigation }) => {
        return{
            headerTitle:() =>{
                return(
                    <Text style={{color:"white",marginLeft:"5%",fontSize:20}}>구인 등록</Text>
                )
            },
            headerStyle:{
                backgroundColor: color.blue
            }
        }
    };

    async _onSubmit(){
        this._checkDateInput(this.state.startdate)
        // const result = await fetchJobOfferSubmit(this.props.user.id,this.state.startdate,this.state.period,this.state.text);
        // if(result.status == 1){
        //     this.props.navigation.navigate("Main");
        // }
    }

    _checkDateInput(date){
    }

    render(){
        return(
            <View style={{flex:1,marginHorizontal:"5%"}}>
                <KeyboardAvoidingView style={{marginLeft:"10%",flex:3,justifyContent:"center",marginRight:"10%"}} behavior="padding" enabled>
                    <View style={{flex:1,justifyContent:"center"}}>
                        <Text style={{fontSize:20,fontWeight:"bold",alignSelf:"center",paddingBottom:"5%"}}>구인 등록</Text>
                    </View>
                    <View style={{marginBottom:"3%", flex:1,justifyContent:"center"}}>
                        <TextInfoComponent icon = {"ios-contact"} text = {"아이디 : " + this.props.user.id}></TextInfoComponent>
                    </View>
                    <View style={{flex:4}}>
                        <Text>아르바이트 시작일</Text>
                        <ScrollView >
                            <Input placeholder="년" onChangeText={(text)=>{this.setState({year:text})}}></Input>
                            <Input placeholder="월" onChangeText={(text)=>{this.setState({month:text})}}></Input>
                            <Input placeholder="일" onChangeText={(text)=>{this.setState({day:text})}}></Input>
                            <Input placeholder="시" onChangeText={(text)=>{this.setState({hour:text})}}></Input>
                            <Input placeholder="분" onChangeText={(text)=>{this.setState({minute:text})}}></Input>
                        </ScrollView>
                    </View>
                    <View style={{flex:3,justifyContent:"center"}}>
                        <Input placeholder="아르바이트 기간" 
                                inputContainerStyle={{marginBottom:"2%"}} 
                                onChangeText={(text)=>{this.setState({period:text})}}
                                leftIcon={<Icon name="ios-hourglass" size={24} color="gray"></Icon>}
                                leftIconContainerStyle={{marginRight:"2%"}}>
                        </Input>
                        <Input placeholder="아르바이트 설명" 
                                inputContainerStyle={{marginBottom:"2%"}} 
                                onChangeText={(text)=>{this.setState({text:text})}}
                                leftIcon={<Icon name="ios-information-circle-outline" size={24} color="gray"></Icon>}
                                leftIconContainerStyle={{marginRight:"2%"}}>
                        </Input>
                    </View>
                </KeyboardAvoidingView>
                <Button buttonStyle={{marginBottom:"3%"}} onPress = {()=>this._onSubmit()} title="확인"></Button>
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