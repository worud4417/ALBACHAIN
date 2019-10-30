import React,{Component} from 'react';
import {ActivityIndicator,Text,View,StyleSheet,TouchableOpacity,Image,TextInput,KeyboardAvoidingView} from 'react-native';
import {connect}from 'react-redux';
import ActionCreator from '../action/Index';
import {withNavigationFocus} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native-elements'

import MainListComponent from '../component/MainListComponent';
import {color} from '../utils/Color';

import {fetchJobOfferEmployer,fetchJobSearchEmployee} from '../api/JobOfferApi';

class MainScreen extends Component{
    constructor(props){
        super(props)
        this.state={
            isReady:false
        }
    }

    static navigationOptions = ({ navigation }) => {
        if(navigation.getParam('status') == 1){
            return{
                headerTitle:() =>{
                    return(
                        <Text style={{color:"white",marginLeft:"5%",fontSize:20}}>나의 구인 현황</Text>
                    )
                },
                // headerRight:() => {
                //     return(
                //         <TouchableOpacity style={{margin:10}} onPress={()=>{
                //             navigation.navigate("JobOffer");
                //         }}>
                //             <Icon name = "ios-add-circle" size={35}></Icon>
                //         </TouchableOpacity>
                //     )
                // },
                headerStyle:{
                    backgroundColor: color.blue
                }
            }
        }
        else{
            return{
                headerTitle:() =>{
                    return(
                        <Text style={{color:"white",marginLeft:"5%",fontSize:20}}> 구직 리스트</Text>
                    )
                },
                headerStyle:{
                    backgroundColor: color.blue
                }
            }
        }
      };

    async componentDidMount(){
        this.props.navigation.setParams({status:this.props.status});
        if(this.props.status == 1){
            let results = await fetchJobOfferEmployer(this.props.user[0].ID);
            results.jobOffer.forEach(result =>{
                this.props.JobOffer({
                    address : result.ADDRESS,
                    callnumber : result.CALLNUMBER,
                    id : result.ID,
                    name : result.NAME,
                    enddate : result.ENDDATE,
                    registration : result.REGISTRATION,
                    startdate : result.STARTDATE,
                    text : result.TEXT,
                    pay : result.PAY,
                    _id : result._id
                })
            })
        }
        else{
            await fetchJobSearchEmployee().then((results) =>{
                results.jobOffer.forEach(result =>{
                    this.props.JobOffer({
                        address : result.ADDRESS,
                        callnumber : result.CALLNUMBER,
                        id : result.ID,
                        name : result.NAME,
                        enddate : result.ENDDATE,
                        registration : result.REGISTRATION,
                        startdate : result.STARTDATE,
                        text : result.TEXT,
                        pay : result.PAY,
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
                await fetchJobOfferEmployer(this.props.user[0].ID).then((results) => {
                    results.jobOffer.forEach(result => {
                        this.props.JobOffer({
                            address : result.ADDRESS,
                            callnumber : result.CALLNUMBER,
                            id : result.ID,
                            name : result.NAME,
                            enddate : result.ENDDATE,
                            registration : result.REGISTRATION,
                            startdate : result.STARTDATE,
                            text : result.TEXT,
                            pay : result.PAY,
                            _id : result._id
                        })
                    })   
                })
            }
            else{
                await fetchJobSearchEmployee().then((results) =>{
                    results.jobOffer.forEach(result => {
                        this.props.JobOffer({
                            address : result.ADDRESS,
                            callnumber : result.CALLNUMBER,
                            id : result.ID,
                            name : result.NAME,
                            enddate : result.ENDDATE,
                            registration : result.REGISTRATION,
                            startdate : result.STARTDATE,
                            text : result.TEXT,
                            pay : result.PAY,
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
                    <View style={{flex:1}}>
                        <View style={{flex:7}}>
                            <MainListComponent navigation = {this.props.navigation}></MainListComponent>
                        </View>
                        <View style={{flex:1,justifyContent:"center"}}>
                            <Button containerStyle={{flex:1,marginBottom:"3%",marginHorizontal:"10%",height:"60%"}} onPress={()=>{this.props.navigation.navigate("JobOffer")}} title="구인등록"></Button>
                        </View>
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