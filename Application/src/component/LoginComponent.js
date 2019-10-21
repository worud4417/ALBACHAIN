import React from 'react';
import {Text,View,StyleSheet,TouchableOpacity,Image,TextInput,KeyboardAvoidingView} from 'react-native';

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

    render(){
        return(
            <KeyboardAvoidingView>
                <Text>{this.props.target} 로그인</Text>
                <Text>ID</Text>
                    <TextInput style={styles.textinput} onChangeText={(text)=>this.setState({id:text})} ref={input => {this.idTextinput = input}}></TextInput>
                    <Text>PASSWORD</Text>
                    <TextInput style={styles.textinput} onChangeText={(text)=>this.setState({password:text})} ref={input => {this.pwTextInput = input}}></TextInput>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("Join")}>
                        <Text>회원가입</Text>
                    </TouchableOpacity>
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

export default LoginComponent;