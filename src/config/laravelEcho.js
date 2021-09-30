import Echo from "laravel-echo";
window.Pusher = require('pusher-js')

const config ={
    broadcaster: "pusher",
    key: 'ZENDY_PUSHER_KEY',
    wsHost: window.location.hostname,
    wsPort: 6001,
    forceTLS: false,
    disableStats: true
  }
  const laravelEcho = new Echo(config);

  export default laravelEcho