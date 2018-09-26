import { Component, Prop, Element } from '@stencil/core';
import Storage from '../Storage/storages/localStorage';
import { getPath } from '../DOM/path';

@Component({
	tag: 'editor-panel',
	shadow: true,
	styleUrl: 'index.less',
})
export class EditorPanel {
	@Prop() title?: string;

	@Element() private self;

	private active: boolean = false;
	private height: number;
	private startY: number;
	private resizable: HTMLElement;
	private storage = null;

	constructor() {
		if (Storage.isAvailable()) {
			this.storage = new Storage('ui-editor-panel');
		}
	}

	private handleTouchStart = (e: TouchEvent) => { e.preventDefault(); this.handleDown(e.touches[0].clientY) };
	private handleTouchMove = (e: TouchEvent) => this.handleMove(e.touches[0].clientY);
	private handleTouchEnd = () => this.handleUp();
	private handleMouseDown = (e: MouseEvent) => { e.preventDefault(); this.handleDown(e.clientY) };
	private handleMouseMove = (e: MouseEvent) => this.handleMove(e.clientY);
	private handleMouseUp = () => this.handleUp();

	private handleDown = (clientY: number) => {
		this.startY = clientY;
		this.active = true;
		this.height = this.resizable.clientHeight;
	}

	private handleUp = () => {
		if (this.active) {
			const newHeight = this.resizable.style.height;
			if (newHeight.length && this.storage) {
				this.storage.set(
					getPath(this.resizable),
					+newHeight.slice(0, newHeight.length - 2),
				);
			}
		}

		this.active = false;
	}

	private handleMove = (clientY: number) => {
		if (this.active) {
			const delta = clientY - this.startY;
			this.resizable.style.height = (delta + this.height) + 'px';
		}
	}

	public componentWillLoad() {
		document.addEventListener('touchmove', this.handleTouchMove);
		document.addEventListener('mousemove', this.handleMouseMove);
		document.addEventListener('touchend', this.handleTouchEnd);
		document.addEventListener('mouseup', this.handleMouseUp);
	}

	public componentWillUnload() {
		document.removeEventListener('touchmove', this.handleTouchMove);
		document.removeEventListener('mousemove', this.handleMouseMove);
		document.removeEventListener('touchend', this.handleTouchEnd);
		document.removeEventListener('mouseup', this.handleMouseUp);
	}

	public componentDidLoad() {
		this.resizable = this.self.shadowRoot.querySelector('.container');
		this.height = this.resizable.clientHeight;

		if (this.storage) {
			this.resizable.style.height = this.storage.get(getPath(this.resizable)) + 'px';
		}
	}

	public render() {
		return [
			<div class="title">{this.title}</div>,
			<layout-scrollable class="container">
				<div class="content">
					<slot />
				</div>
			</layout-scrollable>,
			<div class="resizer" onMouseDown={this.handleMouseDown} onTouchStart={this.handleTouchStart} />,
		];
	}
}