import React,{Component} from 'react';
import {Text,View,StyleSheet,TouchableOpacity,Image,TextInput,KeyboardAvoidingView} from 'react-native';
import {connect}from 'react-redux';
import ActionCreator from '../action/Index';

import {fetchJobOfferEmployer,fetchJobSearchEmployee} from '../api/JobOfferApi';

class MainScreen extends Component{
    constructor(props){
        super(props)
        console.log(this.props.user)
    }

    async componentDidMount(){
        if(this.props.status == 1){
            console.log("A")
            //redux에 구인구직 목록 저장할 차례
        }
        else{
            console.log("B")
        }
    }

    render(){
        if(this.props.status == 1){
            return(
                <View>
                    <Text>EmployermainScreen</Text>
                </View>
            )
        }
        else{
            return(
                <View>
                    <Text>EmployeemainScreen</Text>
                </View>
            )
        }
    }
}

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

export default connect(mapStateToProps,mapDispatchToProps)(MainScreen);