import React from 'react';
import { StyleSheet, View, Text } from "react-native";

// const App = () => (
//   <View style={styles.container}>
//     <Text>
//       {this.state.value}
//     </Text>
//     <TextInput style={styles.input}
//       onChangeText={(text) => this.setState({text: text})}
//       onSubmitEditing={() => this.addData(this.state.text)}
//       value={this.state.text}
//     />
//     <ListView
//       dataSource={this.state.dataSource}
//       renderRow={this.renderRow}
//     />
//   </View>
// )

const App = () => (
  <View style={styles.container}>
    <Text>
      "Hello!"
    </Text>
  </View>
)

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
  }
});



export default App
