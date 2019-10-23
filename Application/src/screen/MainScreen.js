import React,{Component} from 'react';
import {Text,View,StyleSheet,TouchableOpacity,Image,TextInput,KeyboardAvoidingView} from 'react-native';
import {connect}from 'react-redux';
import ActionCreator from '../action/Index';

import MainListComponent from '../component/MainListComponent';

import {fetchJobOfferEmployer,fetchJobSearchEmployee} from '../api/JobOfferApi';

class MainScreen extends Component{
    constructor(props){
        super(props)
    }

    async componentDidMount(){
        if(this.props.status == 1){
            await fetchJobOfferEmployer(this.props.user.id).then(async (result) => {
                if(result != null){
                    await result.forEach(a =>{
                        this.props.JobOffer({
                            address : a.ADDRESS,
                            callnumber : a.CALLNUMBER,
                            id : a.ID,
                            name : a.NAME,
                            period : a.PERIOD,
                            registration : a.REGISTRATION,
                            startdate : a.STARTDATE,
                            text : a.TEXT,
                            _id : a._id
                        })
                    })
                }
            })
        }
        else{
            await fetchJobSearchEmployee().then(async (result) =>{
                if(result != null){
                    await result.forEach(a =>{
                        this.props.JobOffer({
                            address : a.ADDRESS,
                            callnumber : a.CALLNUMBER,
                            id : a.ID,
                            name : a.NAME,
                            period : a.PERIOD,
                            registration : a.REGISTRATION,
                            startdate : a.STARTDATE,
                            text : a.TEXT,
                            _id : a._id
                        })
                    })
                }
            })
        }
    }

    render(){
        if(this.props.status == 1){
            return(
                <View>
                    <Text>EmployermainScreen</Text>
                    <MainListComponent></MainListComponent>
                </View>
            )
        }
        else{
            return(
                <View>
                    <Text>EmployeemainScreen</Text>
                    <MainListComponent></MainListComponent>
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
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MainScreen);