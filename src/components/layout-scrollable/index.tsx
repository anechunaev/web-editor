import { Component, Prop, Element } from '@stencil/core';

@Component({
	tag: 'layout-scrollable',
	shadow: true,
	styleUrl: 'index.less',
})
export class LayoutScrollable {
	@Prop() axis: "x" | "y" | "xy" = "y";

	@Element() private self;

	public render() {
		switch (this.axis) {
		case "x":
			this.self.style.flexDirection = "row";
			break;
		case "y":
			this.self.style.flexDirection = "column";
			break;
		default:
			this.self.style.flexDirection = "column";
			break;
		}
		return <slot />
	}
}