import { AbstractStorage } from '../index';
import { h32 as hash } from 'xxhashjs';

export default class LocalStorage extends AbstractStorage {
	constructor(private dbName: string) {
		super();
	}

	public static isAvailable(): boolean {
		if (typeof window === 'undefined') return false;
		if (typeof window.localStorage === 'undefined') return false;

		try {
			const key = '__STORAGE_TEST__';
			window.localStorage.setItem(key, key);
			window.localStorage.removeItem(key);
			return true;
		} catch (e) {
			return e instanceof DOMException && (
				e.code === 22
				|| e.code === 1014
				|| e.name === 'QuotaExceedError'
				|| e.name === 'NS_ERROR_DOM_QUOTA_REACHED'
			) && window.localStorage.length !== 0;
		}
	}

	private encode = (value: any): string => {
		switch (typeof value) {
		case 'object':
			return JSON.stringify(value);
		default:
			return value.toString();
		}
	}

	private decode = (value: string): any => {
		try {
			return JSON.parse(value);
		} catch (e) {
			try {
				return eval(value);
			} catch (ee) {
				return void 0;
			}
		}
	}

	private key = (key: string) => hash(this.dbName + '-' + key, 3482).toString(36);

	public set<T>(key: string, value: T): void {
		if (typeof value === 'undefined') return this.remove(key);

		window.localStorage.setItem(this.key(key), this.encode(value));
	}

	public get<T>(key: string): T {
		return this.decode(window.localStorage.getItem(this.key(key)));
	}

	public remove(key: string): void {
		window.localStorage.removeItem(this.key(key));
	}
}