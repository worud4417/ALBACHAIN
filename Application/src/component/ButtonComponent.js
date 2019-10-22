import React,{Component} from 'react';
import {View,TouchableOpacity,StyleSheet,Text} from 'react-native';

class Button extends Component{
    constructor(props){
        super(props);
        
    }

    render(){
        return(
            <TouchableOpacity style={styles.touchableOpacity} onPress={()=>this.props.fun()}>
                <Text>{this.props.title}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    touchableOpacity:{
    }
})

export default Button;