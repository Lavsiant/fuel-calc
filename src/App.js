import './public/styles/App.css';
import Calculator from './components/calculator';
import Header from './components/header';
import React from 'react';
import Spinner from './components/helpers/spinner';

const electron = window.require('electron');
const { ipcRenderer } = electron;


class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isUpdateAvailable: false,
      isDownloading: false,
    }

    ipcRenderer.on('update-available', (event) => {
      console.log('receive update available event')
      this.setState({ isUpdateAvailable: true })
    });
  }

  startUpdate = () => {
    this.setState({ isDownloading: true });
    ipcRenderer.send('update-download');
  }

  render() {
    return (
      <div className="App">
        <Header
          isUpdateAvailable={this.state.isUpdateAvailable}
          startUpdate={this.startUpdate} />
        <Calculator />
        {this.state.isDownloading ?
          <Spinner isLoading={this.state.isDownloading} /> : null }



      </div>
    );
  }
}


export default App;
