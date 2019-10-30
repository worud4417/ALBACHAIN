import React,{Component} from 'react';
import {Text,View,StyleSheet,TouchableOpacity,Image,KeyboardAvoidingView, Alert} from 'react-native';
import {connect}from 'react-redux';
import ActionCreator from '../action/Index';
import {Button,Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons'

import {color} from '../utils/Color';
import { fetchUpdateEmployer, fetchUpdateEmployee } from '../api/JoinApi';

class UpdateScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            id : "",
            password : "",
            checkPassword : "",
            callnumber : "",
            name : "",
            address : ""
        }
    }

    static navigationOptions = ({ navigation }) => {
        return{
            headerTitle:() =>{
                return(
                    <Text style={{color:"white",marginLeft:"5%",fontSize:20}}>회원정보수정</Text>
                )
            },
            headerStyle:{
                backgroundColor: color.blue
            }
        }
    };

    componentDidMount(){
        if(this.props.status == 1){
            this.setState({
                id : this.props.user[0].ID,
                callnumber : this.props.user[0].CALLNUMBER,
                name : this.props.user[0].NAME,
                address : this.props.user[0].ADDRESS
            })
        }
        else{
            this.setState({
                id : this.props.user[0].ID,
                callnumber : this.props.user[0].CALLNUMBER,
                name : this.props.user[0].NAME
            })
        }
    }

    _checkPassword(pw,rpw){
        if(pw == rpw){
            return true;
        }
        else{
            return false;
        }
    }

    async _onSubmit(){
        if(this._checkPassword(this.state.password,this.state.checkPassword)){
            if(this.props.status == 1){
                let result = await fetchUpdateEmployer(this.state.id,this.state.password,this.state.callnumber,this.state.name,this.state.address);
                if(result.status == 1){
                    alert("회원정보 수정 완료");
                    this.props.Logout();
                    console.log("AAA")
                    // return this.props.navigation.navigate("My");
                }
                return null;
            }
            else{
                let result = await fetchUpdateEmployee(this.state.id,this.state.password,this.state.callnumber,this.state.name);
                if(result.status == 1){
                    alert("회원정보 수정 완료");
                    return this.props.navigation.navigate("My");
                }
                return null;
            }
        }
        else{
            alert("비밀번호가 다릅니다.");
        }
    }

    render(){
        if(this.props.status == 1){
            return(
                <View style={{marginHorizontal:"5%",flex:1}}>
                    <View style={{marginTop:"5%",flex:3}}>
                        <View style={{marginBottom:"3%"}}>
                            <Text>이름</Text>
                            <Input placeholder="이름" defaultValue = {this.props.user[0].NAME}
                                    onChangeText={(text)=>this.setState({name:text})} 
                                    leftIcon={<Icon name="ios-contact" size={24} color="gray"></Icon>}
                                    leftIconContainerStyle={{marginRight:"2%"}}>
                            </Input>
                        </View>
                        <View style={{marginBottom:"3%"}}>
                            <Text>비밀번호</Text>
                            <Input placeholder="비밀번호"
                                    onChangeText={(text)=>this.setState({password:text})} 
                                    leftIcon={<Icon name="ios-contact" size={24} color="gray"></Icon>}
                                    leftIconContainerStyle={{marginRight:"2%"}}>
                            </Input>
                        </View>
                        <View style={{marginBottom:"3%"}}>
                            <Text>비밀번호 확인</Text>
                            <Input placeholder="비밀번호 확인"
                                    onChangeText={(text)=>this.setState({checkPassword:text})} 
                                    leftIcon={<Icon name="ios-contact" size={24} color="gray"></Icon>}
                                    leftIconContainerStyle={{marginRight:"2%"}}>
                            </Input>
                        </View>
                        <View style={{marginBottom:"3%"}}>
                            <Text>전화번호</Text>
                            <Input placeholder="전화번호" defaultValue = {this.props.user[0].CALLNUMBER}
                                    onChangeText={(text)=>this.setState({callnumber:text})} 

                                    leftIcon={<Icon name="ios-contact" size={24} color="gray"></Icon>}
                                    leftIconContainerStyle={{marginRight:"2%"}}>
                            </Input>
                        </View>
                        <View style={{marginBottom:"3%"}}>
                            <Text>주소</Text>
                            <Input placeholder="주소" defaultValue = {this.props.user[0].ADDRESS}
                                    onChangeText={(text)=>this.setState({address:text})} 
                                    leftIcon={<Icon name="ios-contact" size={24} color="gray"></Icon>}
                                    leftIconContainerStyle={{marginRight:"2%"}}>
                            </Input>
                        </View>
                    </View>
                    <View style={{justifyContent:"center",flex:1}}>
                        <Button buttonStyle={{marginBottom:"3%"}} title="확인" onPress={()=>this._onSubmit()}></Button>
                        <Button buttonStyle={{marginBottom:"3%"}} title="취소" onPress={()=>this.props.navigation.navigate("My")}></Button>
                    </View>
                </View>
            )
        }
        else{
            return(
                <View style={{marginHorizontal:"5%",flex:1}}>
                    <View style={{marginTop:"5%",flex:3}}>
                        <View style={{marginBottom:"3%"}}>
                            <Text>이름</Text>
                            <Input placeholder="이름" defaultValue = {this.props.user[0].NAME}
                                    onChangeText={(text)=>this.setState({name:text})} 
                                    leftIcon={<Icon name="ios-contact" size={24} color="gray"></Icon>}
                                    leftIconContainerStyle={{marginRight:"2%"}}>
                            </Input>
                        </View>
                        <View style={{marginBottom:"3%"}}>
                            <Text>비밀번호</Text>
                            <Input placeholder="비밀번호"
                                    onChangeText={(text)=>this.setState({password:text})} 
                                    leftIcon={<Icon name="ios-contact" size={24} color="gray"></Icon>}
                                    leftIconContainerStyle={{marginRight:"2%"}}>
                            </Input>
                        </View>
                        <View style={{marginBottom:"3%"}}>
                            <Text>비밀번호 확인</Text>
                            <Input placeholder="비밀번호 확인"
                                    onChangeText={(text)=>this.setState({checkPassword:text})} 
                                    leftIcon={<Icon name="ios-contact" size={24} color="gray"></Icon>}
                                    leftIconContainerStyle={{marginRight:"2%"}}>
                            </Input>
                        </View>
                        <View style={{marginBottom:"3%"}}>
                            <Text>전화번호</Text>
                            <Input placeholder="전화번호" defaultValue = {this.props.user[0].CALLNUMBER}
                                    onChangeText={(text)=>this.setState({callnumber:text})} 

                                    leftIcon={<Icon name="ios-contact" size={24} color="gray"></Icon>}
                                    leftIconContainerStyle={{marginRight:"2%"}}>
                            </Input>
                        </View>
                    </View>
                    <View style={{justifyContent:"center",flex:1}}>
                        <Button buttonStyle={{marginBottom:"3%"}} title="확인" onPress={()=>this._onSubmit()}></Button>
                        <Button buttonStyle={{marginBottom:"3%"}} title="취소" onPress={()=>this.props.navigation.navigate("My")}></Button>
                    </View>
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
        Logout : () =>{
            dispatch(ActionCreator.Logout());
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UpdateScreen);