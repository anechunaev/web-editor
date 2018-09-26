import { Component, Prop } from '@stencil/core';

@Component({
	tag: 'layout-scrollable',
	shadow: true,
	styleUrl: 'index.less',
})
export class LayoutScrollable {
	@Prop() axis: "x" | "y" | "xy" = "y";

	public render() {
		return <slot />
	}
}