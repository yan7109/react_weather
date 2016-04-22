'use strict';

import React, {
  PropTypes,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ListView,
  StatusBar,
} from 'react-native';

import Detail from './detail';
import { styles } from '../styles/weatherDetail';
import { setData } from '../js/storage';
import { fetchWeatherForrecast } from '../js/fetchData';

var Icon = require('react-native-vector-icons/Ionicons')

export default class WeatherDetail extends React.Component {
  constructor(){
    super()
    this.state = {
      favorite: false,
      region: null,
      route: 'map',
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
    }
    this._changeDetail = this._changeDetail.bind(this)
    this._onBack = this._onBack.bind(this)
    this._toggleFavorite = this._toggleFavorite.bind(this)
  }
  componentDidMount(){
    let list = []
    fetchWeatherForrecast(this.props.header.searchString)
    .then(
      (data) =>  {      
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(data),
        region: {
          longitude: data[0].longitude,
          latitude: data[0].latitude,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }
      })
    })
    .catch( error => console.log("Error when fetching weather: ", error))
    
  }
  _changeDetail(){
    if(this.state.route === 'map'){
      this.setState({route: 'graph'})  
    }
    else{
      this.setState({route: 'map'})
    }
    //console.log(this.state.route)
  }
  _renderRow(rowData){
    return(
      <View style={styles.rowView}> 
        <Text style={styles.rowText}>{rowData.description}</Text>
        <View style={{flexDirection: 'row'}}>
        <Text style={styles.rowText}>{rowData.temp}°c</Text>
        <View style={{paddingTop: 12, paddingRight:20,flexDirection: 'column', justifyContent:'center'}}>
          <Text style={{fontSize: 12, color: '#1F1F21'}}>max: {rowData.temp_max}°</Text>
          <Text style={{fontSize: 12, color: '#1F1F21'}}>min: {rowData.temp_min}°</Text>
        </View>
        </View>
      </View>
    );
  }
  _onBack(){
    this.props.navigator.pop({id: 'detail'})
  }
  _toggleFavorite(){
    this.setState({favorite: !this.state.favorite})
    if(this.state.favorite){
      console.log("Setting data")
      setData("favorites", '["Stockholm,SE", "Madrid,ES", "New York,US"]')
    }
  }
  render() {
    let switchIcon, starIcon;
    this.state.route === 'map' ? switchIcon = "ios-pulse-strong" : switchIcon = "ios-navigate"
    this.state.favorite ? starIcon = "ios-star" : starIcon = "ios-star-outline"
    return (
      <View style={styles.container}>
        <View style={styles.info}>
          <Detail route={this.state.route} region={this.state.region}/>
          <TouchableOpacity style={styles.switchMode} onPress={this._changeDetail}>
            <Icon style={styles.backBtn} name={switchIcon} size={25}/>
          </TouchableOpacity>
        </View>
        <View style={styles.list}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
          />
        </View>
        <View style={styles.overlay}>
          <TouchableOpacity onPress={this._onBack}>
            <Icon style={styles.backBtn} name="ios-arrow-left" size={30} color="blue"/>
          </TouchableOpacity>
          <Text style={{padding:10, fontSize:20}}>{this.props.header.name}</Text>
          <TouchableOpacity onPress={this._toggleFavorite}>
            <Icon style={styles.backBtn} name={starIcon} size={25} color="blue"/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}


