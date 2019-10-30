import React,{Component} from 'react';
import {ActivityIndicator,Text,View,StyleSheet,TouchableOpacity,Image,TextInput,ScrollView,Modal} from 'react-native';
import {connect}from 'react-redux';
import ActionCreator from '../action/Index';
import {withNavigationFocus} from 'react-navigation';
import { ListItem,Overlay,Button,ButtonGroup} from 'react-native-elements'

import {fetchMatchingEmployee,fetchMatchedEmployee,fetchMatchinglistEmployer,fetchMatchRequestApprove,fetchMatchRequestReject} from '../api/MatchedJobApi';
import {color} from '../utils/Color';

class MatchJobScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            isVisible:false,
            joindate : "",
            enddate : "",
            registration : "",
            socialsecurity : "",
            startdate : "",
            status : "",
            text : "",
            pay : "",
            employeeName : "",
            employerName : "",
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
                    <Text style={{color:"white",marginLeft:"5%",fontSize:20}}>구직 요청 리스트</Text>
                )
              }
              else{
                return(
                    <Text style={{color:"white",marginLeft:"5%",fontSize:20}}>구직 요청 현황 리스트</Text>
                )
              }
          },
          headerStyle:{
            backgroundColor: color.blue
        }
        };
      }; 

    async componentDidMount(){
        this.props.navigation.setParams({status:this.props.status});
        this.setState({isReady:false});
        this.props.InitMatchedJob();
        if(this.props.status == 1){
            let results = await fetchMatchinglistEmployer(this.props.user[0].ID);
            if(results != null){
                results.matchedJob.forEach(result => {
                    this.props.MatchedJob({
                        joindate : result.JOINDATE,
                        enddate : result.ENDDATE,
                        registration : result.REGISTRATION,
                        socialsecurity : result.SOCIALSECURITY,
                        startdate : result.STARTDATE,
                        status : result.STATUS,
                        text : result.TEXT,
                        pay : result.PAY,
                        _id : result._id,
                        employerName: result.EMPLOYERNAME,
                        employeeName : result.EMPLOYEENAME
                    })
                })
            }
        }
        else{
            let results = await fetchMatchingEmployee(this.props.user[0].ID);
            if(results.status == 1){
                results.matchedJob.forEach(result => {
                    this.props.MatchedJob({
                        joindate : result.JOINDATE,
                        enddate : result.ENDDATE,
                        registration : result.REGISTRATION,
                        socialsecurity : result.SOCIALSECURITY,
                        startdate : result.STARTDATE,
                        status : result.STATUS,
                        text : result.TEXT,
                        _id : result._id,
                        pay : result.PAY,
                        employerName: result.EMPLOYERNAME,
                        employeeName : result.EMPLOYEENAME
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
            enddate : item.enddate,
            registration : item.registration,
            socialsecurity : item.socialsecurity,
            startdate : item.startdate,
            status : item.status,
            text : item.text,
            pay : item.pay,
            _id : item._id,
            employerName: item.employerName,
            employeeName : item.employeeName
        });
    }

    async updateIndex(selectedIndex){
        if(this.state.selectedIndex != selectedIndex){
            this.setState({isReady:false});
            this.props.InitMatchedJob();
            if(selectedIndex == 0){
                let results = await fetchMatchingEmployee(this.props.user[0].ID);
                if(results.status == 1){
                    results.matchedJob.forEach(result => {
                        this.props.MatchedJob({
                            joindate : result.JOINDATE,
                            enddate : result.ENDDATE,
                            registration : result.REGISTRATION,
                            socialsecurity : result.SOCIALSECURITY,
                            startdate : result.STARTDATE,
                            status : result.STATUS,
                            text : result.TEXT,
                            pay : result.PAY,
                            _id : result._id,
                            employerName: result.EMPLOYERNAME,
                            employeeName : result.EMPLOYEENAME
                        })
                    })
                }   
            }
            if(selectedIndex == 1){
                let results = await fetchMatchedEmployee(this.props.user[0].ID);
                if(results.status == 1){
                    results.matchedJob.forEach(result => {
                        this.props.MatchedJob({
                            joindate : result.JOINDATE,
                            enddate : result.ENDDATE,
                            registration : result.REGISTRATION,
                            socialsecurity : result.SOCIALSECURITY,
                            startdate : result.STARTDATE,
                            status : result.STATUS,
                            text : result.TEXT,
                            pay : result.PAY,
                            _id : result._id,
                            employerName: result.EMPLOYERNAME,
                            employeeName : result.EMPLOYEENAME
                        })
                    })
                }
            }
            this.setState({isReady:true});
        }
        this.setState({selectedIndex});
    }

    async _approveSubmit(){
        const result = await fetchMatchRequestApprove(this.state._id);
        if(result.status == 1){
            alert("승인 성공");
            this.setState({isReady:false});
            this.setState({isVisible:false});
            this.props.InitMatchedJob();
            let results = await fetchMatchinglistEmployer(this.props.user[0].ID);
            if(results != null){
                results.matchedJob.forEach(obj => {
                    this.props.MatchedJob({
                        joindate : obj.JOINDATE,
                        enddate : obj.ENDDATE,
                        registration : obj.REGISTRATION,
                        socialsecurity : obj.SOCIALSECURITY,
                        startdate : obj.STARTDATE,
                        status : obj.STATUS,
                        text : obj.TEXT,
                        pay : obj.PAY,
                        _id : obj._id,
                        employerName: obj.EMPLOYERNAME,
                        employeeName : obj.EMPLOYEENAME
                    })
                })
            }
            this.setState({isReady:true});
        }
    }

    async _rejectSubmit(){
        const result = await fetchMatchRequestReject(this.state._id);
        if(result.status == 1){
            alert("승인 거부");
            this.setState({isReady:false});
            this.setState({isVisible:false});
            this.props.InitMatchedJob();
            let results = await fetchMatchinglistEmployer(this.props.user[0].ID);
            if(results != null){
                results.matchedJob.forEach(obj => {
                    this.props.MatchedJob({
                        joindate : obj.JOINDATE,
                        enddate : obj.ENDDATE,
                        registration : obj.REGISTRATION,
                        socialsecurity : obj.SOCIALSECURITY,
                        startdate : obj.STARTDATE,
                        status : obj.STATUS,
                        text : obj.TEXT,
                        pay : obj.PAY,
                        _id : obj._id,
                        employerName: obj.EMPLOYERNAME,
                        employeeName : obj.EMPLOYEENAME
                    })
                })
            }
            this.setState({isReady:true});
        }
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
                                    <Text>사업자 이름 : {this.state.employerName}</Text>
                                    <Text>시작일짜 : {this.state.startdate}</Text>
                                    <Text>종료일짜 : {this.state.enddate}</Text>
                                    <Text>시급 : {this.state.pay}</Text>
                                    <Text>아르바이트 설명 : {this.state.text}</Text>
                                    <Text>아르바이트생 이름 : {this.state.employeeName}</Text>
                                </View>
                                <View style={{flex:1, justifyContent:'flex-end'}}>
                                    <Button buttonStyle={{marginBottom:"3%"}} title="승인" type="solid" onPress={()=>this._approveSubmit()}></Button>
                                    <Button buttonStyle={{marginBottom:"3%"}} title="거부" type="outline" onPress={()=>this._rejectSubmit()}></Button>
                                    <Button buttonStyle={{marginBottom:"3%"}} title="뒤로가기" type="solid" onPress={()=>this.setState({isVisible:false})}></Button>
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
                                    <Text>사업자 이름 : {this.state.employerName}</Text>
                                    <Text>시작일짜 : {this.state.startdate}</Text>
                                    <Text>종료일짜 : {this.state.enddate}</Text>
                                    <Text>시급 : {this.state.pay}</Text>
                                    <Text>아르바이트 설명 : {this.state.text}</Text>
                                </View>
                                <View style={{flex:1, justifyContent:'flex-start'}}>
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