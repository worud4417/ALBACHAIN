import React,{Component} from 'react';
import {Text,View,StyleSheet,TouchableOpacity,Image,TextInput,KeyboardAvoidingView} from 'react-native';
import {connect}from 'react-redux';
import ActionCreator from '../action/Index';
import {ButtonGroup,Button} from 'react-native-elements';

import  TextInfoComponent from '../component/TextInfoComponent';
import {color} from '../utils/Color';

class MyScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            selectedIndex:0
        }
        this.updateIndex = this.updateIndex.bind(this)
    }

    static navigationOptions = ({ navigation }) => {
        return{
            headerTitle:() =>{
                return(
                    <Text style={{color:"white",marginLeft:"5%",fontSize:20}}>내 정보</Text>
                )
            },
            headerStyle:{
                backgroundColor: color.blue
            }
        }
    };

    updateIndex (selectedIndex) {
        this.setState({selectedIndex})
        console.log(selectedIndex)
      }
    
    render(){
        const { selectedIndex } = this.state;
        if(this.props.status == 1){
            return(
                <View style={{flex:1}}>
                    <View style={{flex:3,margin:"5%"}}>
                        <TextInfoComponent icon={"ios-contact"} text={"ID : " + this.props.user.id}></TextInfoComponent>
                        <TextInfoComponent icon={"ios-person"} text={"사업자 이름 : " + this.props.user.name}></TextInfoComponent>
                        <TextInfoComponent icon={"ios-call"} text={"사업자 전화번호 : " + this.props.user.callnumber}></TextInfoComponent>
                        <TextInfoComponent icon={"ios-home"} text={"사업자 주소 : " + this.props.user.address}></TextInfoComponent>
                        <TextInfoComponent icon={"ios-briefcase"} text={"사업자 등록번호 : " + this.props.user.registration}></TextInfoComponent>
                    </View>
                    <View style={{flex:1,margin:"5%"}}>
                        <ButtonGroup onPress={this.updateIndex} selectedIndex={selectedIndex} buttons={["회원정보수정","회원탈퇴"]} containerStyle={{height:"30%"}}></ButtonGroup>
                    </View>
                </View>
            )
        }
        else {
            return(
                <View style={{flex:1}}>
                    <View style={{flex:3,margin:"5%"}}>
                        <TextInfoComponent icon={"ios-contact"} text={"ID : " + this.props.user.id}></TextInfoComponent>
                        <TextInfoComponent icon={"ios-person"} text={"이름 : " + this.props.user.name}></TextInfoComponent>
                        <TextInfoComponent icon={"ios-call"} text={"전화번호 : " + this.props.user.callnumber}></TextInfoComponent>
                        <TextInfoComponent icon={"ios-today"} text={"주민등록번호 : " + this.props.user.socialsecurity}></TextInfoComponent>
                    </View>
                    <View style={{flex:1,margin:"5%"}}>
                        <Button buttonStyle={{height:"50%",marginBottom:"3%",marginHorizontal:"20%"}} title="내 이력 보기" onPress={()=>console.log("a")}></Button>
                        <ButtonGroup onPress={this.updateIndex} selectedIndex={selectedIndex} buttons={["회원정보수정","회원탈퇴"]} containerStyle={{height:"30%"}}></ButtonGroup>
                    </View>
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

export default connect(mapStateToProps,mapDispatchToProps)(MyScreen);