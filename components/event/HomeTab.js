import React, { Component } from 'react';
import { Container, Header, Content, Tab, Tabs, Button, Left, Icon, Body, Right, Title } from 'native-base';
import { Text } from 'react-native';
import All from './All';
import Latest from './Latest';
import Hots from './Hots';

export default class HomeTab extends Component {
	render(){
		return(
		 <Container>
	         <Header>
		        <Left>
		          <Button transparent>
		            <Icon active name="arrow-back" />
		          </Button>
		        </Left>
		        <Body >
		          <Title color='white'>Vehicles</Title>
		        </Body>
		        <Right>
		          <Button transparent >
		            <Icon active name="menu" />
		          </Button>
		        </Right>
			</Header>
		       <Tabs initialPage={1}>
			        <Tab heading="Tab1">
			          <Text>Tab one</Text>
			        </Tab>
			        <Tab heading="Tab2">
			          <Text>Tab two</Text>
			        </Tab>
			        <Tab heading="Tab3">
			          <Text>Tab three</Text>
			        </Tab>
			      </Tabs>
	      </Container>
		);
	}
}