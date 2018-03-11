import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import GridView from 'react-native-super-grid';
import { Actions } from 'react-native-router-flux';
import { InnerHeader } from '../common';
import { Container, Header,Left, Body, Right, Title, Drawer, Item, Icon, Button, Input } from 'native-base';
import SideBar from '../SideBar';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const styles = StyleSheet.create({
  gridView: {
    paddingTop: 25,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    padding: 10,
    height: 150,
  },
  membersView : {
  	flexDirection  :'row',
  	justifyContent : 'center',
  	paddingBottom :20
  },
  imageStyle : {
  	width : 40,
  	height : 35,
  	alignSelf  :'center'
  },
  itemName: {
  	marginTop : 5,
    fontSize: 15,
    color: '#fff',
    alignSelf : 'center',
  },
  itemMember: {
    fontSize: 11,
    color: '#fff',
  },
  itemMemberText: {
    paddingRight : 5,
    fontSize: 11,
    color: '#fff',
  },
});

export default class EventCategory extends Component {

	 constructor(props) {
    	super(props);
	  }

    closeDrawer() {
        this._drawer._root.close()
      }
    openDrawer() {
       this._drawer._root.open()
    }

 	_handlePress = (objs) => {
        Actions.eventsubCategory({heading : objs});
    }

  render() {
    // Taken from https://flatuicolors.com/
    const items = [
       { name: 'Swooph Social', code: '#1abc9c',members : '25',link: '1', url : "require('../../img/swooph_social.png')" },
       { name: 'Outdoor Life', code: '#3498db', members : '35',link: '2', url : "require('../../img/outdoor_life.png')" },
       { name: 'Hangout', code: '#34495e', members : '50',link: '3' , url : "require('../../img/hangout.png')" },
       { name: 'Party Next Door', code: '#27ae60', members : '29',link: '4', url : "require('../../img/party_nextdoor.png')" },
       { name: 'Fitness and Health', code: '#8e44ad', members : '108',link: '5', url : "require('../../img/fitness_and_health.png')" },
       { name: 'Single Swooph', code: '#f1c40f', members : '45',link: '6', url : "require('../../img/swooph_social.png')" }
    ];

    return (
    	<Container>
      	 <Drawer ref={(ref) => { this._drawer = ref; }} content={<SideBar navigator={this._navigator} />} onClose={() => this.closeDrawer()} >
	            <InnerHeader 
	                iconName = "menu"
	                headerTitle = "Categories"
	                left_icon_show 
	                onPress = { () => this.openDrawer() }
	                right_icon_end_two_show />
	                <Header searchBar rounded>
			          <Item style={{ 
			          				borderRadius : 20,
			          				backgroundColor : '#34b9b8', 
			          				borderRightWidth : 1,
			          				borderLeftWidth : 1,
			          				borderBottomWidth : 1,
			          				borderTopWidth : 1,
			          				borderColor : '#fff'}}
		          				 >
			            <Icon color = 'white' name="ios-search" />
			            <Input style={{color : '#fff'}} placeholder="Search Categories" />
			          </Item>
			        </Header>
            	<GridView
				        itemDimension={130}
				        items={items}
				        style={styles.gridView}
				        renderItem={item => (
			        <TouchableOpacity onPress={ () => this._handlePress(item.name)}>
				          <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
				          	<Image source={require('../../img/swooph_social.png')}  style={styles.imageStyle}/>
				          		<Text style={styles.itemName}>{item.name}</Text>
				            	<View style={styles.membersView}>
				            		<Text style={styles.itemMemberText}>Members</Text>
				            	 	<Text style={styles.itemMember}>: {item.members}</Text>
			            		</View>
				          </View>
			        </TouchableOpacity>
		        )}
		      />
        </Drawer>
      </Container>
    );
  }
}