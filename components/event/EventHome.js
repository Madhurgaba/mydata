import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Container, Tabs, Tab, Header,Left, Body, Right, Button, Title, Drawer } from 'native-base';
import All from './All';
import Latest from './Latest';
import Hots from './Hots';
import { InnerHeader } from '../common';
import SideBar from '../SideBar';

export default class EventHome  extends Component {

  closeDrawer() {
        this._drawer._root.close()
      }
    openDrawer() {
       this._drawer._root.open()
    }

  render() {

    return (
       <Container style={{backgroundColor : '#34b9b8' }}>
       <Drawer ref={(ref) => { this._drawer = ref; }} content={<SideBar navigator={this._navigator} />} onClose={() => this.closeDrawer()} >
            <InnerHeader 
                iconName = "menu"
                rightIconOne = "magnifier"
                rightEndIconTwo = "bell"
                headerTitle = "Home"
                left_icon_show
                right_icon_one_show 
                onPress = { () => this.openDrawer() }
                right_icon_end_two_show />
            <Tabs>
              <Tab heading="All">
                <All />
              </Tab>
              <Tab heading="Latest" >
                <Latest />
              </Tab>
              <Tab heading="Hots" >
                <Hots />
              </Tab>
            </Tabs>
        </Drawer>
      </Container>
    );
  }
} 
