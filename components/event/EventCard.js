import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Header, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Tabs, Tab } from 'native-base';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const styles = {

  cardImage : {height : 200, width : null,  alignSelf : 'stretch'},
  headingStyle  : { color : '#34b9b8', fontSize : 13},
  subHeaderStyle : { fontSize : 9, color : 'gray'},
  viewFullStyle : { height : 25, borderRadius : 20, backgroundColor : '#34b9b8',marginTop : 10 },
  viewTextStyle : { fontSize : 10},
  likesStyle  : { color : 'gray', fontSize : 12,position : 'absolute'},
  commentStyle : { color : 'gray', fontSize : 12, position : 'absolute', marginLeft : 10},
  timeTextStyle : {fontSize : 10, color : 'gray'},
  eventHeadingText : { fontSize : 13, color : 'gray', fontWeight : 'bold', paddingTop : 5 },
  eventHeadingSubHeadingText : { fontSize : 10, color : 'gray', marginLeft :4 },
  commentButtonStyle  : { paddingLeft : 10}
}

const EventCard = ({ avatarImage, eventHeading,locationText, eventTime, eventImage, eventDescriptionHeading, eventDescription, likes, chats, onPressButton, ButtonText  }) => {

    const { cardImage,
       headingStyle,
       subHeaderStyle,
       viewFullStyle,
       likesStyle,
       commentStyle,viewTextStyle,
       likesButtonStyle,
       commentButtonStyle,
       eventHeadingText,
       eventHeadingSubHeadingText,
       timeTextStyle
    } = styles;

    return (
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={avatarImage} />
                <Body>
                  <Text style={headingStyle}>{eventHeading}</Text>
                    <Text style={subHeaderStyle}><MaterialIcons name="location-on" /> {locationText}</Text>
                </Body>
              </Left>
               <Right>
                    <Text style={timeTextStyle}>{eventTime}</Text>
                  </Right>
            </CardItem>
            <CardItem>
              <Body>
                <Image source={eventImage} style={cardImage}/>
                <Text style={eventHeadingText}> {eventDescriptionHeading} </Text>
                <Text style={eventHeadingSubHeadingText}> {eventDescription}
                 </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent style={ likesButtonStyle}>
                  <SimpleLineIcons  name="heart" />
                  <Text style={likesStyle}>{likes}</Text>
                </Button>

                <Button transparent style={ commentButtonStyle }>
                  <SimpleLineIcons name="bubble" />
                  <Text style={commentStyle}>{chats}</Text>
                </Button>
              </Left>
              <TouchableOpacity onPress = {onPressButton} >
                 <Button style={viewFullStyle}>
                    <Text style={viewTextStyle}>{ButtonText}</Text>
                  </Button>
              </TouchableOpacity>
            </CardItem>
          </Card>
    );
};
export default EventCard; 
