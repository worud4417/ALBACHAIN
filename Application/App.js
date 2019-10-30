import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {SplashScreen} from 'expo';
import {Asset} from 'expo-asset';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import {color} from './src/utils/Color';

import LoginScreen from './src/screen/LoginScreen';
import JoinScreen from './src/screen/JoinScreen';
import MainScreen from './src/screen/MainScreen';
import MyScreen from './src/screen/MyScreen';
import LogoutComponent from './src/component/LogoutComponent';
import EmployeeRequestScreen from './src/screen/EmployeeRequestScreen';
import JobOfferScreen from './src/screen/JobOfferScreen';
import MatchJobScreen from './src/screen/MatchJobScreen';
import UpdateScreen from './src/screen/UpdateScreen';

import reducer from './src/reducer/Index';

const MainStack = createStackNavigator({
  Main:{
    screen:MainScreen
  },
  EmployeeRequest:{
    screen:EmployeeRequestScreen
  },
  JobOffer:{
    screen:JobOfferScreen
  }
})

const MatchedJobStack = createStackNavigator({
  MatchJob:{
    screen:MatchJobScreen
  }
})

const MyStack = createStackNavigator({
  My:{
    screen:MyScreen
  },
  Update:{
    screen:UpdateScreen
  }
})

const TabNavigator = createBottomTabNavigator({
  목록:{
    screen:MainStack
  },
  매칭:{
    screen:MatchedJobStack
  },
  내정보:{
    screen:MyStack
  },
  로그아웃:{
    screen:LogoutComponent
  }
},{
  defaultNavigationOptions:({navigation})=>({
    tabBarIcon:({focused,horizontal,tintColor})=>{
      const {routeName} = navigation.state;
      if(routeName === "목록"){
        return <Icon name="ios-construct" size={30} color="gray"></Icon>
      }
      else if(routeName === "매칭"){
        return <Icon name="ios-people" size={30} color="gray"></Icon>
      }
      else if(routeName === "내정보"){
        return <Icon name="ios-contact" size={30} color="gray"></Icon>
      }
      else if(routeName === "로그아웃"){
        return <Icon name="ios-exit" size={30} color="gray"></Icon>
      }
    }
  }),
  tabBarOptions:{
    activeBackgroundColor:color.sky,
    activeTintColor:color.blue,
  }
})

const SwitchNavigator = createSwitchNavigator({
  Login:{
    screen:LoginScreen
  },
  Join:{
    screen:JoinScreen
  },
  Tab:{
    screen:TabNavigator
  }
})

const AppContainer = createAppContainer(SwitchNavigator);

export default class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      isReady : false
    }
  }

  componentDidMount(){
    SplashScreen.preventAutoHide();
  }

  render(){
    if(!this.state.isReady){
      return (
        <View style={{flex:1}}>
          <Image source={require('./assets/backGround.jpg')} onLoad={this._cacheResourcesAsync} style={{width:"100%",height:"100%"}}></Image>
        </View>
      )
    }
    else {
      return(
        <Provider store={createStore(reducer)}>
          <AppContainer></AppContainer>
        </Provider>
      )
    }
  }

  _cacheResourcesAsync =  () => {
    setTimeout(()=>{
      SplashScreen.hide();
      const images = [
        require('./assets/backGround.jpg')
      ];
  
      const cacheImages = images.map(image => {
        return Asset.fromModule(image).downloadAsync();
      });
  
      Promise.all(cacheImages);
      this.setState({ isReady: true });
    },3000)
  };
}
