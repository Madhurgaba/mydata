import React  from 'react';
import { Scene, Router, Actions, ActionConst } from 'react-native-router-flux';
import LoginForm from './components/form/LoginForm';
import Forgot from './components/form/Forgot';
import SignUp from './components/form/SignUp';
import EventList from './components/event/EventList';
import EventHome from './components/event/EventHome';
import EventCreate from './components/event/EventCreate';
import EventCategory from './components/event/EventCategory';
import EventsubCategory from './components/event/EventsubCategory';
import EventDescription from './components/event/EventDescription';

import Splash from './components/splash';
const styles = {
	navBar: {
    	backgroundColor:'#000',
	},
	navBarEventDescription: {
    	backgroundColor:'#34b9b8',
	},
	navBarTitle:{
	    color:'gray',
	    fontWeight : '400',
	    alignSelf  : 'center',
	    marginRight : 50
	},
	navBarTitleEvent:{
	    color:'#fff',
	    fontWeight : '400',
	},
	barButtonTextStyle:{
	    color:'#fff',
	    backgroundColor : 'green'
	},
	barButtonIconStyle:{
	    tintColor:'#fff'
	},
	navBarButtonColor : {
		color : 'gray'
	}
}
const RouterComponent = () => {

	return (
		<Router>
			<Scene key="root" hideNavBar>

					<Scene initial key='splashScreen' hideNavBar component={Splash}  />

					 <Scene key='main'>
				 		<Scene key="loginForm"  hideNavBar component ={LoginForm} title= "Please login" />
				 		<Scene key="forgotForm" hideNavBar component ={Forgot} title="Forgot Password List" />
				 		<Scene key="signupForm" hideNavBar component ={SignUp} title="Sign Up Form" />
				 		<Scene key="eventList" hideNavBar component ={EventList} title="Event List" />
				 		<Scene key="eventHome" hideNavBar component ={EventHome} title="Event Home" />
				 		<Scene 
				 			 tintColor= 'gray'
					 		 navigationBarStyle={styles.navBar} 
					 		 titleStyle={styles.navBarTitle}
					 		 barButtonTextStyle={styles.barButtonTextStyle}
					 		 barButtonIconStyle={styles.barButtonIconStyle}
					 		key="eventCreate" component ={EventCreate} title="Create Event" />

				 		<Scene key="eventCategory" hideNavBar component ={EventCategory} title="Categories" />
				 		<Scene key="eventsubCategory" hideNavBar component ={EventsubCategory} title="Sub Categories" />
				 		<Scene 
					 		 rightTitle="Join"
				 			 tintColor= 'white'
					 		 navigationBarStyle={styles.navBarEventDescription} 
					 		 titleStyle={styles.navBarTitleEvent}
					 		 key="eventDescription" component ={EventDescription} title="International" />
				 	</Scene>
			</Scene>
		</Router>
	);
};

export default RouterComponent;