import { Component, Prop, Element } from '@stencil/core';
import Storage from '../Storage/storages/localStorage';
import { getPath } from '../DOM/path';

@Component({
	tag: 'eui-layout-resizable',
	shadow: true,
	styleUrl: 'index.less',
})
export class LayoutResizable {
	@Element() private self;

	@Prop() axis?: "x" | "y" | "xy" = "xy";
	@Prop() minWidth?: number = 100;
	@Prop() minHeight?: number = 100;
	@Prop() maxWidth?: number;
	@Prop() maxHeight?: number;
	@Prop() width?: number;
	@Prop() height?: number;


	private active: boolean = false;
	private calculatedWidth: number;
	private calculatedHeight: number;
	private startX: number;
	private startY: number;
	private resizable: HTMLElement;
	private storage = null;
	private scrollOnly?: 'x' | 'y';

	constructor() {
		if (Storage.isAvailable()) {
			this.storage = new Storage('ui-layout-resizable');
		}
	}

	private handleTouchStart = (scrollOnly?: 'x' | 'y') => (e: TouchEvent) => {
		e.preventDefault();
		this.scrollOnly = scrollOnly;
		this.handleDown(e.touches[0].clientX, e.touches[0].clientY);
	};
	private handleTouchMove = (e: TouchEvent) => this.handleMove(e.touches[0].clientX, e.touches[0].clientY);
	private handleTouchEnd = () => this.handleUp();
	private handleMouseDown = (scrollOnly?: 'x' | 'y') => (e: MouseEvent) => {
		e.preventDefault();
		this.scrollOnly = scrollOnly;
		this.handleDown(e.clientX, e.clientY);
	};
	private handleMouseMove = (e: MouseEvent) => this.handleMove(e.clientX, e.clientY);
	private handleMouseUp = () => this.handleUp();

	private handleDown = (clientX: number, clientY: number) => {
		if ((this.axis === 'x' || this.axis === 'xy') && this.scrollOnly !== 'y') {
			this.startX = clientX;
			this.calculatedWidth = this.resizable.clientWidth;
		}
		if ((this.axis === 'y' || this.axis === 'xy') && this.scrollOnly !== 'x') {
			this.startY = clientY;
			this.calculatedHeight = this.resizable.clientHeight;
		}
		this.active = true;
	}

	private handleUp = () => {
		if (this.active) {
			const newWidth = this.resizable.style.width;
			const newHeight = this.resizable.style.height
			const path = getPath(this.resizable);

			if (newWidth.length && (this.axis === 'x' || this.axis === 'xy') && this.storage) {
				this.storage.set('x' + path, +newWidth.slice(0, newWidth.length - 2));
			}

			if (newHeight.length && (this.axis === 'y' || this.axis === 'xy') && this.storage) {
				this.storage.set('y' + path, +newHeight.slice(0, newHeight.length - 2));
			}
		}

		this.active = false;
		this.scrollOnly = void 0;
	}

	private handleMove = (clientX: number, clientY: number) => {
		if (this.active) {
			if ((this.axis === 'x' || this.axis === 'xy') && this.scrollOnly !== 'y') {
				const deltaX = clientX - this.startX;
				this.resizable.style.width = (deltaX + this.calculatedWidth) + 'px';
			}
			if ((this.axis === 'y' || this.axis === 'xy') && this.scrollOnly !== 'x') {
				const deltaY = clientY - this.startY;
				this.resizable.style.height = (deltaY + this.calculatedHeight) + 'px';
			}
		}
	}

	public componentWillLoad() {
		document.addEventListener('touchmove', this.handleTouchMove);
		document.addEventListener('mousemove', this.handleMouseMove);
		document.addEventListener('touchend', this.handleTouchEnd);
		document.addEventListener('mouseup', this.handleMouseUp);

		this.self.style.width = typeof this.width === 'number' ? this.width + 'px' : void 0;
		this.self.style.height = typeof this.height === 'number' ? this.height + 'px' : void 0;
		this.self.style.minWidth = typeof this.minWidth === 'number' ? this.minWidth + 'px' : void 0;
		this.self.style.minHeight = typeof this.minHeight === 'number' ? this.minHeight + 'px' : void 0;
		this.self.style.maxWidth = typeof this.maxWidth === 'number' ? this.maxWidth + 'px' : void 0;
		this.self.style.maxHeight = typeof this.maxHeight === 'number' ? this.maxHeight + 'px' : void 0;
	}

	public componentDidLoad() {
		this.resizable = this.self;
		this.calculatedWidth = this.resizable.clientWidth;
		this.calculatedHeight = this.resizable.clientHeight;

		if (this.storage) {
			this.resizable.style.width = this.storage.get('x' + getPath(this.resizable)) + 'px';
			this.resizable.style.height = this.storage.get('y' + getPath(this.resizable)) + 'px';
		}
	}

	public componentWillUnload() {
		document.removeEventListener('touchmove', this.handleTouchMove);
		document.removeEventListener('mousemove', this.handleMouseMove);
		document.removeEventListener('touchend', this.handleTouchEnd);
		document.removeEventListener('mouseup', this.handleMouseUp);
	}

	public render() {
		return [
			<div class={`content ${this.axis === 'x' || this.axis === 'xy' ? 'x' : ''} ${this.axis === 'y' || this.axis === 'xy' ? 'y' : ''}`}>
				<slot />
			</div>,
			(this.axis === 'x' || this.axis === 'xy') && (
				<div
					class="resizer vertical"
					onMouseDown={this.handleMouseDown('x')}
					onTouchStart={this.handleTouchStart('x')}
				/>
			),
			(this.axis === 'y' || this.axis === 'xy') && (
				<div
					class="resizer horizontal"
					onMouseDown={this.handleMouseDown('y')}
					onTouchStart={this.handleTouchStart('y')}
				/>
			),
			this.axis === 'xy' && (
				<div
					class="resizer full"
					onMouseDown={this.handleMouseDown()}
					onTouchStart={this.handleTouchStart()}
				/>
			),
		]
	}
}