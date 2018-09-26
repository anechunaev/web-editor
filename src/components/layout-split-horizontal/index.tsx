import { Component, Prop, Element, State } from '@stencil/core';
import Storage from '../Storage/storages/localStorage';
import { getPath } from '../DOM/path';

@Component({
	tag: 'layout-split-horizontal',
	shadow: true,
	styleUrl: 'index.less',
})
export class LayoutSplitVertical {
	@Element() private self: HTMLElement;

	@Prop() onSizeChange: (size: number, delta: number) => void = () => {};
	@Prop() resizible: "top" | "bottom" = "top";

	@State() private active: boolean = false;

	private height: number;
	private startY: number;
	private resiziblePanel: HTMLElement;
	private storage = null;

	constructor() {
		if (Storage.isAvailable()) {
			this.storage = new Storage('ui-layout-split-horizontal');
		}
	}


	private handleTouchStart = (e: TouchEvent) => { e.preventDefault(); this.handleDown(e.touches[0].clientY); };
	private handleTouchMove = (e: TouchEvent) => this.handleMove(e.touches[0].clientY);
	private handleTouchEnd = () => this.handleUp();
	private handleMouseDown = (e: MouseEvent) => { e.preventDefault(); this.handleDown(e.clientY); };
	private handleMouseMove = (e: MouseEvent) => this.handleMove(e.clientY);
	private handleMouseUp = () => this.handleUp();

	private handleDown = (clientY: number) => {
		this.startY = clientY;
		this.active = true;
		this.height = this.resiziblePanel.clientHeight;
	}

	private handleUp = () => {
		if (this.active) {
			const newHeight = this.resiziblePanel.style.height;
			if (newHeight.length) {
				const path = getPath(this.resiziblePanel);
				if (this.storage) {
					this.storage.set(path, +newHeight.slice(0, newHeight.length - 2));
				}
			}
		}

		this.active = false;
	}

	private handleMove = (clientY: number) => {
		if (this.active) {
			const delta = clientY - this.startY;
			const factor = this.resizible === 'top' ? 1 : -1;
			this.resiziblePanel.style.height = (delta * factor + this.height) + 'px';
		}
	}


	public componentWillLoad() {
		document.addEventListener('touchmove', this.handleTouchMove);
		document.addEventListener('mousemove', this.handleMouseMove);
		document.addEventListener('touchend', this.handleTouchEnd);
		document.addEventListener('mouseup', this.handleMouseUp);
	}

	public componentDidLoad() {
		this.resiziblePanel = this.self.shadowRoot.querySelector('.resizible');
		this.height = this.resiziblePanel.clientHeight;

		if (this.storage) {
			const loadedHeight = this.storage.get(getPath(this.resiziblePanel));
			this.resiziblePanel.style.height = loadedHeight + 'px';
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
			<div class={`panel ${this.resizible === 'top' ? 'resizible' : ''}`}>
				<slot name="top" />
			</div>,
			<div
				class="separator"
				onMouseDown={this.handleMouseDown}
				onTouchStart={this.handleTouchStart}
			/>,
			<div class={`panel ${this.resizible === 'bottom' ? 'resizible' : ''}`}>
				<slot name="bottom" />
			</div>,
		];
	}
}