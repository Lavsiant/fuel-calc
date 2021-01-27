const { shell } = window.require('electron').remote;


export function openBrowserPage(url) {
    if (!url.startsWith('https://') && !url.startsWith('http://')) {
        url = 'https://' + url
    }
    shell.openExternal(url);
}



