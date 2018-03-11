import React, {Component } from 'react';
import { Text, TextInput, View, Alert, KeyboardAvoidingView, Image } from 'react-native';
import { Button, Card, CardSection, Field, Spinner } from '../common';
import { Actions } from 'react-native-router-flux';
import { CheckBox } from 'native-base';
import firebase from 'firebase';
import { Container, Header, Content, List, ListItem, Input, InputGroup, Item } from 'native-base';
import LogoForm from '../form/LogoForm';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import DateTimePicker from 'react-native-modal-datetime-picker';

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
	},
	logo : {
		width : 90,
		height : 101,
	},
	logoContainer : {
		alignSelf : 'center',
		justifyContent : 'center',
	},		

};

class EventCreate extends Component {

	state = { start_time : '', end_time  : '', event_date : '', email : '',password : '', error : '', loading : false, checked : false,isDateTimePickerVisible: false };

	_showDateTimePicker = () => this.setState({
			 isDateTimePickerVisible: true ,
			 event : this.state.event_date,
			 start_time : this.state.start_time,
			 end_time : this.state.end_time
			});

	  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

	  _handleDatePicked = (date) => {
	    console.log('A date has been picked: ', date);
	    this._hideDateTimePicker();
	  }

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
			<Button onPress ={this.loginButton.bind(this)} >CREATE EVENT </Button>
		);
	}

	render(){
		return (
			<Container style={styles.container}>
				<View style={styles.logoContainer}>
					<Image style={ styles.logo } source = {require('../../img/logo.png')} />
				</View>
		        <Content>
		        	<KeyboardAvoidingView behaviour ="padding">
					<Field
						error_show
						icon_name = "event"
						placeholder = "Enter Event Title"
						value ={this.state.name}
						keyboardType = 	'email-address'
						onChangeText = { email => this.setState({ email })}
					/>
					<Field
						error_show
						icon_name = "location-pin"
						placeholder = "Select Event Venue"
						value ={this.state.venu}
						onChangeText = { venu => this.setState({ venu })}
					/>
		      <View style={{ flex: 1 }}>
					<DateTimePicker
				          isVisible={this.state.isDateTimePickerVisible}
				          onConfirm={this._handleDatePicked}
				          onCancel={this._hideDateTimePicker}
				        />
			        </View>
					<Field
						error_show
						icon_name = "calendar"
						placeholder = "Select Event Date"
						value ={this.state.event_date}
						onChangeText={this._showDateTimePicker}
					/>
					<View style={{ flexDirection : 'row', justifyContent : 'center' }}>
						<Item style = {{ width : 140, marginRight: 20}}>
							<SimpleLineIcons color = 'gray' size = {16} active name='clock' />
							<Input
								placeholder = "Start Time"
								value ={this.state.start_time}
								style={{fontSize : 15, color : '#34b9b8'}}
								onChangeText={this._showDateTimePicker}
							/>
						</Item>
						<Item style = {{ width : 140}}>
							<SimpleLineIcons color = 'gray' size = {16} active name='clock' />
							<Input
								placeholder = "End Time"
								value ={this.state.endtime}
								style={{fontSize : 15, color : '#34b9b8'}}
								onChangeText={this._showDateTimePicker}
							/>
						</Item>
					</View>
					<Field
						error_show
						icon_name = "picture"
						placeholder = "Upload Image"
						value ={this.state.image}
						onChangeText = { image => this.setState({ image })}
					/>
					 <ListItem style={{flex : 1, marginLeft  :30, width : 300 }}>
                            <InputGroup>
                                <Input style = {{color : '#34b9b8', fontSize : 15}} stackedLabel placeholder="Description" />
                            </InputGroup>
                        </ListItem>
					<Text style={styles.errorTextStyle}>{this.state.error} </Text>
					{this.renderButton() }
					</KeyboardAvoidingView>
				</Content>
			</Container>
		);
	}
}


export default EventCreate;