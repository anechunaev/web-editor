import { Component, Prop, State, Element } from '@stencil/core';
import Storage from '../Storage/storages/localStorage';
import { getPath } from '../DOM/path';

@Component({
	tag: 'eui-editor-panel-group',
	shadow: true,
	styleUrl: 'index.less',
})
export class EditorPanelGroup {
	@Prop() groupTitle?: string;

	@State() expanded?: boolean = true;

	@Element() private self;

	private storage = null;

	constructor() {
		if (Storage.isAvailable()) {
			this.storage = new Storage('ui-editor-panel-group');
		}
	}

	private handleTitleClick = () => {
		this.expanded = !this.expanded;

		if (this.storage) {
			this.storage.set(getPath(this.self), this.expanded);
		}
	}

	public componentWillLoad() {
		if (this.storage) {
			const result = this.storage.get(getPath(this.self));
			this.expanded = typeof result !== 'undefined' && result !== null ? result : true;
		}
	}

	public render() {
		return this.groupTitle ? (
			<div class={`group ${!this.expanded && 'collapsed'}`}>
				<div class="title" onClick={this.handleTitleClick}>
					<span class="title-wrapper">{this.groupTitle}</span>
					<button class="title-toggler">{this.expanded ? '-' : '+'}</button>
				</div>
				{this.expanded && <div class="content"><slot /></div>}
			</div>
		) : (
			<div class="content"><slot /></div>
		);
	}
}