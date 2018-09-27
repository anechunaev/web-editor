import { Component, Prop } from '@stencil/core';

@Component({
	tag: 'eui-editor-panel',
	shadow: true,
	styleUrl: 'index.less',
})
export class EditorPanel {
	@Prop() panelTitle?: string;

	public render() {
		return [
			<div class="title">{this.panelTitle}</div>,
			<eui-layout-resizable minHeight={0} axis="y">
				<eui-layout-scrollable>
					<div class="content">
						<slot />
					</div>
				</eui-layout-scrollable>
			</eui-layout-resizable>,
		];
	}
}