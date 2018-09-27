import { Component, Prop, State } from '@stencil/core';

@Component({
	tag: 'eui-editor-panel-group',
	shadow: true,
	styleUrl: 'index.less',
})
export class EditorPanelGroup {
	@Prop() title?: string;

	@State() expanded?: boolean = true;

	private handleTitleClick = () => {
		this.expanded = !this.expanded;
	}

	public render() {
		return this.title ? (
			<div class={`group ${!this.expanded && 'collapsed'}`}>
				<div class="title" onClick={this.handleTitleClick}>
					<span class="title-wrapper">{this.title} {this.expanded ? '-' : '+'}</span>
				</div>
				{this.expanded && <div class="content"><slot /></div>}
			</div>
		) : (
			<div class="content"><slot /></div>
		);
	}
}