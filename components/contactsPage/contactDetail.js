'use strict';

import React, {
  PropTypes,
  View,
  ListView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import ContactDetailBar from '../toolbar/contactDetailBar';

var Icon = require('react-native-vector-icons/Ionicons')

import { styles } from '../../styles/contactDetail';

export default class ContactDetail extends React.Component {
  constructor(){
    super();
  }
  
  _renderNumbers(data, index){
    return(
      <View key={index} style={styles.infoSegment}>
      <View style={styles.info}>
        <Text style={styles.label}>{data.label}</Text>
        <Text style={styles.number}>{data.number}</Text>
      </View>
      <View style={styles.communication}>
        <Icon name="ios-chatbubble-outline" style={{paddingRight: 15,}}size={28} color="#34AADC"/>
        <Icon name="ios-telephone-outline" size={28} color="#34AADC"/>
      </View>
      </View>
    );
  }
  
  _renderEmails(data, index){
    console.log(data);
    return(
      <View key={index} style={styles.infoSegment}>
      <View style={styles.info}>
        <Text style={styles.label}>{data.label}</Text>
        <Text style={styles.number}>{data.email}</Text>
      </View>
      <View style={styles.communication}>
        <Icon name="ios-email-outline" size={28} color="#34AADC"/>
      </View>
      </View>
    );
  }
  
  render() {
    const contact = this.props.data;
    console.log(this.props.data)
    const name = contact.givenName + " " + contact.familyName;
    return (
      <View >
        <ContactDetailBar navigator={this.props.navigator} />
        <Text style={styles.header}> {name} </Text>
        <Text style={styles.infoLabel}>Phones</Text>
        {contact.phoneNumbers.map((index,data) => this._renderNumbers(index,data) )}
        <Text style={styles.infoLabel}>Emails</Text>
        {contact.emailAddresses.map((index,data) => this._renderEmails(index,data) )}
      </View>
    );
  }
}
