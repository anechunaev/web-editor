import { Component, Prop, Element, State } from '@stencil/core';
import Storage from '../Storage/storages/localStorage';
import { getPath } from '../DOM/path';

@Component({
	tag: 'layout-split-vertical',
	shadow: true,
	styleUrl: 'index.less',
})
export class LayoutSplitVertical {
	@Element() private self: HTMLElement;

	@Prop() onSizeChange: (size: number, delta: number) => void = () => {};
	@Prop() resizible: "left" | "right" = "left";

	@State() private active: boolean = false;

	private width: number;
	private startX: number;
	private resiziblePanel: HTMLElement;
	private storage = null;

	constructor() {
		if (Storage.isAvailable()) {
			this.storage = new Storage('ui-layout-split-vertical');
		}
	}


	private handleTouchStart = (e: TouchEvent) => { e.preventDefault(); this.handleDown(e.touches[0].clientX); };
	private handleTouchMove = (e: TouchEvent) => this.handleMove(e.touches[0].clientX);
	private handleTouchEnd = () => this.handleUp();
	private handleMouseDown = (e: MouseEvent) => { e.preventDefault(); this.handleDown(e.clientX); };
	private handleMouseMove = (e: MouseEvent) => this.handleMove(e.clientX);
	private handleMouseUp = () => this.handleUp();

	private handleDown = (clientX: number) => {
		this.startX = clientX;
		this.active = true;
		this.width = this.resiziblePanel.clientWidth;
	}

	private handleUp = () => {
		if (this.active) {
			const newWidth = this.resiziblePanel.style.width;
			if (newWidth.length) {
				const path = getPath(this.resiziblePanel);
				if (this.storage) {
					this.storage.set(path, +newWidth.slice(0, newWidth.length - 2));
				}
			}
		}

		this.active = false;
	}

	private handleMove = (clientX: number) => {
		if (this.active) {
			const delta = clientX - this.startX;
			const factor = this.resizible === 'left' ? 1 : -1;
			this.resiziblePanel.style.width = (delta * factor + this.width) + 'px';
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
		this.width = this.resiziblePanel.clientWidth;

		if (this.storage) {
			const loadedWidth = this.storage.get(getPath(this.resiziblePanel));
			this.resiziblePanel.style.width = loadedWidth + 'px';
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
			<div class={`panel ${this.resizible === 'left' ? 'resizible' : ''}`}>
				<slot name="left" />
			</div>,
			<div
				class="separator"
				onMouseDown={this.handleMouseDown}
				onTouchStart={this.handleTouchStart}
			/>,
			<div class={`panel ${this.resizible === 'right' ? 'resizible' : ''}`}>
				<slot name="right" />
			</div>,
		];
	}
}