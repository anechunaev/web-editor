import { AbstractStorage } from '../index';
import { h32 as hash } from 'xxhashjs';

export default class CookieStorage extends AbstractStorage {
	public static isAvailable(): boolean {
		return typeof document !== 'undefined';
	}

	constructor(private dbName: string) {
		super();
	}

	private encode = (value: any): string => {
		switch (typeof value) {
		case 'object':
			return encodeURIComponent(JSON.stringify(value));
		default:
			return encodeURIComponent(value.toString());
		}
	}

	private decode = (value: string): any => {
		try {
			return JSON.parse(decodeURIComponent(value));
		} catch (e) {
			try {
				return eval(decodeURIComponent(value));
			} catch (ee) {
				return void 0;
			}
		}
	}

	/**
	 * Cook the cookie!
	 */
	private cook = (key: string, value: string): string => `${key}=${value};path=/;samesite=strict;max-age=31536000;`;

	private key = (key: string) => hash(this.dbName + '-' + key, 3482).toString(36);

	public set<T>(key: string, value: T): void {
		if (typeof value === 'undefined') return this.remove(key);

		this.cook(this.key(key), this.encode(value));
	}

	public get<T>(key: string): T {
		const re = new RegExp(`(^|\s)${this.key(key)}=([^;]+)`);
		const match = document.cookie.match(re);

		if (match) return this.decode(match[2]);

		return void 0;
	}

	public remove(key: string): void {
		document.cookie = `${this.key(key)}=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;`
	}
}