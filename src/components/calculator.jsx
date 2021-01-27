import React from 'react';
import '../public/styles/calculator.css';
import Dropdown from './helpers/dropdown.jsx';
import Spinner from './helpers/spinner.jsx';
import { storageService } from '../services/storageService.js';
import { getRaceFuel } from '../services/fuelCalculator.js';
import { openBrowserPage } from '../utils/commonUtils.js'

export default class Calculator extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            tracks: [],
            selectedTrack: null,
            selectedCar: null,
            fuelConsumption: null,
            hotlapTime: null,
            isLoading: true,
            raceTime: 20,
            warmupLap: false,
            fuelPerRace: 0,
        };


    }

    componentDidMount() {
        storageService.getTrackData((tracks) => {
            const selectedTrack = tracks[0];
            const selectedCar = selectedTrack.cars[0];
            this.setState({
                tracks: tracks,
                isLoading: false,
                selectedTrack,
                selectedCar,
                fuelConsumption: selectedCar.fuelConsumption,
                hotlapTime: selectedTrack.hotlapTimeSeconds,
            }, () => this.calculateFuel())
        })
    }

    calculateFuel = () => {
        const fuel = getRaceFuel(
            this.state.hotlapTime,
            this.state.fuelConsumption,
            this.state.raceTime,
            this.state.warmupLap)
        this.setState({
            fuelPerRace: fuel
        })
    }

    openHotlap = () => {
        const url = `https://www.youtube.com/results?search_query=acc+hotlap+setup+
        ${this.state.selectedCar.name}+${this.state.selectedTrack.name}`;        
        openBrowserPage(url)
    }

    handleTrackChange = (track) => {
        const car = track.cars.find((c) => c.name === this.state.selectedCar.name);
        this.setState({
            selectedTrack: track,
            selectedCar: car,
            hotlapTime: track.hotlapTimeSeconds,
            fuelConsumption: car.fuelConsumption,
        }, () => this.calculateFuel())
    }

    handleCarChange = (car) => {
        this.setState({
            selectedCar: car,
            fuelConsumption: car.fuelConsumption,            
        }, () => this.calculateFuel())
    }

    handleTextInput = (value, prop) => {
        const state = this.state;
        if (value.toString().length < 10) {
            state[prop] = value;
            this.setState(state, () => this.calculateFuel());

            if (prop === 'fuelConsumption') {
                const track = this.state.tracks.find(t => t.name === this.state.selectedTrack.name);
                const car = track.cars.find(c => c.name === this.state.selectedCar.name);
                car.fuelConsumption = value;
                storageService.updateTrackData(this.state.tracks);
            }
        }

    }

    render() {
        return (

            <div className="container">
                {!this.state.isLoading ?
                    <div >
                        <div className="control-container">
                            <div className="dropdown-header">Track: </div>
                            <div className="control">
                                <Dropdown
                                    items={this.state.tracks}
                                    displayFunc={(track) => track.name}
                                    value={this.state.selectedTrack}
                                    onChange={this.handleTrackChange}
                                />
                            </div>
                        </div>
                        <div className="control-container">
                            <div className="dropdown-header">Car: </div>
                            <div className="control">
                                <Dropdown
                                    items={this.state.selectedTrack.cars}
                                    displayFunc={(car) => car.name}
                                    value={this.state.selectedCar}
                                    onChange={this.handleCarChange}
                                />
                            </div>
                        </div>
                        <button className="open-hotlap-button" onClick={this.openHotlap}>
                            Open hot lap
                        </button>

                        <hr />
                        <div className="control-container">
                            <div className="dropdown-header">Fuel per lap: </div>
                            <div className="control">
                                <input spellCheck="false" value={this.state.fuelConsumption} step={0.1}
                                    onChange={(e) => this.handleTextInput(e.target.value, 'fuelConsumption')}
                                    className="text-input" type="number"></input>
                            </div>
                        </div>

                        <div className="control-container">
                            <div className="dropdown-header">Hotlap time: (seconds) </div>
                            <input spellCheck="false" value={this.state.hotlapTime} step={0.1}
                                onChange={(e) => this.handleTextInput(e.target.value, 'hotlapTime')}
                                className="text-input" type="number"></input>
                        </div>
                        <div className="control-container">
                            <div className="dropdown-header"> Race time: (minutes) </div>
                            <input spellCheck="false" value={this.state.raceTime}
                                onChange={(e) => this.handleTextInput(e.target.value, 'raceTime')}
                                className="text-input" type="number"></input>
                        </div>
                        <div className="control-container">
                            <div className="dropdown-header" > Warm-up lap: </div>
                            <input spellCheck="false" value={this.state.warmupLap} style={{ height: '30px', marginRight: '10px' }}
                                onChange={(e) => this.handleTextInput(!this.state.warmupLap, 'warmupLap')}
                                className="text-input" type="checkbox"></input>
                        </div>
                        <hr />
                        <div className="control-container" >
                            <div className="dropdown-header" > Race fuel: </div>
                            <div style={{ width: 152 }}
                                className="final-fuel" type="checkbox"> {this.state.fuelPerRace} </div>
                        </div>
                    </div> :
                    <Spinner isLoading={this.state.isLoading} />}

            </div>
        )
    }
}
