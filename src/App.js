import './public/styles/App.css';
import Calculator from './components/calculator';
import Header from './components/header';
import React from 'react';

const electron = window.require('electron');
const { ipcRenderer } = electron;


class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isUpdateAvailable: false
    }

    ipcRenderer.on('update-available', (event) => {
      console.log('receive update available event')
      this.setState({ isUpdateAvailable: true })
  })
  }

  render() {
    return (
      <div className="App">
        <Header
          isUpdateAvailable={this.state.isUpdateAvailable} />
        <Calculator></Calculator>
      </div>
    );
  }
}


export default App;
