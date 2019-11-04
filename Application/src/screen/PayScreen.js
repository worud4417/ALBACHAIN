import React,{Component} from 'react';
import {Text,View,StyleSheet,TouchableOpacity,Image,TextInput,KeyboardAvoidingView, Alert,ActivityIndicator,RefreshControl} from 'react-native';
import {connect}from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {withNavigationFocus} from 'react-navigation';
import {Button,ListItem} from 'react-native-elements'

import {color} from '../utils/Color';
import HeaderMenuComponent from '../component/HeaderMenuComponent';
import {fetchEmployeePay,fetchEmployerPay} from '../api/PayApi';
import { ScrollView } from 'react-native-gesture-handler';

class PayScreen extends Component{
    
    constructor(props){
        super(props);
        this.state={
            array:"",
            isReady : false
        }
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

    async componentDidMount(){
        this.setState({isReady:false});
        let result = null;
        if(this.props.status == 1){
            result = await fetchEmployerPay(this.props.user.user.id);
            if(result.status == 1){
                this.setState({array:result.resultArray});
            }
        }
        else{
            result = await fetchEmployeePay(this.props.user.user.id);
            if(result.status == 1){
                this.setState({array:result.resultArray});
            }
        }
        this.setState({isReady:true});
    }

    async _onRefresh(){
        if(this.props.status == 1){
            result = await fetchEmployerPay(this.props.user.user.id);
            if(result.status == 1){
                this.setState({array:result.resultArray});
            }
        }
        else{
            result = await fetchEmployeePay(this.props.user.user.id);
            if(result.status == 1){
                this.setState({array:result.resultArray});
            }
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
                    <View>
                        <ScrollView refreshControl={<RefreshControl refreshing={false} onRefresh={()=>this._onRefresh()}></RefreshControl>}x>
                            {
                                this.state.array.map((item,i) =>(
                                    <ListItem key={i} title = {item.TOTALPAY+" won"}
                                    subtitle = {new Date(item.STARTDATE).toUTCString() + " "+ item.EMPLOYEENAME}>
                                    </ListItem>
                                ))
                            }
                        </ScrollView>
                    </View>
                )
            }
            else{
                return(
                    <View>
                        <ScrollView refreshControl={<RefreshControl refreshing={false} onRefresh={()=>this._onRefresh()}></RefreshControl>}>
                            {
                                this.state.array.map((item,i) =>(
                                    <ListItem key={i} title = {item.TOTALPAY+" won"}
                                    subtitle = {new Date(item.STARTDATE).toUTCString() + " "+ item.EMPLOYERNAME}>
                                    </ListItem>
                                ))
                            }
                        </ScrollView>
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
export default connect(mapStateToProps,mapDispatchToProps)(withNavigationFocus(PayScreen));