import React, { Component } from 'react';
import { AppRegistry, Platform, Alert, Keyboard, NativeModules } from 'react-native';
import { setPlatform } from './redux/actions/device';
import { Provider } from 'react-redux';
import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';
import configureStore from './redux/configureStore';
import Splash from './scenes/splash';
import ProfileScene from './scenes/profile/profileScene';
import DashboardScene from './scenes/dashboard/dashboardScene';
import MoreDetailsScene from './scenes/profile/moreDetailsScene';
import ProfileEditScene from './scenes/profile/profileEditScene';
import ProfileViewScene from './scenes/profile/profileViewScene';
import ProfileTestScene from './scenes/profile/profileTestScene';
import ClientCreateScene from './scenes/client/clientCreateScene';
import ContinuumTestScene from './scenes/client/continuumTestScene';
import SimpleTestScene from './scenes/client/simpleTestScene';
import ClientListScene from './scenes/client/clientListScene';
import ClientViewScene from './scenes/client/clientViewScene';
import ClientDetailedHelpScene from './scenes/client/clientDetailedHelpScene';
import ClientInformationScene from './scenes/client/clientInformationScene';
import ClientAnalysisScene from './scenes/client/clientAnalysisScene';
import FactorTestScene from './scenes/client/factorTestScene';
import MeetingListScene from './scenes/client/meetingListScene';
import PeopleTypesScene from './scenes/PeopleTypesScene';
import MeetingCreateScene from './scenes/client/meetingCreateScene';
import SelectStageScene from './scenes/selectStageScene';
import ContactUsScene from './scenes/contact/contactUsScene';
import NoteScene from './scenes/client/noteScene';
import CompareScene from './scenes/compareScene';
import compareNotesScene from './scenes/compareNotesScene';
import RecommendationsListScene from './scenes/salesManagment/recommendationsListScene';
import SalesManagementStageScene from './scenes/salesManagment/salesManagementStageScene';
import EditRecommendationScene from './scenes/salesManagment/editRecommendationScene';
import SettingsScene from './scenes/settings/settingsScene';
import deviceInfo from './app/deviceInfo';
import NavBar from './components/NavBar/NavBar';
import strings from './app/strings';
import Drawer from './components/Drawer/Drawer';
import { setEmailMessage } from './redux/actions/email';
import { pushScene, removeLastScenes } from './redux/actions/history';
import { clearClient, refreshClientList } from './redux/actions/client';
import { clearMeeting, refreshMeetingList } from './redux/actions/meeting';
import { setRecommendationId } from './redux/actions/sales';
import superBack from './app/superBack';
import * as meetingProvider from './storage/meetingNote';
import * as clientProvider from './storage/client';
import * as saleStagesProvider from './storage/salesStage';
import * as recommendationProvider from './storage/recommendaton';

const Mailer = NativeModules.RNMail;

const CONTACT_EMAIL = 'info@sixfactor.com';

export default function platform(os) {

  class App extends Component {

    _onBackPressed = () => {
      Keyboard.dismiss();
      return superBack(this.store);
    };

    _onDeleteClientPressed = () => {
      const store = this.store;
      Alert.alert(
        '',
        'Remove the client ' + store.getState().client.name + '?',
        [
          { text: strings.cancel, onPress: () => {}, style: 'cancel' },
          { text: strings.ok, onPress: () => {
            const clientId = store.getState().client.id;
            clientProvider.deleteClient(clientId)
              .then((success) => {
                if (success) {
                  meetingProvider.unlinkClientMeetings(clientId)
                    .then(() => {
                      store.dispatch(clearClient());
                      store.dispatch(refreshClientList());
                      Actions.clientListScene();
                    });
                }
              });
          } },
        ],
        { cancelable: false }
      );
    };

    _onDeleteMeetingPressed = () => {
      const store = this.store;
      Alert.alert(
        '',
        'Remove the meeting?',
        [
          { text: strings.cancel, onPress: () => {}, style: 'cancel' },
          { text: strings.ok, onPress: () => {
            const meetingId = store.getState().meeting.id;
            meetingProvider.deleteMeeting(meetingId)
              .then(() => {
                store.dispatch(clearMeeting());
                store.dispatch(refreshMeetingList());
                store.dispatch(removeLastScenes(2));
                Actions.meetingListScene();
              });
          } },
        ],
        { cancelable: false }
      );
    };

    _onDeleteRecommendationPressed = () => {
      const store = this.store;
      Alert.alert(
        '',
        'Remove the recommendation?',
        [
          { text: strings.cancel, onPress: () => {}, style: 'cancel' },
          { text: strings.ok, onPress: () => {
            const recommendationId = store.getState().sales.recommendationId;
            saleStagesProvider.removeSalesStageRecommendation(
              store.getState().sales.stageId,
              recommendationId
            ).then(() => {
              return recommendationProvider.deleteRecommendation(recommendationId)
                .then(() => {
                  superBack(store);
                });
            });
          } },
        ],
        { cancelable: false }
      );
    };

    render() {
      const store = configureStore();
      this.store = store;
      store.dispatch(setPlatform(os));
      const editIco = require('./img/editIco.png');
      return (
        <Provider store={store}>
          <Router navBar={NavBar} onExitApp={this._onBackPressed}>
            <Scene key='root'>
              <Scene
                key='splash'
                hideNavBar
                initial
                component={Splash}
                type={ActionConst.REPLACE}
              />
              <Scene
                key='profileScene'
                hideNavBar
                component={ProfileScene}
                type={ActionConst.RESET}
              />
              <Scene
                  key='moreDetailsScene'
                  component={MoreDetailsScene}
                  hideNavBar={false}
                  leftButtonImage={require('./img/navBarBackIco.png')}
                  onLeft={this._onBackPressed}
                  leftButtonStyle={{ paddingLeft: 25, paddingTop: 10 }}
                  title={strings.moreDetailsTitle}
                  navigationBarStyle={{ backgroundColor: '#263238' }}
                  titleStyle={{ color: '#ffffff', fontSize: 17, fontWeight: '500' }}
                  tintColor={{ color: '#ffffff' }}
                  type={ActionConst.RESET}
                />
                <Scene
                  key='drawer'
                  component={Drawer}
                  open={false}
                  type={ActionConst.REPLACE}
                >
                <Scene
                  key='main'
                  tabs
                >
                  <Scene
                    key='dashboardScene'
                    hideNavBar={false}
                    title={strings.dashboardTitle}
                    navigationBarStyle={{ backgroundColor: '#263238' }}
                    titleStyle={{ color: '#ffffff', fontSize: 17, fontWeight: '500' }}
                    tintColor={{ color: '#ffffff' }}
                    component={DashboardScene}
                    leftButtonImage={require('./img/hamburgerIco.png')}
                    onLeft={() => {
                      Actions.refresh({ key: 'drawer', open: value => !value });
                    }}
                    leftButtonStyle={{ paddingLeft: 25, paddingTop: 10 }}
                    type={ActionConst.RESET}
                  />
                  <Scene
                    key='profileEditScene'
                    component={ProfileEditScene}
                    hideNavBar={false}
                    leftButtonImage={require('./img/navBarBackIco.png')}
                    onLeft={this._onBackPressed}
                    leftButtonStyle={{ paddingLeft: 25, paddingTop: 10 }}
                    title={strings.editSocialProfileTitle}
                    navigationBarStyle={{ backgroundColor: '#263238' }}
                    titleStyle={{ color: '#ffffff', fontSize: 17, fontWeight: '500' }}
                    tintColor={{ color: '#ffffff' }}
                    type={ActionConst.RESET}
                  />
                  <Scene
                    key='profileViewScene'
                    hideNavBar={false}
                    title={strings.mySocialProfileTitle}
                    navigationBarStyle={{ backgroundColor: '#263238' }}
                    titleStyle={{ color: '#ffffff', fontSize: 17, fontWeight: '500' }}
                    tintColor={{ color: '#ffffff' }}
                    component={ProfileViewScene}
                    leftButtonImage={require('./img/hamburgerIco.png')}
                    rightButtonImage={editIco}
                    onLeft={() => {
                      Actions.refresh({ key: 'drawer', open: value => !value });
                    }}
                    onRight={() => {
                      store.dispatch(pushScene('profileViewScene'));
                      Actions.profileEditScene();
                    }}
                    leftButtonStyle={{ paddingLeft: 25, paddingTop: 10 }}
                    rightButtonStyle={{ paddingRight: 25, paddingTop: 5 }}
                    type={ActionConst.RESET}
                  />
                  <Scene
                    key='profileTestScene'
                    component={ProfileTestScene}
                    hideNavBar={false}
                    leftButtonImage={require('./img/navBarBackIco.png')}
                    onLeft={this._onBackPressed}
                    leftButtonStyle={{ paddingLeft: 25, paddingTop: 10 }}
                    title={strings.mySocialProfileTitle}
                    navigationBarStyle={{ backgroundColor: '#263238' }}
                    titleStyle={{ color: '#ffffff', fontSize: 17, fontWeight: '500' }}
                    tintColor={{ color: '#ffffff' }}
                    type={ActionConst.RESET}
                  />
                  <Scene
                    key='contactUsSceneTab'
                    component={ContactUsScene}
                    hideNavBar={false}
                    title={strings.contactUsTitle}
                    leftButtonImage={require('./img/hamburgerIco.png')}
                    onLeft={() => {
                      Keyboard.dismiss();
                      Actions.refresh({ key: 'drawer', open: value => !value });
                    }}
                    leftButtonStyle={{ paddingLeft: 25, paddingTop: 10 }}
                    navigationBarStyle={{ backgroundColor: '#263238' }}
                    titleStyle={{ color: '#ffffff', fontSize: 17, fontWeight: '500' }}
                    tintColor={{ color: '#ffffff' }}
                    rightTitle={strings.send}
                    onRight={() => {
                      Mailer.mail({
                        subject: 'Sales negotiator',
                        recipients: [ CONTACT_EMAIL ],
                        body: store.getState().email.message + deviceInfo,
                        isHTML: false,
                      }, (error) => {
                        store.dispatch(setEmailMessage(''));
                        if (error) {
                          if (Platform.OS === 'ios') {
                            Alert.alert('Error', 'Could not send mail. Please send a mail to ' + CONTACT_EMAIL);
                          }
                        }
                      });
                      Keyboard.dismiss();
                      Actions.dashboardScene();
                    }}
                    rightButtonTextStyle={{
                      color: '#ffffff',
                      fontSize: 15,
                      fontWeight: '200',
                    }}
                    type={ActionConst.RESET}
                  />
                  <Scene
                    key='simpleTest1'
                    component={SimpleTestScene}
                    title='Simple Based Client Entry'
                    hideNavBar={false}
                    leftButtonImage={require('./img/navBarBackIco.png')}
                    leftButtonStyle={{ paddingLeft: 25, paddingTop: 10 }}
                    onLeft={this._onBackPressed}
                    navigationBarStyle={{ backgroundColor: '#263238' }}
                    titleStyle={{ color: '#ffffff', fontSize: 16, fontWeight: '500' }}
                    tintColor={{ color: '#ffffff' }}
                    step={1}
                    type={ActionConst.RESET}
                  />
                  <Scene
                    key='simpleTest2'
                    component={SimpleTestScene}
                    title='Simple Based Client Entry'
                    hideNavBar={false}
                    leftButtonImage={require('./img/navBarBackIco.png')}
                    leftButtonStyle={{ paddingLeft: 25, paddingTop: 10 }}
                    onLeft={this._onBackPressed}
                    navigationBarStyle={{ backgroundColor: '#263238' }}
                    titleStyle={{ color: '#ffffff', fontSize: 16, fontWeight: '500' }}
                    tintColor={{ color: '#ffffff' }}
                    step={2}
                    type={ActionConst.RESET}
                  />
                  <Scene
                    key='clientListScene'
                    component={ClientListScene}
                    title='Clients'
                    hideNavBar={false}
                    leftButtonImage={require('./img/hamburgerIco.png')}
                    leftButtonStyle={{ paddingLeft: 25, paddingTop: 10 }}
                    rightButtonImage={require('./img/plusIco.png')}
                    rightButtonStyle={{ paddingRight: 25, paddingTop: 5 }}
                    onLeft={() => {
                      Actions.refresh({ key: 'drawer', open: value => !value });
                    }}
                    onRight={() => {
                      store.dispatch(clearClient());
                      store.dispatch(pushScene('clientListScene'));
                      Actions.clientCreateScene();
                    }}
                    navigationBarStyle={{ backgroundColor: '#263238', borderBottomWidth: 0 }}
                    titleStyle={{ color: '#ffffff', fontSize: 16, fontWeight: '500' }}
                    tintColor={{ color: '#ffffff' }}
                    type={ActionConst.RESET}
                  />
                  <Scene
                      key='compareNotesScene'
                      component={compareNotesScene}
                      hideNavBar={false}
                      leftButtonImage={require('./img/navBarBackIco.png')}
                      onLeft={this._onBackPressed}
                      leftButtonStyle={{ paddingLeft: 25, paddingTop: 10 }}
                      title='Compare Notes'
                      navigationBarStyle={{ backgroundColor: '#263238', borderBottomWidth: 0 }}
                      titleStyle={{ color: '#ffffff', fontSize: 17, fontWeight: '500' }}
                      tintColor={{ color: '#ffffff' }}

                      rightButtonStyle={{ paddingRight: 25, paddingTop: 5 }}
                      onRight={() => {
                        Actions.compareNotesScene();
                      }}
                      type={ActionConst.RESET}
                    />
                  <Scene
                    key='clientCreateScene'
                    component={ClientCreateScene}
                    hideNavBar={false}
                    leftButtonImage={require('./img/navBarBackIco.png')}
                    onLeft={this._onBackPressed}
                    leftButtonStyle={{ paddingLeft: 25, paddingTop: 10 }}
                    title={strings.createNewClient}
                    navigationBarStyle={{ backgroundColor: '#263238' }}
                    titleStyle={{ color: '#ffffff', fontSize: 17, fontWeight: '500' }}
                    tintColor={{ color: '#ffffff' }}
                    type={ActionConst.RESET}
                  />
                  <Scene
                    key='editClientSceneTab'
                    component={ClientCreateScene}
                    hideNavBar={false}
                    leftButtonImage={require('./img/navBarBackIco.png')}
                    onLeft={this._onBackPressed}
                    leftButtonStyle={{ paddingLeft: 25, paddingTop: 10 }}
                    title={strings.editClient}
                    navigationBarStyle={{ backgroundColor: '#263238' }}
                    titleStyle={{ color: '#ffffff', fontSize: 17, fontWeight: '500' }}
                    tintColor={{ color: '#ffffff' }}
                    rightButtonImage={require('./img/deleteNavbarIco.png')}
                    onRight={this._onDeleteClientPressed}
                    rightButtonStyle={{ paddingRight: 25, paddingTop: 5 }}
                    type={ActionConst.RESET}
                  />
                  <Scene
                    key='continumTest1Tab'
                    component={ContinuumTestScene}
                    hideNavBar={false}
                    leftButtonImage={require('./img/navBarBackIco.png')}
                    onLeft={this._onBackPressed}
                    leftButtonStyle={{ paddingLeft: 25, paddingTop: 10 }}
                    title='Continuum Client Entry'
                    navigationBarStyle={{ backgroundColor: '#263238' }}
                    titleStyle={{ color: '#ffffff', fontSize: 17, fontWeight: '500' }}
                    tintColor={{ color: '#ffffff' }}
                    step={1}
                    type={ActionConst.RESET}
                  />
                  <Scene
                    key='continumTest2Tab'
                    component={ContinuumTestScene}
                    hideNavBar={false}
                    leftButtonImage={require('./img/navBarBackIco.png')}
                    onLeft={this._onBackPressed}
                    leftButtonStyle={{ paddingLeft: 25, paddingTop: 10 }}
                    title='Continuum Client Entry'
                    navigationBarStyle={{ backgroundColor: '#263238' }}
                    titleStyle={{ color: '#ffffff', fontSize: 17, fontWeight: '500' }}
                    tintColor={{ color: '#ffffff' }}
                    step={2}
                    type={ActionConst.RESET}
                  />
                  <Scene
                    key='factorTest1'
                    component={FactorTestScene}
                    hideNavBar={false}
                    leftButtonImage={require('./img/navBarBackIco.png')}
                    onLeft={this._onBackPressed}
                    leftButtonStyle={{ paddingLeft: 25, paddingTop: 10 }}
                    title='Factor Client Entry'
                    navigationBarStyle={{ backgroundColor: '#263238' }}
                    titleStyle={{ color: '#ffffff', fontSize: 17, fontWeight: '500' }}
                    tintColor={{ color: '#ffffff' }}
                    step={1}
                    type={ActionConst.RESET}
                  />
                  <Scene
                    key='factorTest2'
                    component={FactorTestScene}
                    hideNavBar={false}
                    leftButtonImage={require('./img/navBarBackIco.png')}
                    onLeft={this._onBackPressed}
                    leftButtonStyle={{ paddingLeft: 25, paddingTop: 10 }}
                    title='Factor Client Entry'
                    navigationBarStyle={{ backgroundColor: '#263238' }}
                    titleStyle={{ color: '#ffffff', fontSize: 17, fontWeight: '500' }}
                    tintColor={{ color: '#ffffff' }}
                    step={2}
                    type={ActionConst.RESET}
                  />
                  <Scene
                    key='viewClientScene'
                    component={ClientViewScene}
                    hideNavBar={false}
                    leftButtonImage={require('./img/navBarBackIco.png')}
                    onLeft={this._onBackPressed}
                    leftButtonStyle={{ paddingLeft: 25, paddingTop: 10 }}
                    title='Client'
                    navigationBarStyle={{ backgroundColor: '#263238' }}
                    titleStyle={{ color: '#ffffff', fontSize: 17, fontWeight: '500' }}
                    tintColor={{ color: '#ffffff' }}
                    rightButtonImage={editIco}
                    onRight={() => {
                      Actions.editClientSceneTab();
                    }}
                    rightButtonStyle={{ paddingRight: 25, paddingTop: 5 }}
                    type={ActionConst.RESET}
                  />
                  <Scene
                    key='ClientDetailedHelpTab'
                    component={ClientDetailedHelpScene}
                    hideNavBar={false}
                    leftButtonImage={require('./img/navBarBackIco.png')}
                    onLeft={this._onBackPressed}
                    leftButtonStyle={{ paddingLeft: 25, paddingTop: 10 }}
                    title={strings.detailedHelpTitle}
                    navigationBarStyle={{ backgroundColor: '#263238', borderBottomWidth: 0 }}
                    titleStyle={{ color: '#ffffff', fontSize: 17, fontWeight: '500' }}
                    tintColor={{ color: '#ffffff' }}
                    type={ActionConst.RESET}
                  />
                  <Scene
                    key='ClientInformationTab'
                    component={ClientInformationScene}
                    hideNavBar={false}
                    leftButtonImage={require('./img/navBarBackIco.png')}
                    onLeft={this._onBackPressed}
                    leftButtonStyle={{ paddingLeft: 25, paddingTop: 10 }}
                    title='Information'
                    navigationBarStyle={{ backgroundColor: '#263238', borderBottomWidth: 0 }}
                    titleStyle={{ color: '#ffffff', fontSize: 17, fontWeight: '500' }}
                    tintColor={{ color: '#ffffff' }}
                    rightButtonImage={editIco}
                    onRight={() => {
                      store.dispatch(pushScene('ClientInformationTab'));
                      Actions.editClientSceneTab();
                    }}
                    rightButtonStyle={{ paddingRight: 25, paddingTop: 5 }}
                    type={ActionConst.RESET}
                  />
                  <Scene
                    key='clientAnalysisScene'
                    component={ClientAnalysisScene}
                    hideNavBar={false}
                    leftButtonImage={require('./img/navBarBackIco.png')}
                    onLeft={this._onBackPressed}
                    leftButtonStyle={{ paddingLeft: 25, paddingTop: 10 }}
                    title={strings.analysis}
                    navigationBarStyle={{ backgroundColor: '#263238', borderBottomWidth: 0 }}
                    titleStyle={{ color: '#ffffff', fontSize: 17, fontWeight: '500' }}
                    tintColor={{ color: '#ffffff' }}
                    rightTitle='Compare'
                    onRight={() => {
                      store.dispatch(pushScene('clientAnalysisScene'));
                      Actions.compareScene();
                    }}
                    rightButtonTextStyle={{
                      paddingTop: 2,
                      color: '#ffffff',
                      fontSize: 15,
                      fontWeight: '200',
                    }}
                    type={ActionConst.RESET}
                  />
                  <Scene
                    key='meetingListScene'
                    component={MeetingListScene}
                    hideNavBar={false}
                    leftButtonImage={require('./img/navBarBackIco.png')}
                    onLeft={this._onBackPressed}
                    leftButtonStyle={{ paddingLeft: 25, paddingTop: 10 }}
                    title='Meeting Notes'
                    navigationBarStyle={{ backgroundColor: '#263238', borderBottomWidth: 0 }}
                    titleStyle={{ color: '#ffffff', fontSize: 17, fontWeight: '500' }}
                    tintColor={{ color: '#ffffff' }}
                    rightButtonImage={require('./img/plusIco.png')}
                    rightButtonStyle={{ paddingRight: 25, paddingTop: 5 }}
                    onRight={() => {
                      store.dispatch(clearMeeting());
                      store.dispatch(pushScene('meetingListScene'));
                      Actions.meetingCreateScene();
                    }}
                    type={ActionConst.RESET}
                  />
                  <Scene
                    key='PeopleTypesTab'
                    component={PeopleTypesScene}
                    hideNavBar={false}
                    leftButtonImage={require('./img/hamburgerIco.png')}
                    onLeft={() => {
                      Actions.refresh({ key: 'drawer', open: value => !value });
                    }}
                    leftButtonStyle={{ paddingLeft: 25, paddingTop: 10 }}
                    title='People Types'
                    navigationBarStyle={{ backgroundColor: '#263238', borderBottomWidth: 0 }}
                    titleStyle={{ color: '#ffffff', fontSize: 17, fontWeight: '500' }}
                    tintColor={{ color: '#ffffff' }}
                    type={ActionConst.RESET}
                  />
                  <Scene
                    key='meetingCreateScene'
                    component={MeetingCreateScene}
                    hideNavBar={false}
                    leftButtonImage={require('./img/navBarBackIco.png')}
                    onLeft={this._onBackPressed}
                    leftButtonStyle={{ paddingLeft: 25, paddingTop: 10 }}
                    title={strings.newNote}
                    navigationBarStyle={{ backgroundColor: '#263238', borderBottomWidth: 0 }}
                    titleStyle={{ color: '#ffffff', fontSize: 17, fontWeight: '500' }}
                    tintColor={{ color: '#ffffff' }}
                    type={ActionConst.RESET}
                  />
                  <Scene
                    key='EditNoteSceneTab'
                    component={MeetingCreateScene}
                    hideNavBar={false}
                    leftButtonImage={require('./img/navBarBackIco.png')}
                    onLeft={this._onBackPressed}
                    leftButtonStyle={{ paddingLeft: 25, paddingTop: 10 }}
                    title='Edit Note'
                    navigationBarStyle={{ backgroundColor: '#263238', borderBottomWidth: 0 }}
                    titleStyle={{ color: '#ffffff', fontSize: 17, fontWeight: '500' }}
                    tintColor={{ color: '#ffffff' }}
                    rightButtonImage={require('./img/basketIco.png')}
                    onRight={this._onDeleteMeetingPressed}
                    rightButtonStyle={{ paddingRight: 25, paddingTop: 5 }}
                    type={ActionConst.RESET}
                  />
                  <Scene
                    key='SelectStageTab'
                    component={SelectStageScene}
                    hideNavBar={false}
                    leftButtonImage={require('./img/navBarBackIco.png')}
                    onLeft={this._onBackPressed}
                    leftButtonStyle={{ paddingLeft: 25, paddingTop: 10 }}
                    title='Select Stage'
                    navigationBarStyle={{ backgroundColor: '#263238', borderBottomWidth: 0 }}
                    titleStyle={{ color: '#ffffff', fontSize: 17, fontWeight: '500' }}
                    tintColor={{ color: '#ffffff' }}
                    type={ActionConst.RESET}
                  />
                  <Scene
                    key='noteScene'
                    component={NoteScene}
                    hideNavBar={false}
                    leftButtonImage={require('./img/navBarBackIco.png')}
                    onLeft={this._onBackPressed}
                    leftButtonStyle={{ paddingLeft: 25, paddingTop: 10 }}
                    title='Meeting'
                    navigationBarStyle={{ backgroundColor: '#263238', borderBottomWidth: 0 }}
                    titleStyle={{ color: '#ffffff', fontSize: 17, fontWeight: '500' }}
                    tintColor={{ color: '#ffffff' }}
                    rightButtonImage={editIco}
                    onRight={() => {
                      store.dispatch(pushScene('noteScene'));
                      Actions.EditNoteSceneTab();
                    }}
                    rightButtonStyle={{ paddingRight: 25, paddingTop: 5 }}
                    type={ActionConst.RESET}
                  />
                  <Scene
                    key='recommendationsListScene'
                    component={RecommendationsListScene}
                    hideNavBar={false}
                    leftButtonImage={require('./img/hamburgerIco.png')}
                    onLeft={() => {
                      Actions.refresh({ key: 'drawer', open: value => !value });
                      Keyboard.dismiss();
                    }}
                    leftButtonStyle={{ paddingLeft: 25, paddingTop: 10 }}
                    title={strings.salesManagementTitle}
                    navigationBarStyle={{ backgroundColor: '#263238', borderBottomWidth: 0 }}
                    titleStyle={{ color: '#ffffff', fontSize: 17, fontWeight: '500' }}
                    tintColor={{ color: '#ffffff' }}
                    type={ActionConst.RESET}
                  />
                  <Scene
                    key='salesManagementStageScene'
                    component={SalesManagementStageScene}
                    hideNavBar={false}
                    leftButtonImage={require('./img/navBarBackIco.png')}
                    onLeft={this._onBackPressed}
                    leftButtonStyle={{ paddingLeft: 25, paddingTop: 10 }}
                    title={strings.salesManagementTitle}
                    navigationBarStyle={{ backgroundColor: '#263238', borderBottomWidth: 0 }}
                    titleStyle={{ color: '#ffffff', fontSize: 17, fontWeight: '500' }}
                    tintColor={{ color: '#ffffff' }}
                    rightButtonImage={require('./img/plusIco.png')}
                    onRight={() => {
                      let stageName = '';
                      const stageId = store.getState().sales.stageId;
                      const salesStages = store.getState().sales.salesStages;
                      if (salesStages && salesStages.length > 0) {
                        salesStages.forEach((stage, index) => {
                          if (stage.id === stageId) {
                            stageName = Platform.OS === 'ios' ? index + 1 + '. ' + stage.name : stage.name;
                          }
                        });
                      }
                      store.dispatch(setRecommendationId(-1));
                      store.dispatch(pushScene('salesManagementStageScene', { title: stageName }));
                      Actions.addRecommendationScene();
                    }}
                    rightButtonStyle={{ paddingRight: 25, paddingTop: 5 }}
                    type={ActionConst.RESET}
                  />
                  <Scene
                    key='editRecommendationScene'
                    component={EditRecommendationScene}
                    hideNavBar={false}
                    leftButtonImage={require('./img/navBarBackIco.png')}
                    onLeft={this._onBackPressed}
                    leftButtonStyle={{ paddingLeft: 25, paddingTop: 10 }}
                    title={strings.editRecommendationTitle}
                    navigationBarStyle={{ backgroundColor: '#263238', borderBottomWidth: 0 }}
                    titleStyle={{ color: '#ffffff', fontSize: 17, fontWeight: '500' }}
                    tintColor={{ color: '#ffffff' }}
                    rightButtonImage={require('./img/basketIco.png')}
                    onRight={this._onDeleteRecommendationPressed}
                    rightButtonStyle={{ paddingRight: 25, paddingTop: 5 }}
                    type={ActionConst.RESET}
                  />
                  <Scene
                    key='addRecommendationScene'
                    component={EditRecommendationScene}
                    id={-1}
                    hideNavBar={false}
                    leftButtonImage={require('./img/navBarBackIco.png')}
                    onLeft={this._onBackPressed}
                    leftButtonStyle={{ paddingLeft: 25, paddingTop: 10 }}
                    title={strings.addRecommendationTitle}
                    navigationBarStyle={{ backgroundColor: '#263238', borderBottomWidth: 0 }}
                    titleStyle={{ color: '#ffffff', fontSize: 17, fontWeight: '500' }}
                    tintColor={{ color: '#ffffff' }}
                    type={ActionConst.RESET}
                  />
                  <Scene
                    key='settingsScene'
                    component={SettingsScene}
                    hideNavBar={false}
                    leftButtonImage={require('./img/hamburgerIco.png')}
                    onLeft={() => {
                      Actions.refresh({ key: 'drawer', open: value => !value });
                      Keyboard.dismiss();
                    }}
                    leftButtonStyle={{ paddingLeft: 25, paddingTop: 10 }}
                    title={strings.settingsTitle}
                    navigationBarStyle={{ backgroundColor: '#263238', borderBottomWidth: 0 }}
                    titleStyle={{ color: '#ffffff', fontSize: 17, fontWeight: '500' }}
                    tintColor={{ color: '#ffffff' }}
                    type={ActionConst.RESET}
                  />
                  <Scene
                    key='compareScene'
                    component={CompareScene}
                    hideNavBar={false}
                    leftButtonImage={require('./img/navBarBackIco.png')}
                    onLeft={this._onBackPressed}
                    leftButtonStyle={{ paddingLeft: 25, paddingTop: 10 }}
                    title={strings.compareTitle}
                    navigationBarStyle={{ backgroundColor: '#263238', borderBottomWidth: 0 }}
                    titleStyle={{ color: '#ffffff', fontSize: 17, fontWeight: '500' }}
                    tintColor={{ color: '#ffffff' }}
                    type={ActionConst.RESET}
                  />
                </Scene>
              </Scene>
            </Scene>
          </Router>
        </Provider>
      );
    }
  }

  AppRegistry.registerComponent('sixfactor', () => App);
}
