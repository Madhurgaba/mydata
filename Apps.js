import React, {Component } from 'react';
import { View, Alert } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {

	state = { loggedIn : null };

	componentWillMount() {
			firebase.initializeApp({
			    apiKey: 'AIzaSyA7MU5TK9PfgQcXTb00kL1HK39WqguZmqU',
			    authDomain: 'swooph-cac1a.firebaseapp.com',
			    databaseURL: 'https://swooph-cac1a.firebaseio.com',
			    projectId: 'swooph-cac1a',
			    storageBucket: 'swooph-cac1a.appspot.com',
			    messagingSenderId: '369135657827'
		  });

		firebase.auth().onAuthStateChanged( (user) => {	
			if(user){
				this.setState({ loggedIn : true });
			}
			else{ 
				this.setState({ loggedIn : false});
			}	
		});
	}

	renderContent() {
		switch(this.state.loggedIn) {
			case true : 
				return (<Button onPress ={() => firebase.auth().signOut()}>Log Out </Button>);
			case false : 
				return <LoginForm />;
			default : 
			return (<Spinner size = 'large' />);
		}
	}

	render(){
		return (
			<View> 
				<Header HeaderText = {'Swooph'} />
				{ this.renderContent() }
			</View>
		)
	}
}
export default App;