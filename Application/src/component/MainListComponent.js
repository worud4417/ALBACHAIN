import React from 'react';
import {Text,View,StyleSheet,TouchableOpacity,Image,TextInput,KeyboardAvoidingView,FlatList} from 'react-native';
import {connect}from 'react-redux';
import ActionCreator from '../action/Index';

class MainListComponent extends React.Component{
    constructor(props){
        super(props)
    }

    _onPress(){
        if(this.props.status == 1){
            this.props.navigation.navigate("EmployerResponse");
        }
        else{
            this.props.navigation.navigate("EmployeeRequest");
        }
    }

    render(){
        return(
            <FlatList data = {this.props.jobOffer} renderItem={({item}) => (
                <TouchableOpacity onPress = {()=>this._onPress()}>
                    <Text>{item._id}</Text>
                    <Text>{item.registration}</Text>
                    <Text>{item.startdate}</Text>
                    <Text>{item.period}</Text>
                    <Text>{item.texr}</Text>
                </TouchableOpacity>
            )} keyExtractor = {item => String(item._id)}></FlatList>
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
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MainListComponent); 