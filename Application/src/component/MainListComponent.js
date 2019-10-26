import React from 'react';
import {View,StyleSheet,TouchableOpacity,Image,TextInput,KeyboardAvoidingView,FlatList,ScrollView} from 'react-native';
import {connect}from 'react-redux';
import ActionCreator from '../action/Index';
import { ListItem,Overlay,Text,Button } from 'react-native-elements'

class MainListComponent extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isVisible:false,
            _id:"",
            address:"",
            callnumber:"",
            id:"",
            name:"",
            period:"",
            registration:"",
            startdate:"",
            text:""
        }
    }

    _onPress(item){
        if(this.props.status == 1){
            this.setState({
                isVisible:true,
                _id:item._id,
                address:item.address,
                callnumber:item.callnumber,
                id:item.id,
                name:item.name,
                period:item.period,
                registration:item.registration,
                startdate:item.startdate,
                text:item.text
            });
        }
        else{
            this.props.navigation.navigate("EmployeeRequest",{jobOffer:item});
        }
    }

    render(){
        if(!this.state.isVisible){
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
        else{
            return(
                <Overlay isVisible={this.state.isVisible} onBackdropPress = {()=>this.setState({isVisible:false})}>
                    <View style={{flex:1}}>
                        <View style={{flex:1}}>
                            <Text>번호 : {this.state._id}</Text>
                            <Text>아이디 : {this.state.id}</Text>
                            <Text>이름 : {this.state.name}</Text>
                            <Text>사업자 등록번호 : {this.state.registration}</Text>
                            <Text>시작일자 : {this.state.startdate}</Text>
                            <Text>기간 : {this.state.period}</Text>
                            <Text>아르바이트 설명 : {this.state.text}</Text>
                        </View>
                        <Button title="확인" type="solid" onPress={()=>this.setState({isVisible:false})}></Button>
                    </View>
                </Overlay>
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

export default connect(mapStateToProps,mapDispatchToProps)(MainListComponent); 