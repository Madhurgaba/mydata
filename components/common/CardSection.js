import React from 'react';
import { View } from 'react-native';

const styles = {

	containerStyle : {
		borderBottomWidth : 1,
		padding : 5,
		backgroundColor : '#fff',
		justifyContent : 'flex-start',
		flexDirection : 'row',
		position : 'relative',
		borderColor : '#ddd',
	}
}

const CardSection =  (props) => {
	const { containerStyle } = styles;
	return (
			<View style ={ containerStyle } > 
				{props.children}
			</View>
		);
}

export { CardSection };