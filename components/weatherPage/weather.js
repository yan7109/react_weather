'use strict';

import React, {
  Component,
  StyleSheet,
  View,
  ListView,
  Modal,
  Text,
} from 'react-native';

// function for fetching weather
import { fetchWeather } from '../../js/fetchData';

// Child Components
import SearchBar from '../toolbar/searchBar';
import SearchResult from '../searchResult';
import CurrentLocationBox from './currentLocationBox';
import Profile from '../profile';


// Data structures
const location = {
  name: null,
  country: null,
  description: null,
  icon: null,
  temp: null,
  pressure: null,
  humidity: null,
  temp_min: null,
  temp_max: null
};

var watchID: number;

export default class Weather extends Component {

  constructor(props){
    super(props);
    this.state = ({
      location: location,
      list: [],
      listLength: 0,
      animated: true,
      modalVisible: false,
      transparent: true,
    });
    this._fetchWeather = this._fetchWeather.bind(this);
    this._getCurrentLocation = this._getCurrentLocation.bind(this);
    this._setList = this._setList.bind(this);
    this._resetList = this._resetList.bind(this);
    this._setModalVisible = this._setModalVisible.bind(this);
    this._onLogout = this._onLogout.bind(this);
  };

  _getCurrentLocation(){
      return new Promise(function(resolve, reject){
        if ("geolocation" in navigator) {
            /* geolocation is available */
          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve(position.coords);
            },
            /*Error if you use this variant of the function on Android*/
            //(error) => alert(error),
            //{enableHighAccuracy: true, maximumAge:30000, timeout:27000}*/
          );
        } else {
          /* geolocation IS NOT available */
          reject(Error("geolocation IS NOT available"));
        }
      });
  }

  _setList(list){
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({list: ds.cloneWithRows(list), listLength: list.length});
  }

  _resetList(){
    this.setState({list: [], listLength: 0});
  }

  _fetchWeather(city: string, coords: Object){
    var _this = this;
    fetchWeather(city, coords)
    .then((response) => {
      // Show this data in a list
      let location = response[0];
      _this.setState({location:location})
    })
    .catch((error) => {
      alert("Unable to retrive weather");
      console.log("Fetch Weather", error);
    });
  }

  componentDidMount() {
    //console.log("componentDidMount");
    // Fetch weather for current location before rendering this Screen
    var _this = this;
    this._getCurrentLocation()
      .then((response) => {
        _this._fetchWeather(null, response);
    }).catch((error) => {
        console.log("Get current Location", error);
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(watchID);
  }
  _setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  _onLogout(){
    console.log("logout!")
    this.setState({modalVisible: false});
    this.props.AppNavigator.replace({id: 'login'})
  }
  render() {
    let output;
    this.state.listLength >= 1 ?
    output = <SearchResult data={this.state.list} resetList={this._resetList} navigator={this.props.navigator}/> :
    output = <CurrentLocationBox navigator={this.props.navigator}
          location={this.state.location}
          />;
    return (
      <View
        style={{flex:1}}>
        <SearchBar showProfile={() => this._setModalVisible(true)} setList={this._setList} resetList={this._resetList}
        toggleDrawer={this.props.toggleDrawer}/>
        { output }
        <Modal
          animated={this.state.animated}
          transparent={this.state.transparent}
          visible={this.state.modalVisible}
          onRequestClose={() => {this._setModalVisible(false)}}>
          <Profile onLogout={() => this._onLogout} onClose={() => this._setModalVisible(false)}/>
        </Modal>
      </View>
    );
  }
}
