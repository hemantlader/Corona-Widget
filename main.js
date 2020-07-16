console.log('main.js')

const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const url = require('url')

let win

function createWindow() {
    win = new BrowserWindow({
            height: 150,
            width: 350,
            title: 'Corona Widget by Hemant',
            frame: false,
            show: false,
            // maxWidth: 470,
            // maxHeight: 250,
            titleBarStyle: 'customButtonsOnHover',
            alwaysOnTop: true,
            opacity: 1,
            webPreferences: {
                nodeIntegration: true
            }
        })
        // let mainSession = win.webContents.session;

    win.loadURL(url.format({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file',
            slashes: true
        }))
        // mainSession.cookies.set({ url: "https://covidcounter.com", name: "covidcounter", value = 'state_value', domain: "covidcounter" }, (error) => {
        //     console.log("Cookis set");

    // })
    win.on('ready-to-show', () => {
        win.show()
    })
    win.on('closed', () => {
        win = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win == null)
        createWindow()
})