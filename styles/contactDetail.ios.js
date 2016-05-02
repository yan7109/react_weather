import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
    fontFamily: 'Helvetica Neue',
    fontSize: 20,
    alignSelf: 'center',
    paddingTop: 20,
  },
  infoSegment:{
    marginLeft: 15,
    marginRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#8E8E93',
  },
  infoLabel: {
    marginLeft: 15,
    paddingTop: 10,
    fontWeight: 'bold',
    fontFamily: 'Helvetica Neue',
    fontSize: 16,
    color: '#8E8E93',
  },
  info:{
    paddingBottom: 10,
    paddingTop: 10,
  },
  label:{
    color: '#34AADC'
  },
  number:{
    fontSize: 16,
  },
  communication:{
    flexDirection: 'row',
    paddingTop: 15,
  }
})