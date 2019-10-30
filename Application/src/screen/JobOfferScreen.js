import React,{Component} from 'react';
import {Text,View,StyleSheet,KeyboardAvoidingView, ScrollView} from 'react-native';
import {connect}from 'react-redux';
import ActionCreator from '../action/Index';
import {Button,Input,Overlay} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import {fetchJobOfferSubmit} from '../api/JobOfferApi';
import {color} from '../utils/Color';
import TextInfoComponent from '../component/TextInfoComponent';

class JobOffer extends Component{
    constructor(props){
        super(props);
        this.state={
            startYear :"",
            startMonth : "",
            startDay : "",
            startHour : "",
            startMinute : "",
            endYear : "",
            endMonth : "",
            endDay : "",
            endHour : "",
            endMinute : "",
            pay : "",
            text : "",
            isStartVisible: false,
            isEndVisible : false,
            startDate : "",
            endDate : "",
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
        let result = await fetchJobOfferSubmit(this.props.user.user.id,this.state.startDate,this.state.endDate,this.state.pay,this.state.text);
        if(result.status == "1"){
            this.props.navigation.navigate("Main");
            return null
        }
        return null;
    }

    _onStartDateSubmint(){
        if(!this._checkDateInput(this.state.startYear,this.state.startMonth,this.state.startDay,this.state.startHour,this.state.startMinute)){
            alert("시작일짜가 잘못되었습니다.");
            return null;
        }
        let result = this._makeDate(this.state.startYear,this.state.startMonth,this.state.startDay,this.state.startHour,this.state.startMinute)
        this.setState({isStartVisible:false,startDate : result});
        return null;
    }

    _onEndDateSubmit(){
        if(!this._checkDateInput(this.state.endYear,this.state.endMonth,this.state.endDay,this.state.endHour,this.state.endMinute)){
            alert("종료일짜가 잘못되었습니다.");
            return null;
        }
        let result = this._makeDate(this.state.endYear,this.state.endMonth,this.state.endDay,this.state.endHour,this.state.endMinute);
        this.setState({isEndVisible:false,endDate : result});
        return null;
    }

    _makeDate(year,month,day,hour,minute){
        let date = new Date();
        date.setUTCFullYear(year);
        date.setUTCMonth(month-1);
        date.setUTCDate(day);
        date.setUTCHours(hour,minute,0,0);
        return date.getTime();
    }

    _checkDateInput(year,month,day,hour,minute){
        if(this._checkNaNNumber(year) || this._checkNaNNumber(month) || this._checkNaNNumber(day) || this._checkNaNNumber(hour) || this._checkNaNNumber(minute)){
            return false;
        }
        return true;
    }

    _checkNaNNumber(value){
        if(Number.isNaN(Number.parseInt(value))){
            return true;
        }
        return false;
    }

    render(){
        if(this.state.isStartVisible){
            return(
                <Overlay isVisible={this.state.isStartVisible} onBackdropPress = {()=>this.setState({isStartVisible:false})}>
                    <View style={{flex:1}}>
                        <Text style={{flex:1,fontSize:20}}>아르바이트 시작일</Text>
                        <View style={{flex:4}}>
                            <Input placeholder="년" onChangeText={(text)=>{this.setState({startYear:text})}}></Input>
                            <Input placeholder="월" onChangeText={(text)=>{this.setState({startMonth:text})}}></Input>
                            <Input placeholder="일" onChangeText={(text)=>{this.setState({startDay:text})}}></Input>
                            <Input placeholder="시" onChangeText={(text)=>{this.setState({startHour:text})}}></Input>
                            <Input placeholder="분" onChangeText={(text)=>{this.setState({startMinute:text})}}></Input>
                        </View>
                        <View style={{flex:2}}>
                            <Button title="확인" buttonStyle={{marginBottom:"3%"}} onPress={()=>this._onStartDateSubmint()}></Button>
                            <Button title="취소" buttonStyle={{marginBottom:"3%"}} onPress={()=>this.setState({isStartVisible:false})}></Button>
                        </View>
                    </View>
                </Overlay>
            )
        }
        else if(this.state.isEndVisible){
            return(
                <Overlay isVisible={this.state.isEndVisible} onBackdropPress = {()=>this.setState({isEndVisible:false})}>
                    <View style={{flex:1}}>
                        <Text style={{flex:1,fontSize:20}}>아르바이트 종료일</Text>
                        <View style={{flex:4}}>
                            <Input placeholder="년" onChangeText={(text)=>{this.setState({endYear:text})}}></Input>
                            <Input placeholder="월" onChangeText={(text)=>{this.setState({endMonth:text})}}></Input>
                            <Input placeholder="일" onChangeText={(text)=>{this.setState({endDay:text})}}></Input>
                            <Input placeholder="시" onChangeText={(text)=>{this.setState({endHour:text})}}></Input>
                            <Input placeholder="분" onChangeText={(text)=>{this.setState({endMinute:text})}}></Input>
                        </View>
                        <View style={{flex:2}}>
                            <Button title="확인" buttonStyle={{marginBottom:"3%"}} onPress={()=>this._onEndDateSubmit()}></Button>
                            <Button title="취소" buttonStyle={{marginBottom:"3%"}} onPress={()=>this.setState({isEndVisible:false})}></Button>
                        </View>
                    </View>
                </Overlay>
            )
        }
        else{
            return(
                <View style={{flex:1,marginHorizontal:"5%"}}>
                    <KeyboardAvoidingView style={{marginLeft:"10%",flex:3,justifyContent:"center",marginRight:"10%"}} behavior="padding" keyboardVerticalOffset="100">
                        <View style={{flex:1,justifyContent:"center"}}>
                            <Text style={{fontSize:20,fontWeight:"bold",alignSelf:"center",paddingBottom:"5%"}}>구인 등록</Text>
                        </View>
                        <View style={{marginBottom:"3%", flex:1,justifyContent:"center"}}>
                            <TextInfoComponent icon = {"ios-contact"} text = {"아이디 : " + this.props.user.user.id}></TextInfoComponent>
                        </View>
                        <View style={{flex:2}}>
                            <Button title = "시작일짜" buttonStyle={{marginBottom:"3%"}} onPress={()=>{this.setState({isStartVisible:true})}}></Button>
                            <TextInfoComponent icon = {"ios-log-in"} text = {new Date(this.state.startDate).toUTCString()}></TextInfoComponent>
                            <Button title = "종료일짜" buttonStyle={{marginBottom:"3%"}} onPress={()=>{this.setState({isEndVisible:true})}}></Button>
                            <TextInfoComponent icon = {"ios-log-out"} text = {new Date(this.state.startDate).toUTCString()}></TextInfoComponent>
                        </View>
                        <View style={{flex:3,justifyContent:"center"}}>
                            <Input placeholder="아르바이트 시급" 
                                    inputContainerStyle={{marginBottom:"2%"}} 
                                    onChangeText={(text)=>{this.setState({pay:text})}}
                                    leftIcon={<Icon name="ios-cash" size={24} color="gray"></Icon>}
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
                    <Button buttonStyle={{marginBottom:"5%"}} onPress = {()=>this._onSubmit()} title="확인"></Button>
                    <Button buttonStyle={{marginBottom:"5%"}} onPress ={()=>this.props.navigation.navigate("Main")} title="취소"></Button>
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

export default connect(mapStateToProps,mapDispatchToProps)(JobOffer);