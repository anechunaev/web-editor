import { Component, Prop } from '@stencil/core';

@Component({
	tag: 'eui-editor-panel',
	shadow: true,
	styleUrl: 'index.less',
})
export class EditorPanel {
	@Prop() title?: string;

	public render() {
		return [
			<div class="title">{this.title}</div>,
			<eui-layout-resizable minHeight={0}>
				<eui-layout-scrollable>
					<div class="content">
						<slot />
					</div>
				</eui-layout-scrollable>
			</eui-layout-resizable>,
		];
	}
}