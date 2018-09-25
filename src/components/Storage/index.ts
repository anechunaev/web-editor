import LocalStorage from './storages/localStorage';
import CookieStorage from './storages/cookie';

export interface IStorageConstructor {
	set<T>(key: string, value: T): void;
	get<T>(key: string): T;
	remove(key: string): void;
}

export abstract class AbstractStorage implements IStorageConstructor {
	public static isAvailable: () => boolean = () => false;

	public abstract get<T>(key: string): T;
	public abstract set<T>(key: string, value: T): void;
	public abstract remove(key: string,): void;
}

class Storage extends AbstractStorage {
	private store: IStorageConstructor;

	constructor(private dbName: string) {
		super();

		if (LocalStorage.isAvailable()) {
			this.store = new LocalStorage(this.dbName);
		} else if (CookieStorage.isAvailable()) {
			this.store = new CookieStorage(this.dbName);
		} else {
			throw new Error('Storage constructor error: no storages are available (probably global variables "window" or "document" are undefined)');
		}
	}

	public get<T>(key: string): T {
		return this.store.get(key);
	}

	public set<T>(key: string, value: T): void {
		this.store.set(key, value);
	}

	public remove(key: string): void {
		this.store.remove(key);
	}
}

export default Storage;