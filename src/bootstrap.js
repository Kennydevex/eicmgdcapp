window._ = require('lodash');

window.axios = require('axios');

// window.moment = require('moment');

// window.moment.locale('pt-br');

window.axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-TOKEN': window.csrf_token
}

// window.axios.defaults.baseURL = 'http://45.32.146.227/api/w1/';
window.axios.defaults.baseURL = 'http://localhost:8000/api/w1/';


// import Echo from 'laravel-echo'

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     encrypted: true
// });
