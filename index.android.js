import React from "react-native";
import { Provider } from "react-redux";
import { createStore } from "redux";
import braheApp from "./reducers";
import App from "./components/App";
import { AppRegistry, Component } from "react-native";

let store = createStore(braheApp);

class Brahe extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }

}

AppRegistry.registerComponent('Brahe', () => Brahe);
