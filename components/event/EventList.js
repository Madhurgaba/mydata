import React, {Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import axios from 'axios';
import EventDetail from './EventDetail';


class EventList extends Component { 

	state = { events : [] };

	componentWillMount() {
		axios.get('https://rallycoding.herokuapp.com/api/music_albums')
			.then(response => this.setState({ events : response.data })
		);
	}

	renderEventList() {
		return this.state.events.map(event =>  <EventDetail key ={event.title } record={event} /> );

	}

render() {
		return (
			<ScrollView>
				<View>
					{this.renderEventList() }
				</View>
			</ScrollView>
			);
	}

}
export default EventList;