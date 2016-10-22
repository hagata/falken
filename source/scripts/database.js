var firebase = require('firebase');
import { config } from './secrets.config.js';

var mainApp = firebase.initializeApp(config);

export { mainApp };