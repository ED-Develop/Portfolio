import firebase from "firebase";

class StorageAPI {
    protected storage: firebase.storage.Storage;
    protected baseRef: firebase.storage.Reference;
    protected childRef: firebase.storage.Reference | null;

    constructor(path?: string) {
        this.storage = firebase.storage();
        this.baseRef = this.storage.ref();
        this.childRef = path ? this.baseRef.child(path) : null
    }

    protected getRef(name: string) {
        if (this.childRef) return this.childRef.child(name);

        return this.baseRef.child(name);
    }

    upload(file: File) {
        const ref = this.getRef(file.name);

        return ref.put(file).then(() => ref.getDownloadURL());
    }
}

export default StorageAPI;
