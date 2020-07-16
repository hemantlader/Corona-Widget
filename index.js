const remote = require('electron').remote

// document.getElementById('min-btn').addEventListener('click', function (e) {
//   var window = remote.getCurrentWindow()
//   window.minimize()
// })

// document.getElementById('max-btn').addEventListener('click', function (e) {
//   var window = remote.getCurrentWindow()
//   if (!window.isMaximized()) {
//     window.maximize()
//   } else {
//     window.unmaximize()
//   }
// })

let closeButton = document.getElementById('close')
if (closeButton) {
    closeButton.addEventListener('click', () => {
        document.getElementById('selectedState').innerText = 'Clicked'
        var window = remote.getCurrentWindow()
        window.close()
    })
}
let isConnected = false

function checkInternet() {
    console.log(navigator.onLine)
    isConnected = navigator.onLine
}

function updateData() {
    let label = document.getElementById('selectedState')

    if (isConnected) {
        label.css({
            'color': '#3a66c5'
        })
        let stateSelect = $('#state')
        let state = stateSelect.val()

        if (state.length == 0) {
            label.text('Select State')
        } else {
            label.text(state)
            $.getJSON('https://api.covid19india.org/state_district_wise.json', (data, textStatus, jqXHR) => {
                if (textStatus == 'success') {
                    let extract = data['Chhattisgarh']
                    let disctricts = extract['districtData']
                    console.log(disctricts)
                }
            })
        }
    } else {
        label.css({
            'color': 'red'
        })
        label.text('Checck your connection')
    }
}

function populateOptions() {
    $.getJSON('https://api.covid19india.org/state_district_wise.json', (data) => {
        let stateSelect = $('#state')
        $.each(data, function(index) {
            let opt = document.createElement('option')
            opt.value = index
            opt.innerText = index
            stateSelect.append(opt)
        })
    })
}
$(document).ready(() => {

    $('#state').on('change', () => {
        checkInternet()
        updateData()
    })
    populateOptions()
    checkInternet()
    updateData()
    setInterval(checkInternet, 5000)
    setInterval(updateData, 60000)
}, false)