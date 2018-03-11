import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Container, Tabs, Tab, Header,Left, Body, Right, Button, Title, Drawer,Content,  } from 'native-base';
import All from './All';
import Latest from './Latest';
import Hots from './Hots';
import { InnerHeader } from '../common';
import SideBar from '../SideBar';
import EventDescriptioncard from './EventDescriptioncard';

export default class EventDescription  extends Component {

  closeDrawer() {
        this._drawer._root.close()
      }
    openDrawer() {
       this._drawer._root.open()
    }

  render() {

    return (
       <Container style={{backgroundColor : '#34b9b8' }}>
              <Content>
                    <EventDescriptioncard 
                      avatarImage = {require('../../img/avatar.png')}
                      eventHeading = "Jesika Alba"
                      locationText = " California United States"
                      eventDescriptionHeading = "Consectetur adipisicing elit, sed do eiusmod "
                      eventDescription = "Funny things is when you  string all of these phrases 
                                          together into a sentense, and multiple sentenses to form a paragraph. 
                                          Funny things is when you  string all of these phrases together
                                          into a sentense, and multiple sentenses to form a paragraph. Funny things
                                          is when you  string all of these phrases together into a sentense,
                                          and multiple sentenses to form a paragraph."
                      likes = "12"
                      chats = "4"
                      ButtonText = "View Full"
                      eventImage = {require('../../img/new.jpg')}
                      onPress = {() => {} }
                    />
              </Content>
      </Container>
    );
  }
} 
