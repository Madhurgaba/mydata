import React, { Component } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
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
  eventHeadingText : { fontSize : 14, color : 'gray', fontWeight : 'bold', paddingLeft : 10 },
  eventHeadingSubHeadingText : { fontSize : 12, color : 'gray' },
  commentButtonStyle  : { paddingLeft : 10},
  monthStyle : { backgroundColor : '#fff', color : '#34b9b8', fontSize : 11, textAlign : 'center'},
  dayStyle : { color : '#fff',fontSize : 12, fontWeight : 'bold', textAlign : 'center'},
  dateStyle : {backgroundColor : '#34b9b8', width : 35, margin : 2, borderWidth : 1, borderColor : '#34b9b8'}, 
  HeaderDateStyle : {flex : 1, flexDirection : 'row', justifyContent : 'space-around', paddingTop : 5 },
  newCardTextStyle : { color : 'gray', fontSize : 13, padding : 4},
  newCardOuterStyle : {borderTopWidth : 3, borderColor : '#34b9b8', backgroundColor : '#ecf0f1'}
}

const EventDescriptioncard = ({ avatarImage, eventHeading,locationText, eventTime, eventImage, eventDescriptionHeading, eventDescription, likes, chats, onPressButton, ButtonText  }) => {

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
       timeTextStyle,
       monthStyle,
       dayStyle,
       dateStyle,
       HeaderDateStyle,
       newCardTextStyle,
       newCardOuterStyle
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
                  <View style={HeaderDateStyle}>
                      <View style={dateStyle}>
                            <Text style={monthStyle}>Mar</Text>
                          <Text style={dayStyle}>08</Text>
                       </View>
                       <View>
                            <Text style={eventHeadingText}> {eventDescriptionHeading} </Text>
                        </View>
                    </View>
                    <Text style={eventHeadingSubHeadingText}> {eventDescription}</Text>
                </Body>
            </CardItem>

            <CardItem style={{marginTop : -15}}>
                 <Card>
                  <CardItem style={newCardOuterStyle}>
                    <Body>
                      <Text style={newCardTextStyle}><SimpleLineIcons color='gray' size={14} name="clock" /> 01 : 00 PM - 08 : 00 PM </Text>
                      <Text style={newCardTextStyle}><SimpleLineIcons color='gray' size={14} name="location-pin" /> Baylis Park, Crestline, CA, United States</Text>
                    </Body>
                  </CardItem>
                </Card>
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
export default EventDescriptioncard; 
