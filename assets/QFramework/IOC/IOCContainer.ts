export class IOCContainer {

    private m: Map<string, any> = new Map<string, any>();

    public Register<T>(key: string, instance: T): void {
        this.m.set(key, instance);
    }

    public Get<T>(key: string): T {
        if (!this.m.has(key)) {
            console.error("IOCContainer err, get instance fail with " + key);
            return null;
        }

        return this.m.get(key) as T;
    }

}