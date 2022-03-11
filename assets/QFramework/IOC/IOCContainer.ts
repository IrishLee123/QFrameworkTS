export class IOCContainer {

    private m: Map<string, any> = new Map<string, any>();

    public Register<T>(key: string, instance: T): void {
        this.m.set(key, instance);
    }

    public Get<T>(type: { prototype: T }): T {
        let className = type.prototype.constructor.name;
        if (!this.m.has(className)) {
            console.error("IOCContainer err, get instance fail with " + className);
            return null;
        }

        return this.m.get(className) as T;
    }

}