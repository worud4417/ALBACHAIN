import React,{Component} from 'react';
import {Text,View,StyleSheet,TouchableOpacity,Image,TextInput,KeyboardAvoidingView} from 'react-native';
import {connect}from 'react-redux';
import ActionCreator from '../action/Index';

class EmployerResponseScreen extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View>
                <Text>EmployerResponseScreen</Text>
            </View>
        )
    }
}

export default EmployerResponseScreen;