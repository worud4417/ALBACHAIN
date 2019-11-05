import React,{Component} from 'react';
import {Text,View,Alert,Image} from 'react-native';
import {connect}from 'react-redux';
import ActionCreator from '../action/Index';
import {ButtonGroup,Button} from 'react-native-elements';
import { withNavigationFocus } from 'react-navigation';

import HeaderMenuComponent from '../component/HeaderMenuComponent';
import  TextInfoComponent from '../component/TextInfoComponent';
import {fetchDeleteEmployee,fetchDeleteEmployer} from '../api/JoinApi';
import {color} from '../utils/Color';

class MyScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            selectedIndex:0,
            isReRender:1
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
            headerRight:() => {
                return(
                    <HeaderMenuComponent onPress={()=>navigation.openDrawer()} icon={"ios-menu"}></HeaderMenuComponent>
                )
            },
            headerStyle:{
                backgroundColor: color.blue
            }
        }
    };

    async _deleteUser(){
        if(this.props.status == 1){
            let result = await fetchDeleteEmployer(this.props.user.user.id);
            if(result.status == 1){
                return this.props.navigation.navigate("Login");
            }
        }
        else{
            let result = await fetchDeleteEmployee(this.props.user.user.id);
            if(result.status == 1){
                return this.props.navigation.navigate("Login");
            }
        }
    }

    updateIndex (selectedIndex) {
        this.setState({selectedIndex})
        if(selectedIndex == 1){
            Alert.alert(
                '회원탈퇴',
                '탈퇴하시겠습니까?',
                [
                    {text: "예",onPress:()=>this._deleteUser()},
                    {text : "아니오",onPress:()=>{return null}},
                ],
                {cancelable:false},
            )
            return null;
        }
        else{
            return this.props.navigation.navigate("Update");
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isFocused !== this.props.isFocused) {
            this.setState({isReRender:this.state.isReRender++});
        }
    }
    
    render(){
        const { selectedIndex } = this.state;
        if(this.props.status == 1){
            return(
                <View style={{flex:1}}>
                    <Image source={{uri:this.props.user.user.imagesource}} style={{alignSelf:"center",width:100,height:100,borderRadius:50,overflow:"hidden",resizeMode:"cover",backgroundColor:"gray",marginTop:"5%"}}></Image>
                    <View style={{flex:3,margin:"5%"}}>
                        <TextInfoComponent icon={"ios-contact"} text={"ID : " + this.props.user.user.id}></TextInfoComponent>
                        <TextInfoComponent icon={"ios-person"} text={"사업자 이름 : " + this.props.user.user.name}></TextInfoComponent>
                        <TextInfoComponent icon={"ios-call"} text={"사업자 전화번호 : " + this.props.user.user.callnumber}></TextInfoComponent>
                        <TextInfoComponent icon={"ios-home"} text={"사업자 주소 : " + this.props.user.user.address}></TextInfoComponent>
                        <TextInfoComponent icon={"ios-briefcase"} text={"사업자 등록번호 : " + this.props.user.user.registration}></TextInfoComponent>
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
                    <Image source={{uri:this.props.user.user.imagesource}} style={{alignSelf:"center",width:100,height:100,borderRadius:50,overflow:"hidden",resizeMode:"cover",backgroundColor:"gray",marginTop:"5%"}}></Image>
                    <View style={{flex:3,margin:"5%"}}>
                        <TextInfoComponent icon={"ios-contact"} text={"ID : " + this.props.user.user.id}></TextInfoComponent>
                        <TextInfoComponent icon={"ios-person"} text={"이름 : " + this.props.user.user.name}></TextInfoComponent>
                        <TextInfoComponent icon={"ios-call"} text={"전화번호 : " + this.props.user.user.callnumber}></TextInfoComponent>
                        <TextInfoComponent icon={"ios-today"} text={"주민등록번호 : " + this.props.user.user.socialsecurity}></TextInfoComponent>
                    </View>
                    <View style={{flex:1,margin:"5%"}}>
                        <Button buttonStyle={{height:"50%",marginBottom:"3%",marginHorizontal:"20%"}} title="내 이력 보기" onPress={()=>this.props.navigation.navigate("EmployeeRecode")}></Button>
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
        },
        Logout : () => {
            dispatch(ActionCreator.Logout());
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withNavigationFocus(MyScreen));