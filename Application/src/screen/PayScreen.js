import React,{Component} from 'react';
import {Text,View,StyleSheet,TouchableOpacity,Image,TextInput,KeyboardAvoidingView, Alert} from 'react-native';
import {connect}from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {withNavigationFocus} from 'react-navigation';
import {Button} from 'react-native-elements'

import {color} from '../utils/Color';
import HeaderMenuComponent from '../component/HeaderMenuComponent';

class PayScreen extends Component{
    
    constructor(props){
        super(props);
    }

    static navigationOptions = ({ navigation }) => {
        return{
            headerTitle:() =>{
                return(
                    <Text style={{color:"white",marginLeft:"5%",fontSize:20}}>급료 계산</Text>
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

    componentDidMount(){
    }

    render(){
        if(this.props.status == 1){
            return(
                <View>
                    <Text>employer</Text>
                </View>
            )
        }
        else{
            return(
                <View>
                    <Text>employee</Text>
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
        InitJobOffer : () => {
            dispatch(ActionCreator.InitJobOffer());
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withNavigationFocus(PayScreen));