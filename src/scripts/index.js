import 'regenerator-runtime'; /* for async await transpile */
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import '../styles/normalize.css';
import '../styles/root.css';
import '../styles/nav.css';
import '../styles/header.css';
import '../styles/main.css';
import '../styles/footer.css';
import '../styles/responsive.css';
import '../styles/resto-detail.css';
import '../styles/resto-fav.css';
import '../styles/loading.css';

import App from './views/App';
import swRegister from './utils/sw-register';
import { WebSocketInitiator } from './utils/websocket-initiator';
//import FooterToolsInitiator from './utils/footer-tools-initiator';

import CONFIG from './globals/config';

const app = new App({
  button: document.querySelector('.menu'),
  drawer: document.querySelector('.nav-list'),
  content: document.querySelector('#main-content'),
});

window.addEventListener('hashchange', () => {
  //document.querySelector('.container').scrollIntoView();
  app.renderPage();
});

window.addEventListener('load', async () => {
  app.renderPage();
  await swRegister();
  WebSocketInitiator.init(CONFIG.WEB_SOCKET_SERVER);
  // Initialize footer tools
  /*  FooterToolsInitiator.init({
    subscribeButton: document.querySelector('#subscribePushNotification'),
    unsubscribeButton: document.querySelector('#unsubscribePushNotification'),
  }); */
});

