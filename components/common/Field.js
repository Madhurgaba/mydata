import React , { Component } from 'react';
import { Input, Item } from 'native-base';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Entypo from 'react-native-vector-icons/Entypo';

const styles = {
	fieldStyle : {
		margin : 3,
		alignSelf : 'center',
		width : 300
	},
	inputStyle : {
		color : '#34b9b8',
		fontSize : 15
	}

}
const Field = ({keyboardType, error_show, error, icon_name, left_icon_show, left_icon, value , onChangeText, placeholder, secureTextEntry }) => {

	const { fieldStyle, inputStyle} = styles;

	return (
			<Item style = {fieldStyle}>
	            <SimpleLineIcons color = 'gray' size = {16} active name={icon_name} />
	            <Input 
	            	style = {inputStyle}
	            	placeholder = {placeholder}
	            	value = {value}
	            	keyboardType = {keyboardType}
	            	onChangeText = { onChangeText }	
	            	secureTextEntry = {secureTextEntry}
	            	 />
	            	{ left_icon_show &&  <Entypo color = 'gray' size = {16} name={left_icon} /> }
	          </Item>
		);
}

export { Field };


