import React,{Component} from 'react';
import {ActivityIndicator,Text,View,StyleSheet,TouchableOpacity,Image,TextInput,ScrollView,Button} from 'react-native';
import {connect}from 'react-redux';
import ActionCreator from '../action/Index';
import {withNavigationFocus} from 'react-navigation';
import { ListItem } from 'react-native-elements'

import {fetchMatchingEmployee} from '../api/MatchedJobApi';

class MatchJobScreen extends Component{
    constructor(props){
        super(props)
    }

    static navigationOptions = ({ navigation }) => {
        return {
          headerTitle: () => {
              if(navigation.getParam('status') == 1){
                return(
                    <Text>구직 요청 리스트</Text>
                )
              }
              else{
                return(
                    <Text>구직 요청 현황 리스트</Text>
                )
              }
          },
        };
      }; 

    async componentDidMount(){
        if(this.props.status == 1){

        }
        else{
            let results = await fetchMatchingEmployee(this.props.user.id);
            if(results.status == 1){
                results.obj.forEach(result => {
                    this.props.MatchedJob({
                        joindate : result.JOINDATE,
                        period : result.PERIOD,
                        registration : result.REGISTRATION,
                        socialsecurity : result.SOCIALSECURITY,
                        startdate : result.STARTDATE,
                        status : result.STATUS,
                        text : result.TEXT,
                        _id : result._id
                    })
                })
            }
        }
    }

    render(){
        if(this.props.status == 1){
            return(
                <ScrollView>
                    <Text>Matchjob</Text>
                </ScrollView>
            )
        }
        else{
            return(
                <ScrollView>
                    {
                        this.props.matchedJob.map((item,i) => (
                            <ListItem key = {i} title = {item.registration} 
                            subtitle = {item.startdate} bottomDivider chevron onPress = {()=>console.log("A")}>
                            </ListItem>
                        ))
                    }
                </ScrollView>
            )
        }
    }
}

function mapStateToProps(state){
    return{
        status:state.status,
        user:state.user,
        jobOffer:state.jobOffer,
        matchedJob:state.matchedJob
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
        MatchedJob : (matchedJob) => {
            dispatch(ActionCreator.MatchedJob(matchedJob));
        },
        InitMatchedJob : () => {
            dispatch(ActionCreator.InitMatchedJob());
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MatchJobScreen); 