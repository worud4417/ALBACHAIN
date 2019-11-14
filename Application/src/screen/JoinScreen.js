import React,{Component} from 'react';
import {Text,View,StyleSheet,KeyboardAvoidingView,Image} from 'react-native';
import {connect}from 'react-redux';
import ActionCreator from '../action/Index';
import {Button,Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import * as permission from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

import {} from '../api/IpAddress';
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
            socialsecurity:"",
            imageSource : "../",
            image : ""
        }
    }

    componentDidMount(){
        const grant = permission.getAsync(permission.CAMERA_ROLL);
        if(grant != "granted"){
            permission.askAsync(permission.CAMERA_ROLL);
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
                this.state.address,
                this.state.image
            )

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

            if(this.state.image == null){
                
            }

            let result = await fetchJoinEmployee(
                this.state.id,
                this.state.password,
                this.state.name,
                this.state.callnumber,
                this.state.socialsecurity,
                this.state.image
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

    async _getPhoto(){
        const image = await ImagePicker.launchImageLibraryAsync({quality:0.3});
        this.setState({image:image,imageSource:image.uri});
    }

    render(){
        if(this.props.status == 1){
            return(
                <View style={{flex:1}}>
                    <KeyboardAvoidingView style={{marginLeft:"10%",flex:3,justifyContent:"center",marginRight:"10%"}} behavior="padding" enabled>
                        <Text style={{fontSize:20,fontWeight:"bold",alignSelf:"center",paddingBottom:"5%"}}>고용주 회원 가입</Text>
                        <Image source={{uri:this.state.imageSource}} style={{alignSelf:"center",width:100,height:100,borderRadius:50,overflow:"hidden",resizeMode:"cover",backgroundColor:"gray"}}></Image>
                        <Input placeholder="ID" 
                            inputContainerStyle={styles.textinput} 
                            onChangeText={(text)=>this.setState({id:text})} 
                            leftIcon={<Icon name="ios-contact" size={24} color="gray"></Icon>}
                            leftIconContainerStyle={{marginRight:"2%"}}>
                        </Input>
                        <Input placeholder="비밀번호" 
                            secureTextEntry={true} 
                            inputContainerStyle={styles.textinput} 
                            onChangeText={(text)=>this.setState({password:text})} 
                            leftIcon={<Icon name="ios-lock" size={24} color="gray"></Icon>} 
                            leftIconContainerStyle={{marginRight:"2%"}}>
                        </Input>
                        <Input placeholder="비밀번호 확인" 
                            secureTextEntry={true} 
                            inputContainerStyle={styles.textinput} 
                            onChangeText={(text)=>this.setState({checkPassword:text})} 
                            leftIcon={<Icon name="ios-lock" size={24} color="gray"></Icon>}
                            leftIconContainerStyle={{marginRight:"2%"}}>
                        </Input>
                        <Input placeholder="사업장 이름" 
                            inputContainerStyle={styles.textinput} 
                            onChangeText={(text)=>this.setState({name:text})} 
                            leftIcon={<Icon name="ios-construct" size={24} color="gray"></Icon>}
                            leftIconContainerStyle={{marginRight:"2%"}}>
                        </Input>
                        <Input placeholder="사업자등록번호" 
                            inputContainerStyle={styles.textinput} 
                            onChangeText={(text)=>this.setState({registration:text})} 
                            leftIcon={<Icon name="ios-briefcase" size={24} color="gray"></Icon>} 
                            leftIconContainerStyle={{marginRight:"2%"}}>
                        </Input>
                        <Input placeholder="전화번호" 
                            inputContainerStyle={styles.textinput} 
                            onChangeText={(text)=>this.setState({callnumber:text})} 
                            leftIcon={<Icon name="ios-call" size={24} color="gray"></Icon>}
                            leftIconContainerStyle={{marginRight:"2%"}}>
                        </Input>
                        <Input placeholder="주소" 
                            inputContainerStyle={styles.textinput} 
                            onChangeText={(text)=>this.setState({address:text})} 
                            leftIcon={<Icon name="ios-home" size={24} color="gray"></Icon>}
                            leftIconContainerStyle={{marginRight:"2%"}}>
                        </Input>
                    </KeyboardAvoidingView>
                    <View style={{flex:1,marginLeft:"10%",marginRight:"10%",justifyContent:"flex-start"}}>
                        <Button buttonStyle={{marginBottom:"5%"}} onPress = {()=>this._getPhoto()} title="프로필사진"></Button>
                        <Button buttonStyle={{marginBottom:"5%"}} onPress = {()=>this._submitEmployer()} title="확인"></Button>
                        <Button buttonStyle={{marginBottom:"2%"}} onPress = {()=>this.props.navigation.navigate("Login")} title="취소"></Button>
                    </View>
                </View>
            )
        }
        else{
            return(
                <View style={{flex:1}}>
                    <KeyboardAvoidingView style={{marginLeft:"10%",flex:3,justifyContent:"center",marginRight:"10%"}} behavior="padding" enabled>
                        <Text style={{fontSize:20,fontWeight:"bold",alignSelf:"center",paddingBottom:"5%"}}>아르바이트생 회원 가입</Text>
                        <Image source={{uri:this.state.imageSource}} style={{alignSelf:"center",width:100,height:100,borderRadius:50,overflow:"hidden",resizeMode:"cover",backgroundColor:"gray"}}></Image>
                        <Input placeholder="ID" 
                            inputContainerStyle={styles.textinput} 
                            onChangeText={(text)=>this.setState({id:text})} 
                            leftIcon={<Icon name="ios-contact" size={24} color="gray"></Icon>}
                            leftIconContainerStyle={{marginRight:"2%"}}>
                        </Input>
                        <Input placeholder="비밀번호" 
                            secureTextEntry={true} 
                            inputContainerStyle={styles.textinput} 
                            onChangeText={(text)=>this.setState({password:text})} 
                            leftIcon={<Icon name="ios-lock" size={24} color="gray"></Icon>} 
                            leftIconContainerStyle={{marginRight:"2%"}}>
                        </Input>
                        <Input placeholder="비밀번호 확인" 
                            secureTextEntry={true} 
                            inputContainerStyle={styles.textinput} 
                            onChangeText={(text)=>this.setState({checkPassword:text})} 
                            leftIcon={<Icon name="ios-lock" size={24} color="gray"></Icon>}
                            leftIconContainerStyle={{marginRight:"2%"}}>
                        </Input>
                        <Input placeholder="이름" 
                            inputContainerStyle={styles.textinput} 
                            onChangeText={(text)=>this.setState({name:text})} 
                            leftIcon={<Icon name="ios-person" size={24} color="gray"></Icon>}
                            leftIconContainerStyle={{marginRight:"2%"}}>
                        </Input>
                        <Input placeholder="주민등록번호" 
                            inputContainerStyle={styles.textinput} 
                            onChangeText={(text)=>this.setState({socialsecurity:text})} 
                            leftIcon={<Icon name="ios-today" size={24} color="gray"></Icon>} 
                            leftIconContainerStyle={{marginRight:"2%"}}>
                        </Input>
                        <Input placeholder="전화번호" 
                            inputContainerStyle={styles.textinput} 
                            onChangeText={(text)=>this.setState({callnumber:text})} 
                            leftIcon={<Icon name="ios-call" size={24} color="gray"></Icon>}
                            leftIconContainerStyle={{marginRight:"2%"}}>
                        </Input>
                    </KeyboardAvoidingView>
                    <View style={{flex:1,marginLeft:"10%",marginRight:"10%",justifyContent:"flex-start"}}>
                        <Button buttonStyle={{marginBottom:"5%"}} onPress = {()=>this._getPhoto()} title="프로필사진"></Button>
                        <Button buttonStyle={{marginBottom:"5%"}} onPress = {()=>this._submitEmployee()} title="확인"></Button>
                        <Button buttonStyle={{marginBottom:"2%"}} onPress = {()=>this.props.navigation.navigate("Login")} title="취소"></Button>
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    textinput:{
        marginBottom:"2%"
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