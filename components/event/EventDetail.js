import React from 'react';
import { Text, View, Image, Linking } from 'react-native';
import { Card, CardSection, Button } from '../common';

const  styles = {

	headerContentStyle : {
			flexDirection : 'column',
			justifyContent : 'space-around'
		},
		thumbnailContainerStyle : {
			justifyContent : 'center',
			alignItems : 'center',
			marginLeft : 10,
			marginRight : 10,
		},
		ImageContentStyle : {
			flex : 1, 
			width : null,
			height : 250
		},
		headerTextStyle : {
			fontSize : 18
		},
		imageContentStyle : {
			width : 50,
			height : 50
		}

};

const EventDetail = ({record}) => {

	const { title, artist,thumbnail_image,image, url } = record; 
	const { headerContentStyle , imageContentStyle, thumbnailContainerStyle, headerTextStyle, ImageContentStyle } = styles;

	return (
			<Card>
				<CardSection>
					<View style={thumbnailContainerStyle}>
						<Image style={imageContentStyle} source = {{ uri : thumbnail_image }} />
					</View>
					<View style={headerContentStyle}>
						 <Text style={headerTextStyle} >{title}</Text>
						 <Text>{artist} </Text>
					</View>
				</CardSection>
				<CardSection>
					<Image style={ImageContentStyle} source = {{uri : image}} />
				</CardSection>
				<CardSection>
					<Button onPress = { () => Linking.openURL(url)} > 
						Click on Event! 
					</Button>
				</CardSection>
			</Card>
		);
}

export default EventDetail;