export type TSubscriber<A = any> = (data: A) => void;
type TClear = () => void;
type TWsStatus = 'pending' | 'opened';

export class WebSocketApi {
    protected ws: WebSocket | null = null;
    private subscribers: Array<TSubscriber> = [];
    private clear: TClear | null = null;

    _connect(url?: string) {
        if (!url) {
            throw new Error('WebSocket url wasn\'t provided');
        }

        if (this.ws) return null;

        const handleReceiveMessage = (e: MessageEvent) => {
            this.subscribers.forEach(subscriber => subscriber(JSON.parse(e.data)));
        };

        this.ws = new WebSocket(url);
        this.ws?.addEventListener('message', handleReceiveMessage);

        this.clear = () => {
            this.ws?.removeEventListener('message', handleReceiveMessage);
        };
    };

    stop() {
        if (this.clear) this.clear();

        this.subscribers = [];
        this.ws?.close();
        this.ws = null;
    };

    _subscribe<A = any>(callback: TSubscriber<A>) {
        this.subscribers.push(callback);

        return () => {
            this.subscribers.filter(subscriber => subscriber !== callback);
        };
    };
}
