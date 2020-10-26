import firebase from 'firebase';
import 'firebase/storage';

class StorageAPI {
    protected storage: firebase.storage.Storage;
    protected baseRef: firebase.storage.Reference;
    protected childRef: firebase.storage.Reference | null;
    protected cash: Array<string>;

    constructor(path?: string) {
        this.storage = firebase.storage();
        this.baseRef = this.storage.ref();
        this.childRef = path ? this.baseRef.child(path) : null;
        this.cash = [];
    }

    protected getRef(name?: string) {
        if (name && !this.childRef) return this.baseRef.child(name);
        if (!name && this.childRef) return this.childRef;
        if (name && this.childRef) return this.childRef.child(name);

        return this.baseRef;
    }

    async upload(file: File): Promise<string> {
        try {
            const ref = this.getRef(file.name);
            const url = await ref.put(file).then(() => ref.getDownloadURL());

            this.cash.push(url);

            return url;
        } catch (e) {
            throw new Error('Failed to upload');
        }
    }

    async delete(url: string) {
        try {
            const resp = await this.storage.refFromURL(url).delete();

            this.cash = this.cash.filter(u => u !== url);

            return resp;
        } catch (e) {
            throw new Error('Failed to delete');
        }
    }

    cleanup() {
        this.cash.forEach(url => this.delete(url));
    }
}

export default StorageAPI;
