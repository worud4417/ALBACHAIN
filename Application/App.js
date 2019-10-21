import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {SplashScreen} from 'expo';
import {Asset} from 'expo-asset';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

import LoginScreen from './src/screen/LoginScreen';
import JoinScreen from './src/screen/JoinScreen';

import reducer from './src/reducer/Index';

const SwitchNavigator = createSwitchNavigator({
  Login:{
    screen:LoginScreen
  },
  Join:{
    screen:JoinScreen
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
          <Image source={require('./assets/background.png')} onLoad={this._cacheResourcesAsync} style={{width:"100%",height:"100%"}}></Image>
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
        require('./assets/background.png')
      ];
  
      const cacheImages = images.map(image => {
        return Asset.fromModule(image).downloadAsync();
      });
  
      Promise.all(cacheImages);
      this.setState({ isReady: true });
    },3000)
  };
}
