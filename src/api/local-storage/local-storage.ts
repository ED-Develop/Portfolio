export function storage<V>(key: string, value?: V) {
    return new Promise<V>(resolve => {
        if (value) {
            localStorage.setItem(key, JSON.stringify(value));
            resolve();
        } else {
            resolve(JSON.parse(localStorage.getItem(key) || '[]') as V);
        }
    });
}