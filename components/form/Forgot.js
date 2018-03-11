import React, {Component } from 'react';
import { Text, TextInput, View, Alert, KeyboardAvoidingView, Image } from 'react-native';
import { Button, Card, CardSection, Field, Spinner } from '../common';
import { Actions } from 'react-native-router-flux';
import { CheckBox } from 'native-base';
import firebase from 'firebase';
import { Container, Header, Content, List, ListItem } from 'native-base';
import LogoForm from './LogoForm';

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
	lockStyle : { flex : 2, justifyContent : 'center', alignItems : 'center'},
	logo : {
		width : 100,
		marginBottom : 10,
		height :130
	},
	bottomContainer : { 
		 alignSelf : 'center',
		 flexDirection : 'row',
		 paddingBottom : 5 
	},
	forgotCaptionStyle : {
			color : 'gray',
			width : 250,
			textAlign  : 'center',
		},
	signup : { color : '#34b9b8', marginLeft : 2 },
	forgotStyle :{color : '#fff', alignSelf : 'center',fontWeight : 'bold', fontSize : 18}
};

class Forgot extends Component {

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
		Actions.EventList();
	}

	loginScreen(){
		Actions.loginForm();
	}

	forgotPassword() {
		Actions.Forgot;
		Alert.alert('Swooph','Forgot password')
	}
	renderButton() {
		if(this.state.loading) {
			return <Spinner size="small" />;
		}
		return (  
			<Button onPress ={this.loginButton.bind(this)} >RESET PASSWORD </Button>
		);
	}

	render(){
		return (
			<Container style={styles.container}>
				<View style={styles.lockStyle}>
		       		<Image style={ styles.logo } source = {require('../../img/lock.png')} />
		    	   		<Text style={styles.forgotStyle}>Forgot Password </Text>
	       					<Text style={styles.forgotCaptionStyle}> 
			       			We just need registered email address to sent you password reset.
			       		 </Text>
	       		</View>
		        <Content>
		        	<KeyboardAvoidingView behaviour ="padding">
					<Field
						error_show
						icon_name = "envelope"
						placeholder = "Email"
						value ={this.state.email}
						keyboardType = 	'email-address'
						onChangeText = { email => this.setState({ email })}
					/>
					<Text style={styles.errorTextStyle}>{this.state.error} </Text>
					{this.renderButton() }
					</KeyboardAvoidingView>
				</Content>
				<View style={styles.bottomContainer}>
					<Text style={styles.textStyle}> Back to </Text>
					<Text  style={styles.signup} onPress= { this.loginScreen.bind(this)}>Login </Text>
				</View>
			</Container>
		);
	}
}


export default Forgot;