// App Start.
'use strict';

import firebase from 'firebase';
import { config } from './secrets.config.js';
import {loadModules} from './utils/modules.js';

// App Start.
(function() {
  console.warn('beep…boop…beep\n%c🙇 hello world!', 'font-size:  16px');

  let mainApp = firebase.initializeApp(config);

  loadModules();

})();
