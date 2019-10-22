import React,{Component} from 'react';
import {Text,View,StyleSheet,TouchableOpacity,Image,TextInput,KeyboardAvoidingView} from 'react-native';
import {connect}from 'react-redux';
import ActionCreator from '../action/Index';

import ButtonComponent from '../component/ButtonComponent';
import {fetchJoinEmployee,fetchJoinEmployer} from '../api/JoinApi';

class JoinScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            id:"",
            password:"",
            checkPassword:"",
            name:"",
            callnumber:"",
            registration:"",
            address:"",
            socialsecurity:""
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

    async _submitEmployer(){
        if(this._checkPassword(this.state.password,this.state.checkPassword)){
            let result = await fetchJoinEmployer(
                this.state.id,
                this.state.password,
                this.state.name,
                this.state.callnumber,
                this.state.registration,
                this.state.address
            );

            if(result.status == 1){
                alert("회원가입 완료");
                return this.props.navigation.navigate("Login");
            }
            else if(result.status == 2){
                alert("중복된 값이 있습니다!")
                return null;
            }
            else{
                alert("서버 오류!")
                return null;
            }
        }
        else{
            alert("비밀번호가 다릅니다.");
            return null;
        }
    }

    async _submitEmployee(){
        if(this._checkPassword(this.state.password,this.state.checkPassword)){
            let result = await fetchJoinEmployee(
                this.state.id,
                this.state.password,
                this.state.name,
                this.state.callnumber,
                this.state.socialsecurity
            );

            if(result.status == 1){
                alert("회원가입 완료");
                return this.props.navigation.navigate("Login");
            }
            else if(result.status == 2){
                alert("중복된 값이 있습니다!")
                return null;
            }
            else{
                alert("서버 오류!")
                return null;
            }
        }
        else{
            alert("비밀번호가 다릅니다.");
            return null;
        }
    }

    render(){
        if(this.props.status == 1){
            return(
                <View style={styles.view}>
                   <KeyboardAvoidingView style={{marginLeft:"10%",flex:3,justifyContent:"flex-end",marginRight:"10%"}} behavior="padding" enabled>
                    <Text style={{fontSize:20,fontWeight:"bold",alignSelf:"center",paddingBottom:"5%"}}>고용주 회원 가입</Text>
                    <Text>아이디</Text>
                    <TextInput style={styles.textinput} onChangeText={(text)=>this.setState({id:text})}></TextInput>
                    <Text>비밀번호</Text>
                    <TextInput secureTextEntry={true} style={styles.textinput} onChangeText={(text)=>this.setState({password:text})}></TextInput>
                    <Text>비밀번호 확인</Text>
                    <TextInput secureTextEntry={true} style={styles.textinput} onChangeText={(text)=>this.setState({checkPassword:text})}></TextInput>
                    <Text>이름</Text>
                    <TextInput style={styles.textinput} onChangeText={(text)=>this.setState({name:text})}></TextInput>
                    <Text>사업자 등록번호</Text>
                    <TextInput style={styles.textinput} onChangeText={(text)=>this.setState({registration:text})}></TextInput>
                    <Text>전화번호</Text>
                    <TextInput style={styles.textinput} onChangeText={(text)=>this.setState({callnumber:text})}></TextInput>
                    <Text>주소</Text>
                    <TextInput style={styles.textinput} onChangeText={(text)=>this.setState({address:text})}></TextInput>
                </KeyboardAvoidingView>
                <ButtonComponent fun = {()=>this._submitEmployer()} title="확인"></ButtonComponent>
                <ButtonComponent fun = {()=>this.props.navigation.navigate("Login")} title="취소"></ButtonComponent>
                </View>
            )
        }
        else{
            return(
                <View style={styles.view}>
                    <KeyboardAvoidingView style={{marginLeft:"10%",flex:3,justifyContent:"flex-end",marginRight:"10%"}} behavior="padding" enabled>
                    <Text style={{fontSize:20,fontWeight:"bold",alignSelf:"center",paddingBottom:"5%"}}>아르바이트생 회원 가입</Text>
                    <Text>아이디</Text>
                    <TextInput style={styles.textinput} onChangeText={(text)=>this.setState({id:text})}></TextInput>
                    <Text>비밀번호</Text>
                    <TextInput secureTextEntry={true} style={styles.textinput} onChangeText={(text)=>this.setState({password:text})}></TextInput>
                    <Text>비밀번호 확인</Text>
                    <TextInput secureTextEntry={true} style={styles.textinput} onChangeText={(text)=>this.setState({checkPassword:text})}></TextInput>
                    <Text>이름</Text>
                    <TextInput style={styles.textinput} onChangeText={(text)=>this.setState({name:text})}></TextInput>
                    <Text>전화번호</Text>
                    <TextInput style={styles.textinput} onChangeText={(text)=>this.setState({callnumber:text})}></TextInput>
                    <Text>주민등록번호</Text>
                    <TextInput style={styles.textinput} onChangeText={(text)=>this.setState({socialsecurity:text})}></TextInput>
                </KeyboardAvoidingView>
                <ButtonComponent fun = {()=>this._submitEmployee()} title="확인"></ButtonComponent>
                <ButtonComponent fun = {()=>this.props.navigation.navigate("Login")} title="취소"></ButtonComponent>
                </View>
            )
        }
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

export default connect(mapStateToProps,mapDispatchToProps)(JoinScreen);