import React from 'react';
import '../public/styles/App.css';
import { ReactComponent as Close } from '../public/img/close2.svg';
import PropTypes from 'prop-types';
import { ReactComponent as Update } from '../public/img/update.svg';

const electron = window.require('electron');
const { ipcRenderer } = electron



export default class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isCloseHover: false,            
        };
    }

    minimize = () => {
        electron.remote.BrowserWindow.getFocusedWindow().minimize();
    }

    close = () => {
        electron.remote.BrowserWindow.getFocusedWindow().hide();
    }

    render() {
        return (
            <header  className="drag-header">
                {this.props.isUpdateAvailable ?
                    <div
                        onClick={() => this.props.startUpdate()}
                        className="header-button update-button"  >
                        <Update style={{paddingBottom: '5px'}} draggable="false" ></Update>
                        <div className="header-text" style={{ paddingLeft: 5, paddingTop: 2 }} > 
                            Update available
                        </div>
                    </div>
                    : null}

                <div style={{ right: 3, width: '28px', height: '28px' }}
                    onMouseEnter={() => this.setState({ isCloseHover: true })}
                    onMouseLeave={() => this.setState({ isCloseHover: false })}
                    onClick={this.close}
                    className={`header-button ${this.state.isCloseHover ? 'header-close-button-hover' : ''}`}>
                    <Close draggable="false" fill={this.state.isCloseHover ? 'white' : 'red'} style={{ margin: 7, marginLeft: 8 }} />
                </div>
            </header>
        );
    }
}

Header.propTypes = {
    isUpdateAvailable: PropTypes.bool,
    startUpdate: PropTypes.func
}
