import React,{Component} from 'react';
import {ActivityIndicator,Text,View,StyleSheet,TouchableOpacity,Image,TextInput,ScrollView} from 'react-native';
import {connect}from 'react-redux';
import ActionCreator from '../action/Index';
import {withNavigationFocus} from 'react-navigation';
import { ListItem,Overlay,Button,ButtonGroup} from 'react-native-elements'

import {fetchMatchingEmployee,fetchMatchedEmployee,fetchMatchinglistEmployer} from '../api/MatchedJobApi';

class MatchJobScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            isVisible:false,
            joindate : "",
            period : "",
            registration : "",
            socialsecurity : "",
            startdate : "",
            status : "",
            text : "",
            _id : "",
            selectedIndex:0,
            isReady : false
        }
        this.updateIndex = this.updateIndex.bind(this);
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
        this.props.navigation.setParams({status:this.props.status});
        this.setState({isReady:false});
        this.props.InitMatchedJob();
        if(this.props.status == 1){
            let results = await fetchMatchinglistEmployer(this.props.user.id);
            if(results != null){
                results.forEach(result => {
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
        this.setState({isReady:true});
    }

    _onPress(item){
        this.setState({
            isVisible:true,
            joindate : item.joindate,
            period : item.period,
            registration : item.registration,
            socialsecurity : item.socialsecurity,
            startdate : item.startdate,
            status : item.status,
            text : item.text,
            _id : item._id
        });
    }

    async updateIndex(selectedIndex){
        if(this.state.selectedIndex != selectedIndex){
            this.setState({isReady:false});
            this.props.InitMatchedJob();
            if(selectedIndex == 0){
                console.log("a")
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
                            _id : result._id,
                        })
                    })
                }   
            }
            if(selectedIndex == 1){
                console.log("b")
                let results = await fetchMatchedEmployee(this.props.user.id);
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
                            _id : result._id,
                        })
                    })
                }
            }
            this.setState({isReady:true});
        }
        this.setState({selectedIndex});
    }

    render(){
        const { selectedIndex } = this.state;
        if(!this.state.isReady){
            return(
                <View>
                    <ActivityIndicator size="large" color="#0000ff"></ActivityIndicator>
                </View>
            )
        }
        else{
            if(this.props.status == 1){
                if(!this.state.isVisible){
                    return(
                        <View style={{flex:1}}>
                            <ScrollView>
                                {
                                    this.props.matchedJob.map((item,i) => (
                                        <ListItem key = {i} title = {item.registration} 
                                        subtitle = {item.startdate} bottomDivider chevron onPress = {()=>this._onPress(item)}>
                                        </ListItem>
                                    ))
                                }
                            </ScrollView>
                        </View>
                    )
                }
                else{
                    return(
                        <Overlay isVisible={this.state.isVisible} onBackdropPress = {()=>this.setState({isVisible:false})}>
                            <View style={{flex:1}}>
                                <View style={{flex:1}}>
                                    <Text>번호 : {this.state._id}</Text>
                                    <Text>신청 날짜 : {this.state.joindate}</Text>
                                    <Text>사업자 등록번호 : {this.state.registration}</Text>
                                    <Text>시작일짜 : {this.state.startdate}</Text>
                                    <Text>기간 : {this.state.period}</Text>
                                    <Text>아르바이트 설명 : {this.state.text}</Text>
                                </View>
                                <View style={{flex:1, justifyContent:'flex-end'}}>
                                    <Button title="확인" type="outline" onPress={()=>this.setState({isVisible:false})}></Button>
                                </View>
                            </View>
                        </Overlay>
                    )
                }
            }
            else{
                if(!this.state.isVisible){
                    return(
                        <View style={{flex:1}}>
                            <ScrollView style={{flex:10}}>
                                {
                                    this.props.matchedJob.map((item,i) => (
                                        <ListItem key = {i} title = {item.registration} 
                                        subtitle = {item.startdate} bottomDivider chevron onPress = {()=>this._onPress(item)}>
                                        </ListItem>
                                    ))
                                }
                            </ScrollView>
                            <ButtonGroup buttonStyle={{flex:2}} onPress={this.updateIndex} selectedIndex={selectedIndex} buttons={["승인 대기","승인 확인"]} containerStyle={{height:30}}></ButtonGroup>
                        </View>
                    )
                }
                else{
                    return(
                        <Overlay isVisible={this.state.isVisible} onBackdropPress = {()=>this.setState({isVisible:false})}>
                            <View style={{flex:1}}>
                                <View style={{flex:1}}>
                                    <Text>번호 : {this.state._id}</Text>
                                    <Text>신청 날짜 : {this.state.joindate}</Text>
                                    <Text>사업자 등록번호 : {this.state.registration}</Text>
                                    <Text>시작일짜 : {this.state.startdate}</Text>
                                    <Text>기간 : {this.state.period}</Text>
                                    <Text>아르바이트 설명 : {this.state.text}</Text>
                                </View>
                                <View style={{flex:1, justifyContent:'flex-end'}}>
                                    <Button title="확인" type="outline" onPress={()=>this.setState({isVisible:false})}></Button>
                                </View>
                            </View>
                        </Overlay>
                    )
                }
            }
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

export default connect(mapStateToProps,mapDispatchToProps)(withNavigationFocus(MatchJobScreen)); 