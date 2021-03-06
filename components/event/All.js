import React, { Component } from 'react';
import { Image, Alert } from 'react-native';
import { Container, Content } from 'native-base';
import { Actions } from 'react-native-router-flux';
import EventCard from './EventCard';

export default class All  extends Component {

  _handlePress = () => {

      Alert.alert('fgcg', 'bhhghgc');

      Actions.eventDescription();
  }

  render() {

    return (
      <Container>
        <Content>
          <EventCard 
            avatarImage = {require('../../img/avatar.png')}
            eventHeading = "Jesika Alba"
            locationText = " California United States"
            eventTime = "12 minutes ago"
            eventDescriptionHeading = "Consectetur adipisicing elit, sed do eiusmod "
            eventDescription = " Funny things is when you  string all of these phrases together into a sentense, and multiple sentenses to form a paragraph."
            likes = "12"
            chats = "4"
            ButtonText = "View Full"
            eventImage = {require('../../img/new.jpg')}
            onPress = { () => this._handlePress() }
          />
           <EventCard 
            avatarImage = {require('../../img/avatar.png')}
            eventHeading = "Kate Beckinsale"
            locationText = "London, United Kingdom"
            eventTime = "31 Jan 2018 12:35 pm"
            eventDescriptionHeading = "Consectetur adipisicing elit, sed do eiusmod "
            eventDescription = " Funny things is when you  string all of these phrases together into a sentense, and multiple sentenses to form a paragraph."
            likes = "12"
            chats = "4"
            ButtonText = "View Full"
            eventImage = {require('../../img/rest.png')}
            onPress = {() => this._handlePress() }
          />
        </Content>
      </Container>
    );
  }
} 
