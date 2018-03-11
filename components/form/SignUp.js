import React, {Component } from 'react';
import { Text, TextInput, View, Alert, KeyboardAvoidingView } from 'react-native';
import { Button, Card, CardSection, Field, Spinner } from '../common';
import { Actions } from 'react-native-router-flux';
import { CheckBox } from 'native-base';
import firebase from 'firebase';
import { Container, Header, Content, List, ListItem } from 'native-base';
import LogoForm from './LogoForm';
import Forgot from './Forgot';

const styles = {

	errorTextStyle : {
		fontSize : 13,
		alignSelf : 'center',
		color : '#34b9b8',
		marginBottom : 5
	},
	container : {
		flex : 1,
		backgroundColor : '#000'
	},
	textStyle  :{
		color : 'gray',
		lineHeight : 20,
		fontSize : 13
	},
	bottomContainer : {
		alignSelf : 'center',
		flexDirection : 'row',
		paddingBottom : 5
	},
	signup : {
		color : '#34b9b8',
		marginLeft : 2
	},
	rememberBox : { 
		flexDirection : 'row',
		marginTop : 10,
		paddingBottom : 20,
		justifyContent : 'space-around'
	}		
};

class SignUp extends Component {

	state = { name : '', email : '',password : '', error : '', loading : false };

	signupButton() {

		const { email, password, error } = this.state;

		this.setState({ error : '', loading : true });
		
		firebase.auth().signInWithEmailAndPassword(email, password)
		.then (this.onSignUpSuccess.bind(this))
		.catch( () => {
			firebase.auth().createUserWithEmailAndPassword(email, password)
			.then (this.onSignUpSuccess.bind(this))
			.catch (this.onSignUpFail.bind(this));
		}); 
	}

	onSignUpFail() {
		this.setState({
			error : 'Authentication Failed!',
			loading : false,
		});
	}

	onSignUpSuccess() {

		this.setState({
			email : '',
			password : '',
			loading : false,
			error : ''
		})
		Actions.loginForm();
	}

	loginScreen(){
		Actions.loginForm();
	}

	renderButton() {
		if(this.state.loading) {
			return <Spinner size="small" />;
		}
		return (  
			<Button onPress ={this.signupButton.bind(this)} >SIGN UP </Button>
		);
	}

	render(){
		return (
			<Container style={styles.container}>
		       	<LogoForm source = {require('../../img/logo.png')}/>
		        <Content
		        	style = {styles.contentStyle} >
		        	<KeyboardAvoidingView behaviour ="padding">
					<Field
						error_show
						icon_name = "user"
						placeholder = "Name"
						value ={this.state.name}
						onChangeText = { name => this.setState({ name })}
					/>
					<Field
						error_show
						icon_name = "envelope"
						placeholder = "Email"
						value ={this.state.email}
						keyboardType = 	'email-address'
						onChangeText = { email => this.setState({ email })}
					/>
					<Field
						icon_name = "lock"
						left_icon = "eye-with-line"
						left_icon_show
						secureTextEntry
						placeholder = "Password"
						value ={this.state.password}
						onChangeText = { password => this.setState({ password })}
					/>

					<Text style={styles.errorTextStyle}>{this.state.error} </Text>
					{this.renderButton() }
					</KeyboardAvoidingView>
				</Content>
				<View style={styles.bottomContainer}>
					<Text style={styles.textStyle}> Already have an account?</Text>
					<Text  style={styles.signup} onPress= { this.loginScreen.bind(this)}>Login </Text>
				</View>
			</Container>
		);
	}
}


export default SignUp;