/* import NotificationHelper from './websocket-notif';


const WebSocketInitiator = {
  init(url) {
    const webSocket = new WebSocket(url);
    webSocket.onmessage = this._onMessageHandler;
  },

  _onMessageHandler(message) {
    const reviewData = JSON.parse(message.data);
    NotificationHelper.sendNotification({
      title: reviewData.name,
      options: {
        body: reviewData.review,
        icon: 'icons/32x32.png',
        image: '../../public/icon/touch-screen.png',
        vibrate: [200, 100, 200],
      },
    });
  },
};

export default WebSocketInitiator; */
import WebsocketNotif from './websocket-notif';

let socket = null;

const WebSocketInitiator = {
  init(url) {
    socket = new WebSocket(url);
    console.log('ws connected to => ', socket.url);
    socket.onmessage = this._onMessageHandler;
  },

  _onMessageHandler(message) {
    console.log('websocket onmessage handler => ', message);

    const reviewData = JSON.parse(message.data);

    WebsocketNotif.sendNotification({
      title: reviewData.name,
      options: {
        body: reviewData.review,
        icon: 'icon/192x192.png',
        image: 'icon/touch-screen.png',
        vibrate: [200, 100, 200],
      },
    });
  },
};

const sendDataToWebsocket = (reviewData) => {
  const data = JSON.stringify(reviewData);

  socket.send(data);
};

export { WebSocketInitiator, sendDataToWebsocket };
//export default WebSocketInitiator;
