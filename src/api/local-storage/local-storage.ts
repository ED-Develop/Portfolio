class LocalClient {
    get<V>(key: string) {
        return JSON.parse(localStorage.getItem(key) || 'null') as V;
    }

    set(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    remove(key: string) {
        localStorage.removeItem(key);
    }
}

export const localClient = new LocalClient();

export function storage<V>(key: string, value?: V) {
    if (value) {
        localClient.set(key, value);
    } else {
        return (localClient.get(key) || []) as V;
    }
}