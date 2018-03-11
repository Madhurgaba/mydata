import React from 'react';
import { View, Text } from 'react-native';

const styles = {
	HeaderTextStyle : {
		fontSize: 20
	},
	HeaderContainer : {
		  justifyContent: 'center',
		  alignItems: 'center',
		  backgroundColor: '#F8F8F8',
		  height : 60,
		  paddingTop : 15,
		  shadowColor : '#000',
		  shadowOffset : { width : 0, height : 2 },
		  shadowOpacity : 0.9	
		}
	}
const Header = (props) => {

	const { HeaderTextStyle , HeaderContainer } = styles;

	return (
			<View style ={ HeaderContainer}>
				<Text style ={ HeaderTextStyle} > {props.HeaderText }</Text>
			</View>
		);

}

export { Header };