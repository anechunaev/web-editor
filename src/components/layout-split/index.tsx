import { Component, Element, Prop } from '@stencil/core';
import { prependOnceListener } from 'cluster';

@Component({
	tag: 'eui-layout-split',
	shadow: true,
	styleUrl: 'index.less',
})
export class LayoutSplit {
	@Element() private self;

	@Prop() splitDir: "vertical" | "horizontal" = "vertical";
	@Prop() colWidth: string = '';
	@Prop() colMinWidth: string = '';
	@Prop() colMaxWidth: string = '';
	@Prop() colHeight: string = '';
	@Prop() colMinHeight: string = '';
	@Prop() colMaxHeight: string = '';

	private widths: number[] = [];
	private maxWidths: number[] = [];
	private minWidths: number[] = [];
	private heights: number[] = [];
	private minHeights: number[] = [];
	private maxHeights: number[] = [];

	public componentWillLoad() {
		this.widths = this.colWidth.split(',').map(n => +n);
		this.minWidths = this.colMinWidth.split(',').map(n => +n);
		this.maxWidths = this.colMaxWidth.split(',').map(n => +n);
		this.heights = this.colHeight.split(',').map(n => +n);
		this.minHeights = this.colMinHeight.split(',').map(n => +n);
		this.maxHeights = this.colMaxHeight.split(',').map(n => +n);
	}

	private setWrapper = (children: HTMLElement[], index = 0) => {
		const element = children[0];
		let sibling = null;

		if (children.length <= 2) {
			sibling = children[1];
		}

		element.setAttribute('slot', `item${index}`);

		if (sibling) {
			sibling.setAttribute('slot', `item${index + 1}`);
		}

		return this.splitDir === "vertical" ? [
			<eui-layout-resizable
				axis="x"
				width={this.widths[index]}
				minWidth={this.minWidths[index]}
				maxWidth={this.maxWidths[index]}
			>
				<slot name={`item${index}`} />
			</eui-layout-resizable>,
			sibling ? <slot name={`item${index + 1}`} /> : this.setWrapper(children.slice(1), index + 1)
		 ] : [
			<eui-layout-resizable
				axis="y"
				height={this.heights[index]}
				minHeight={this.minHeights[index]}
				maxHeight={this.maxHeights[index]}
			>
				<slot name={`item${index}`} />
			</eui-layout-resizable>,
			sibling ? <slot name={`item${index + 1}`} /> : this.setWrapper(children.slice(1), index + 1)
		 ];
	}

	public render() {
		return this.setWrapper(Array.prototype.slice.call(this.self.children));
	}
}