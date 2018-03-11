import React, {Component } from 'react';
import { Text, TextInput, View, Image,Dimensions} from 'react-native';

const styles = {

	container : {
		flex : 1,
	},
	logoContainer : {
		alignSelf : 'center',
		flexGrow : 1,
		justifyContent : 'center',
	},
	logo : {
		width : 140,
		height : 160
	}
};

class LogoForm extends Component {

	render(){
		return (
				<View style={styles.container}>
					<View style={styles.logoContainer}>
						<Image style={ styles.logo } source={this.props.source} />
					</View>
				</View>
		);
	}
}


export default LogoForm;