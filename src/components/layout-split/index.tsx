import { Component, Element, Prop } from '@stencil/core';

@Component({
	tag: 'layout-split',
	shadow: true,
	styleUrl: 'index.less',
})
export class LayoutSplit {
	@Element() private self;

	@Prop() direction: "vertical" | "horizontal" = "vertical";

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

		return this.direction === "vertical" ? (
			<layout-split-vertical slot={index === 0 ? "left" : "right"}>
				<slot name={`item${index}`} slot="left" />
				{sibling ? <slot name={`item${index + 1}`} slot="right" /> : this.setWrapper(children.slice(1), index + 1)}
			</layout-split-vertical>
		) : (
			<layout-split-horizontal slot={index === 0 ? "top" : "bottom"}>
				<slot name={`item${index}`} slot="top" />
				{sibling ? <slot name={`item${index + 1}`} slot="bottom" /> : this.setWrapper(children.slice(1), index + 1)}
			</layout-split-horizontal>
		);
	}

	public render() {
		return this.setWrapper(Array.prototype.slice.call(this.self.children));
	}
}