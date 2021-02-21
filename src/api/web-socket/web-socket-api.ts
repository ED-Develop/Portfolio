export type TSubscriber<A = any> = (data: A) => void;
type TClear = () => void;
export type TWsStatus = 'pending' | 'opened' | 'closed';
type TEvent = 'message' | 'status';
type TSubscribers = { [key in TEvent]: Array<TSubscriber> };

export class WebSocketApi {
    protected ws: WebSocket | null = null;
    private subscribers: TSubscribers = {
        message: [],
        status: []
    };
    private clear: TClear | null = null;

    private emit<D>(event: TEvent, data: D) {
        this.subscribers[event].forEach(subscriber => subscriber(data));
    };

    connect(url?: string) {
        if (!url) {
            throw new Error('WebSocket url wasn\'t provided');
        }

        if (this.ws) return null;

        const handleReceiveMessage = (e: MessageEvent) => {
            this.emit('message', JSON.parse(e.data));
        };

        const handleOpen = () => {
            this.emit<TWsStatus>('status', 'opened');
        };

        const handleClose = () => {
            this.emit<TWsStatus>('status', 'closed');

            if (this.clear) this.clear();

            this.subscribers = {
                message: [],
                status: []
            };
            this.ws = null;
        };

        const handleError = () => {
            this.emit<TWsStatus>('status', 'pending');
        };

        this.ws = new WebSocket(url);
        this.ws?.addEventListener('message', handleReceiveMessage);
        this.ws?.addEventListener('open', handleOpen);
        this.ws?.addEventListener('close', handleClose);
        this.ws?.addEventListener('error', handleError);

        this.clear = () => {
            this.ws?.removeEventListener('message', handleReceiveMessage);
            this.ws?.removeEventListener('open', handleOpen);
            this.ws?.removeEventListener('close', handleClose);
            this.ws?.removeEventListener('error', handleError);
        };
    };

    stop() {
        this.ws?.close();
    };

    subscribe<A = any>(event: TEvent, callback: TSubscriber<A>) {
        this.subscribers[event].push(callback);

        return () => {
            this.subscribers[event].filter(subscriber => subscriber !== callback);
        };
    };
}
