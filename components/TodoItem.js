'use strict';
import React, {
  View,
  Component,
  StyleSheet,
  Text
} from 'react-native';

export default class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.toggleHighlight = this.toggleHighlight.bind(this);
    this.resetPositionOrRemove = this.resetPositionOrRemove.bind(this);
    this.slide = this.slide.bind(this);
    this.resetState = this.resetState.bind(this);
    this.state = {
      highlight: false,
      marginLeft: 0
    }
  }

  toggleHighlight() {
    this.setState({
      highlight: !this.state.highlight,
    });
  }

  resetState() {
    this.setState({marginLeft: 0});
  }

  resetPositionOrRemove(evt) {
    const remove = evt.nativeEvent.pageX > 300;

    if (remove) {
      this.resetState();
      this.props.removeItem();
    } else {
      this.setState({
        marginLeft: 0
      });
    }
  }

  slide() {
    this.setState({marginLeft: this.state.marginLeft + 10});
  }

  render() {
    return (
      <View style={[styles.container, {
        backgroundColor: this.state.highlight ? "DarkGrey" : "#F5FCFF",
        marginLeft: this.state.marginLeft
      }]}
        onMoveShouldSetResponder={(evt) => true}
        onResponderGrant={(evt) => { this.toggleHighlight() }}
        onResponderRelease={(evt) => {
          this.toggleHighlight();
          this.resetPositionOrRemove(evt);
        }}
        onResponderMove={(evt) => { this.slide(); }}
      >
        <Text>{this.props.rowData.text}</Text>
      </View>
      );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderStyle: "solid",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    margin: 10
  },
  text: {
    textAlign: "left",
    fontFamily: "Helvetica"
  }
});
