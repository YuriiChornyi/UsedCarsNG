export class ListDto<T>{
    public items: T[];
    public count: number;
}

class List<T> {
    private items: Array<T>;

    constructor() {
        this.items = [];
    }

    size(): number {
        return this.items.length;
    }

    add(value: T): void {
        this.items.push(value);
    }

    get(index: number): T {
        return this.items[index];
    }

    toArray(): T[] {
        return this.items;
    }
}