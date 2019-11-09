import React,{Component} from 'react';
import {Text,View,ActivityIndicator,ScrollView} from 'react-native';
import {ListItem} from 'react-native-elements';
import {connect}from 'react-redux';
import ActionCreator from '../action/Index';

import {fetchGetEmployeeRecode} from '../api/GetRecodeApi';
import {color} from '../utils/Color';

class EmployeeRecodeScreen extends Component{
    constructor(props){
        super(props)
        this.state={
            record : "",
            isReady:false
        }
    }

    static navigationOptions = ({ navigation }) => {
        return{
            headerTitle:() =>{
                return(
                    <Text style={{color:"white",marginLeft:"5%",fontSize:20}}>내 이력 조회</Text>
                )
            },
            headerStyle:{
                backgroundColor: color.blue
            }
        }
    };

    async componentDidMount(){
        this.setState({isReady:false});
        let result = await fetchGetEmployeeRecode(this.props.user.user.id);
        if(result.status == 1){
            this.setState({record:result.recordArray});
        }
        this.setState({isReady:true});
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
            return(
                <ScrollView>
                    {
                        this.state.record.map((item,i) => (
                            <ListItem key = {i} title = {item[1]} subtitle = {new Date(Number.parseInt(item[2])).toUTCString()}
                            bottomDivider chevron></ListItem>
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

export default connect(mapStateToProps,mapDispatchToProps)(EmployeeRecodeScreen);