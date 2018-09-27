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

	private widths: number[] = [];

	public componentWillLoad() {
		this.widths = this.colWidth.split(',').map(w => +w);
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
			<eui-layout-resizable axis="x" width={this.widths[index]}>
				<slot name={`item${index}`} />
			</eui-layout-resizable>,
			sibling ? <slot name={`item${index + 1}`} /> : this.setWrapper(children.slice(1), index + 1)
		 ] : [
			<eui-layout-resizable axis="y" width={this.widths[index]}>
				<slot name={`item${index}`} />
			</eui-layout-resizable>,
			sibling ? <slot name={`item${index + 1}`} /> : this.setWrapper(children.slice(1), index + 1)
		 ];
	}

	public render() {
		return this.setWrapper(Array.prototype.slice.call(this.self.children));
	}
}