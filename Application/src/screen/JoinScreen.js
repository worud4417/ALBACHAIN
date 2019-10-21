import React,{Component} from 'react';
import {Text,View,StyleSheet,TouchableOpacity,Image,TextInput,KeyboardAvoidingView} from 'react-native';
import {connect}from 'react-redux';
import ActionCreator from '../action/Index';

class JoinScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            id:"",
            password:"",
            checkPassword:"",
            name:"",
            callnumber:""
        }
    }

    render(){
        if(this.props.status == 1){
            return(
                <View style={styles.view}>
                   <KeyboardAvoidingView style={{marginLeft:"10%",flex:3,justifyContent:"flex-end",marginRight:"10%"}} behavior="padding" enabled>
                    <Text style={{fontSize:20,fontWeight:"bold",alignSelf:"center",paddingBottom:"5%"}}>고용주 회원 가입</Text>
                    <Text>ID</Text>
                    <TextInput style={styles.textinput} onChangeText={(text)=>this.setState({id:text})}></TextInput>
                    <Text>PASSWORD</Text>
                    <TextInput style={styles.textinput} onChangeText={(text)=>this.setState({password:text})}></TextInput>
                    <Text>CHECK PASSWORD</Text>
                    <TextInput style={styles.textinput} onChangeText={(text)=>this.setState({checkPassword:text})}></TextInput>
                    <Text>NAME</Text>
                    <TextInput style={styles.textinput} onChangeText={(text)=>this.setState({name:text})}></TextInput>
                </KeyboardAvoidingView>
                </View>
            )
        }
        else{
            return(
                <View style={styles.view}>
                    <KeyboardAvoidingView style={{marginLeft:"10%",flex:3,justifyContent:"flex-end",marginRight:"10%"}} behavior="padding" enabled>
                    <Text style={{fontSize:20,fontWeight:"bold",alignSelf:"center",paddingBottom:"5%"}}>아르바이트생 회원 가입</Text>
                    <Text>ID</Text>
                    <TextInput style={styles.textinput} onChangeText={(text)=>this.setState({id:text})}></TextInput>
                    <Text>PASSWORD</Text>
                    <TextInput style={styles.textinput} onChangeText={(text)=>this.setState({password:text})}></TextInput>
                    <Text>CHECK PASSWORD</Text>
                    <TextInput style={styles.textinput} onChangeText={(text)=>this.setState({checkPassword:text})}></TextInput>
                    <Text>NAME</Text>
                    <TextInput style={styles.textinput} onChangeText={(text)=>this.setState({name:text})}></TextInput>
                </KeyboardAvoidingView>
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