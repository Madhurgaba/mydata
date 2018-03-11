import React, { Component }  from 'react';
import { Alert, View, Text, Image, TouchableOpacity  } from 'react-native';
import { Container, Content, Header,Left, List, ListItem, Body, Right, Button, Title, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
const routes = ["Home", "Create Event", "Categories", "Chats", "Profile", "Logout"];

const styles = {
  listViewStyle : 	{flexDirection : 'row'}, 
  iconStyle : {marginTop : 2},
  menuTextStyle : { paddingLeft :5, color : '#fff', fontSize : 16},
  imageStyle : { height: 170, width: "100%", alignSelf: "stretch", position: "absolute" },
  containerStyle : {backgroundColor  :'#34b9b8'} 
}

export default class  SideBar extends Component {

	_handlePress = (val) => {
		
		switch (val){

			case 'home' : 
				Actions.eventHome();
				break;

			case 'event' : 
				Actions.eventCreate();
				break;

			case 'category' : 
				Actions.eventCategory();
				break;

			default : 
				Actions.eventHome();
				break;
		}
	}

	_logoutPress = () => {
		Alert.alert('Logout','Logout Press!');	
	}

	render(){

		const { listViewStyle, iconStyle, menuTextStyle, imageStyle, containerStyle } = styles;
		return(
				 <Container style= {containerStyle}>
			        <Content>
			          <Image source={require('../img/side.png')} style={imageStyle} />
			          <List style={{ marginTop: 170}}>    
			                <ListItem >
			                  <TouchableOpacity onPress={ () => { this._handlePress('home'); } }>
			                    <View style={listViewStyle}>
			                  		<SimpleLineIcons color = '#fff' size = {14} name='home' style={iconStyle} />
			                		<Text style={menuTextStyle}>Home</Text>  	
			                  </View>
			                  </TouchableOpacity>
			                </ListItem>

			                <ListItem >
			                  <TouchableOpacity onPress={ () => { this._handlePress('event'); } }>
			                    <View style={listViewStyle}>
			                  		<SimpleLineIcons color = '#fff' size = {14} name='event' style={iconStyle} />
			                		<Text style={menuTextStyle}>Create Event</Text>  	
			                  </View>
			                  </TouchableOpacity>
			                </ListItem>

			                <ListItem >
			                  <TouchableOpacity onPress={ () => { this._handlePress('category'); } }>
			                    <View style={listViewStyle}>
			                  		<SimpleLineIcons color = '#fff' size = {14} name='grid' style={iconStyle} />
			                		<Text style={menuTextStyle}>Categories</Text>  	
			                  </View>
			                  </TouchableOpacity>
			                </ListItem>

			                <ListItem >
			                  <TouchableOpacity onPress={this._logoutPress}>
			                    <View style={listViewStyle}>
			                  		<SimpleLineIcons color = '#fff' size = {14} name='logout' style={iconStyle} />
			                		<Text style={menuTextStyle}>Logout</Text>  	
			                  </View>
			                  </TouchableOpacity>
			                </ListItem>
			          </List>
			          
			        </Content>
			      </Container>
			);
	}
}
