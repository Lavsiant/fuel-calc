import React from 'react';
import '../public/styles/App.css';
import { ReactComponent as Close } from '../public/img/close2.svg';

const electron = window.require('electron');

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
        electron.remote.BrowserWindow.getFocusedWindow().close();
    }

    render() {
        return (
            <header  className="drag-header">
                <div ></div>
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