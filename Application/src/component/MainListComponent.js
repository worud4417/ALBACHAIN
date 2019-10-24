import React from 'react';
import {Text,View,StyleSheet,TouchableOpacity,Image,TextInput,KeyboardAvoidingView,FlatList,ScrollView} from 'react-native';
import {connect}from 'react-redux';
import ActionCreator from '../action/Index';
import { ListItem } from 'react-native-elements'

class MainListComponent extends React.Component{
    constructor(props){
        super(props)
    }

    _onPress(item){
        if(this.props.status == 1){
            this.props.navigation.navigate("EmployerResponse",{jobOffer:item});
        }
        else{
            this.props.navigation.navigate("EmployeeRequest",{jobOffer:item});
        }
    }

    render(){
        return(
            <ScrollView>
                {
                    this.props.jobOffer.map((item,i) => (
                        <ListItem key = {i} title = {"사업자 : " + item.name} 
                        subtitle = {"시작일짜 : "+item.startdate+" 기간 : "+item.period} 
                        bottomDivider chevron onPress = {()=>this._onPress(item)}>
                        </ListItem>
                    ))
                }
            </ScrollView>
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