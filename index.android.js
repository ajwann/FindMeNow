/* eslint no-console: 0 */
'use strict';


var React = require('react');
var ReactNative = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = ReactNative;

exports.framework = 'React';
exports.title = 'FindMeNow';
exports.description = 'Find details about your current location.';

exports.examples = [
{
  title: 'navigator.geolocation',
  render: function(): React.Element<any> {
    return <FindMeNow />;
  },
}
];

class FindMeNow extends React.Component {
  state = {
    initialPosition: 'unknown',
    lastPosition: 'unknown',
  };

  watchID: ?number = null;

           componentDidMount() {
             navigator.geolocation.getCurrentPosition(
                 (position) => {
                   var initialPosition = JSON.stringify(position);
                   this.setState({initialPosition});
                 },
                 (error) => alert(JSON.stringify(error)),
                 {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
                 );
             this.watchID = navigator.geolocation.watchPosition((position) => {
               var lastPosition = JSON.stringify(position);
               this.setState({lastPosition});
             });
           }

           componentWillUnmount() {
             navigator.geolocation.clearWatch(this.watchID);
           }

           render() {
             return (
                 <View>
                 <Text>
                 <Text style={styles.title}>Initial position: </Text>
                 {this.state.initialPosition}
                 </Text>
                 <Text>
                 <Text style={styles.title}>Current position: </Text>
                 {this.state.lastPosition}
                 </Text>
                 </View>
                 );
           }
}

var styles = StyleSheet.create({
  title: {
    fontWeight: '500',
  },
});

AppRegistry.registerComponent('FindMeNow', () => FindMeNow);
