import React,{Component} from 'react';
import {View} from 'react-native';
import {connect}from 'react-redux';
import ActionCreator from '../action/Index';

class LogoutComponent extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.InitJobOffer();
        this.props.Logout()
        this.props.navigation.navigate('Login')
    }

    render(){
        return(
            <View></View>
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

export default connect(mapStateToProps,mapDispatchToProps)(LogoutComponent);