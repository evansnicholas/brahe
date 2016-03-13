/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  ListView,
  TextInput,
  AsyncStorage
} from 'react-native';
import TodoItem from "./components/TodoItem";

const STORAGEKEY = "@Brahe:Data"

class Brahe extends Component {
  constructor(props) {
    super(props);
    this.todoItems = [];
    this.addData = this.addData.bind(this);
    this.loadInitialState = this.loadInitialState.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.removeData = this.removeData.bind(this);
    this.saveState = this.saveState.bind(this);

    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.todoItems)
    };

  }

  loadInitialState() {
      var value = AsyncStorage.getItem(STORAGEKEY);
      return value.then(value => {
        if (value) {
          let parsed = JSON.parse(value);
          this.todoItems = parsed.todoItems;
          this.setState({dataSource: this.state.dataSource.cloneWithRows(this.todoItems)});
        }
      });
  }

  componentDidMount() {
    //AsyncStorage.removeItem(STORAGEKEY);
    this.loadInitialState().done();
  }

  componentWillUnmount() {
    saveState();
  }

  saveState() {
    AsyncStorage.setItem(STORAGEKEY, JSON.stringify({todoItems: this.todoItems}));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          {this.state.value}
        </Text>
        <TextInput style={styles.input}
          onChangeText={(text) => this.setState({text: text})}
          onSubmitEditing={() => this.addData(this.state.text)}
          value={this.state.text}
        />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
      </View>
    );
  }

  renderRow(rowData, sectionIdx, rowIdx) {
    return (
      <TodoItem rowData={rowData}
        removeItem={this.removeData.bind(null, rowIdx)}/>
      );
  }

  addData(text) {
    this.todoItems.push({text: text});
    this.saveState();
    this.setState({
      text: "",
      dataSource: this.state.dataSource.cloneWithRows(this.todoItems)
    });
  }

  removeData(rowId) {
    this.todoItems = this.todoItems.filter((item, idx) => {
      return (idx !== Number(rowId));
    });
    this.saveState();
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.todoItems)
    });
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Brahe', () => Brahe);
