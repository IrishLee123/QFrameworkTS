export class Delegate<T> {

    private list: Wrapper<T>[] = [];

    public addListener(callback: (val: T) => void, target: Object): void {
        for (var i = 0; i < this.list.length; i++) {
            var element = this.list[i];
            if (element && element.fun === callback && element.target === target) {
                return;
            }
        }
        let w: Wrapper<T> = {
            target: target,
            fun: callback
        }
        this.list.push(w);
    }

    public invoke(val: T) {
        for (let i = 0; i < this.list.length; i++) {
            const w = this.list[i];
            if (!w) {
                return;
            }
            w.fun.call(w.target, val);
        }
    }

    public removeListener(callback: (val: T) => void, target: Object) {
        for (var i = 0; i < this.list.length; i++) {
            var element = this.list[i];
            if (element && element.fun === callback && element.target === target) {
                this.list.splice(i, 1);
                return;
            }
        }
    }
}

interface Wrapper<T> {
    target: Object,
    fun: (val: T) => void
}