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

class LoginForm extends Component {

	state = { email : '',password : '', error : '', loading : false, checked : false };

	loginButton() {

		const { email, password, error } = this.state;

		this.setState({ error : '', loading : true });
		
		firebase.auth().signInWithEmailAndPassword(email, password)
		.then (this.onLoginSuccess.bind(this))
		.catch( () => {
			firebase.auth().createUserWithEmailAndPassword(email, password)
			.then (this.onLoginSuccess.bind(this))
			.catch (this.onLoginFail.bind(this));
		}); 
	}

	onLoginFail() {
		this.setState({
			error : 'Authentication Failed!',
			loading : false,
		});
	}

	toggle() {
        this.setState({checked: !this.state.checked});
    }

	onLoginSuccess() {

		this.setState({
			email : '',
			password : '',
			loading : false,
			error : ''
		})
		Actions.eventHome();
	}

	signUpScreen(){
		Actions.signupForm();
	}

	forgotPassword() {
		Actions.forgotForm();
	}
	renderButton() {
		if(this.state.loading) {
			return <Spinner size="small" />;
		}
		return (  
			<Button onPress ={this.loginButton.bind(this)} >LOGIN </Button>
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
						<View style={styles.rememberBox} >
				  		<CheckBox color="#34b9b8"
				  			style={styles.checkboxStyle}
				  				  onPress={this.toggle.bind(this)} checked={this.state.checked} />
								<Text style={styles.textStyle}> Remember me </Text>
								<Text style={styles.textStyle} onPress= { this.forgotPassword.bind(this)}> Forgot Password </Text>
						</View>

					<Text style={styles.errorTextStyle}>{this.state.error} </Text>
					{this.renderButton() }
					</KeyboardAvoidingView>
				</Content>
				<View style={styles.bottomContainer}>
					<Text style={styles.textStyle}> Don't have an account ?</Text>
					<Text  style={styles.signup} onPress= { this.signUpScreen.bind(this)}>Sign Up </Text>
				</View>
			</Container>
		);
	}
}


export default LoginForm;