import React, { Component } from 'react';
import { Header,Left, Body, Right, Button, Title } from 'native-base';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const styles = {

	innerHeaderStyle : { backgroundColor : '#34b9b8'},
	HeaderBodyStyle : { flex: 1,  justifyContent: 'center', alignItems: 'center', width : 100 }

}

const InnerHeader = ({left_icon_show, iconName, headerTitle, right_icon_one_show, right_icon_end_two_show, rightIconOne, rightEndIconTwo, onPress }) => {
  
  	const { innerHeaderStyle, HeaderBodyStyle} = styles;
    return (

         <Header  hastabs style={innerHeaderStyle}>
            <Left style={{ flex: 1 }} >
                { left_icon_show &&  <Button transparent onPress={onPress}>
                		<SimpleLineIcons size= {16} color = '#fff' name={iconName} />
            		</Button>
            	}
            </Left>

            <Body style={HeaderBodyStyle}>
                <Title style={{fontWeight : '300'}}>{headerTitle}</Title>
             </Body>

            <Right style={{ flex: 1 }}>
               { right_icon_one_show &&  <Button transparent>
                		<SimpleLineIcons size= {16} color = '#fff' name={rightIconOne} />
        		</Button>
        		}
              { right_icon_end_two_show &&  <Button transparent>
                		<SimpleLineIcons size = {16} color = '#fff' name={rightEndIconTwo} />
        		</Button>
        		}
            </Right>
        </Header>
    );
} 

export { InnerHeader };