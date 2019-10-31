import React,{Component} from 'react';
import {View,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class HeaderMenuComponent extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <View>
                <TouchableOpacity style={{margin:10}} onPress={this.props.onPress}>
                    <Icon name = {this.props.icon} size={35} style={{color:"white"}}></Icon>
                </TouchableOpacity>
            </View>
        )
    }
}

export default HeaderMenuComponent