import {AxiosInstance} from "axios";

export class BaseAPI {
    protected endpoint: string;
    protected instance: AxiosInstance;
    protected suffix?: string;

    constructor(endpoint: string, instance: AxiosInstance, suffix?: string) {
        this.endpoint = endpoint;
        this.instance = instance;
        this.suffix = suffix;
    }

    protected getUrl(uri?: string) {
        return `${this.endpoint}/${uri ? uri : ''}${this.suffix ? '.json' : ''}`;
    }

    get<R>(uri?: string) {
        return this.instance.get<R>(this.getUrl(uri)).then(response => response.data);
    }

    create<P, R>(payload: P, uri?: string) {
        return this.instance.post<R>(this.getUrl(uri), payload).then(response => response.data);
    }

    update<P, R>(payload: P, uri?: string) {
        return this.instance.patch<R>(this.getUrl(uri), payload).then(response => response.data);
    }

    delete<R>(uri?: string) {
        return this.instance.delete<R>(this.getUrl(uri)).then(response => response.data);
    }
}
