import { QuickDB, MemoryDriver } from 'quick.db';

class QuickDbInstance {
    static instance: QuickDbInstance;
    id: Symbol;
    db: QuickDB | null = null;

    constructor(id: string) {
        this.id = Symbol(id);
        if (QuickDbInstance.instance) {
            return QuickDbInstance.instance;
        } else {
            this.init();          
        }
        QuickDbInstance.instance = this;
    }

    init() {
        const memoryDriver = new MemoryDriver();
        this.db = new QuickDB({ driver: memoryDriver });
    }
}


export const quickDbInstance = new QuickDbInstance('test');
 