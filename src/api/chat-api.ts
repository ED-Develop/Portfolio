import {WebSocketApi} from './web-socket/web-socket-api';

export class ChatApi extends WebSocketApi {
    connectChat() {
        super.connect(process.env.REACT_APP_SAMURAI_CHAT_API);
    };

    send(message: string) {
        this.ws?.send(message);
    }
}
