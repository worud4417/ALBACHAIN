import React,{Component} from 'react';
import {ActivityIndicator,Text,View,StyleSheet,TouchableOpacity,Image,TextInput,KeyboardAvoidingView,Button} from 'react-native';
import {connect}from 'react-redux';
import ActionCreator from '../action/Index';
import {withNavigationFocus} from 'react-navigation';

import MainListComponent from '../component/MainListComponent';

import {fetchJobOfferEmployer,fetchJobSearchEmployee} from '../api/JobOfferApi';

class MainScreen extends Component{
    constructor(props){
        super(props)
        this.state={
            isReady:false
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
          headerTitle: () => {
              if(navigation.getParam('status') == 1){
                return(
                    <Text>나의 구인 현황</Text>
                )
              }
              else{
                return(
                    <Text>구직 리스트</Text>
                )
              }
          },
          headerRight: () => (
            <TouchableOpacity onPress={()=>{
                if(navigation.getParam('status') == 1){
                    navigation.navigate("JobOffer");
                }
                else{
                    alert(new Date())
                }
            }}>
                <Text>Button</Text>
            </TouchableOpacity>
          ),
        };
      };

    async componentDidMount(){
        this.props.navigation.setParams({status:this.props.status});
        if(this.props.status == 1){
            await fetchJobOfferEmployer(this.props.user.id).then((results) => {
                results.forEach(result => {
                    this.props.JobOffer({
                        address : result.ADDRESS,
                        callnumber : result.CALLNUMBER,
                        id : result.ID,
                        name : result.NAME,
                        period : result.PERIOD,
                        registration : result.REGISTRATION,
                        startdate : result.STARTDATE,
                        text : result.TEXT,
                        _id : result._id
                    })
                })   
            })
        }
        else{
            await fetchJobSearchEmployee().then((results) =>{
                results.forEach(result =>{
                    this.props.JobOffer({
                        address : result.ADDRESS,
                        callnumber : result.CALLNUMBER,
                        id : result.ID,
                        name : result.NAME,
                        period : result.PERIOD,
                        registration : result.REGISTRATION,
                        startdate : result.STARTDATE,
                        text : result.TEXT,
                        _id : result._id
                    })
                })
            })
        }
        this.setState({isReady:true})
    }

    async componentDidUpdate(prevProps) {
        if(!prevProps.isFocused){
            this.setState({isReady:false});
            this.props.InitJobOffer();
            if(this.props.status == 1){
                await fetchJobOfferEmployer(this.props.user.id).then((results) => {
                    results.forEach(result => {
                        this.props.JobOffer({
                            address : result.ADDRESS,
                            callnumber : result.CALLNUMBER,
                            id : result.ID,
                            name : result.NAME,
                            period : result.PERIOD,
                            registration : result.REGISTRATION,
                            startdate : result.STARTDATE,
                            text : result.TEXT,
                            _id : result._id
                        })
                    })   
                })
            }
            else{
                await fetchJobSearchEmployee().then((results) =>{
                    results.forEach(result => {
                        this.props.JobOffer({
                            address : result.ADDRESS,
                            callnumber : result.CALLNUMBER,
                            id : result.ID,
                            name : result.NAME,
                            period : result.PERIOD,
                            registration : result.REGISTRATION,
                            startdate : result.STARTDATE,
                            text : result.TEXT,
                            _id : result._id
                        })
                    })   
                })
            }
            this.setState({isReady:true});
        }
    }

    render(){
        if(!this.state.isReady){
            return(
                <View>
                    <ActivityIndicator size="large" color="#0000ff"></ActivityIndicator>
                </View>
            )
        }
        else{
            if(this.props.status == 1){
                return(
                    <View>
                        <MainListComponent navigation = {this.props.navigation}></MainListComponent>
                    </View>
                )
            }
            else{
                return(
                    <View>
                        <MainListComponent navigation = {this.props.navigation}></MainListComponent>
                    </View>
                )
            }
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
        InitJobOffer : () => {
            dispatch(ActionCreator.InitJobOffer());
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withNavigationFocus(MainScreen));