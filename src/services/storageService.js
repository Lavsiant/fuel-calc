
import { tracks } from '../store/trackData.js'

var remote = window.require('electron').remote;
const storage = remote.require('electron-json-storage');

const storageName = 'trackData';

export const storageService = {  
    updateTrackData,
    getTrackData
}

function getTrackData(callback) {
    const trackList =tracks;
    return storage.get(storageName, (error, data) => {
        if (!data || !data.length) {
            updateTrackData(trackList);
        }
        if (callback) {
            callback(!data || !data.length ? trackList : data);
        }      
    })
}

function updateTrackData(trackList) {
    storage.set(storageName, trackList);
}