import React from 'react';
import {Text,View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class TextInfoComponent extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={{flexDirection:"row",borderBottomWidth:1,marginBottom:"2.5%",borderBottomColor:"gray"}}>
                <Icon style={{marginRight:"2%"}} name = {this.props.icon} size={30} color="gray"></Icon>
                <Text style={{fontSize:15,marginTop:"1%"}}>{this.props.text}</Text>
            </View>   
        )
    }
}

export default TextInfoComponent;
