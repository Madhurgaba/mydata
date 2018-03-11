import React from 'react';
import { Text, TouchableOpacity, Alert } from 'react-native';

const  styles = {
	buttonStyle : {
		flex : 1, 
		borderRadius : 5,
		borderWidth  : 1,
		borderColor : '#34b9b8',
		marginLeft : 5,
		marginRight : 5,
		borderRadius : 20,
		alignSelf : 'center',
		width : 300,
		backgroundColor : '#34b9b8',

	},
	textStyle : {
		alignSelf : 'center',
		color : '#fff',
		fontSize : 15,
		paddingTop : 10,
		paddingBottom : 10,
		borderRadius : 5
	}
};

const Button = ({onPress, children}) => {
	const  {buttonStyle, textStyle } = styles;
	return ( 
			<TouchableOpacity style ={buttonStyle} onPress ={onPress} >
				<Text style={ textStyle }> {children} </Text>
			</TouchableOpacity>
	);
}

export { Button };