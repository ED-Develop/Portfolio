import {TMessageModel} from '../types/types';
import {TSubscriber, WebSocketApi} from './web-socket/web-socket-api';

export class ChatApi extends WebSocketApi {
    connect() {
        super._connect(process.env.REACT_APP_SAMURAI_CHAT_API);
    };

    subscribe(callback: TSubscriber<Array<TMessageModel>>) {
        super._subscribe(callback);
    };

    send(message: string) {
        this.ws?.send(message);
    }
}
