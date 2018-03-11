import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { CardSection } from './common';

const styles = {
	titleStyle :{
		fontSize : 18,
		paddingLeft : 15
	}
}

class ListItem extends Component {

	renderDescription(){
		const { library, selectedlibraryId } = this.props;

		if(library.id == selectedlibraryId)
		{
			return (<Text>{library.description}</Text>);
		}
	}

	render(){
		const { titleStyle } = styles;
		const { id, title } = this.props.library;
		return (	
			<TouchableWithoutFeedback 
				onPress ={() => this.props.selectLibrary(id) }>	
				<View>
					<CardSection>
							<Text style={titleStyle}>{this.props.library.title}</Text>
					</CardSection>
					{ this.renderDescription() }
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		selectedLibraryId : state.selectedlibraryId
	}
};

export default connect(mapStateToProps,actions) (ListItem);