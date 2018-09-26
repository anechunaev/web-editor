import { Component, Element } from '@stencil/core';

@Component({
	tag: 'layout-test',
	shadow: true,
})
export class LayoutTest {
	@Element() private self;

	public render() {
		return Array.prototype.slice.call(this.self.children).map((child: HTMLElement, key) => {
			child.setAttribute('slot', `item${key}`);
			return <div class="autoslot"><slot name={`item${key}`} /></div>;
		});
	}
}