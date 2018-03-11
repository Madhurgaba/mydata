import React, { Component }  from 'react';
import { View, Text } from 'react-native';
import HomeTab from './components/event/HomeTab';
//import { Provider } from 'react-redux';
//import { createStore } from 'redux';
//import reducers from './reducers';
import LoginForm from './components/form/LoginForm';
import firebase from 'firebase';
import Router from './Router';
import getTheme from './themes/components/';
import { StyleProvider }  from 'native-base';
import swoophTheme from './themes/variables/swoophTheme';

class App extends Component {

 	componentWillMount(){

		 const config = {
		    apiKey: "AIzaSyAs7OBzPHXudluByyUBhQpOM5k6NEuixRk",
		    authDomain: "social-event-9281a.firebaseapp.com",
		    databaseURL: "https://social-event-9281a.firebaseio.com",
		    projectId: "social-event-9281a",
		    storageBucket: "social-event-9281a.appspot.com",
		    messagingSenderId: "942278471203"
		  };

	   firebase.initializeApp(config);
	}

	render(){
		//const store = createStore(reducers); 
	return (
		<StyleProvider style={getTheme(swoophTheme)}>
			  <View style={{flex : 1}}>
					<Router />
			  </View>
		  </StyleProvider>
		);

	}
}

export default App;