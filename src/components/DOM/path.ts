export function getPathStack(element: Element) {
	const stack = [];
	let el = element;
	while (!!el.parentNode) {
		let sibCount = 0;
		let sibIndex = 0;
		for (let i = 0; i < el.parentNode.childNodes.length; i++) {
			const sib = el.parentNode.childNodes[i];
			if (sib.nodeName === el.nodeName) {
				if (sib === el) {
					sibIndex = sibCount;
				}
				sibCount++;
			}
		}
		if (el.hasAttribute('id') && el.id !== '') {
			stack.unshift(el.nodeName.toLowerCase() + '#' + el.id);
		} else if (sibCount > 1) {
			stack.unshift(el.nodeName.toLowerCase() + ':nth-of-type(' + (sibIndex + 1) + ')');
		} else {
			stack.unshift(el.nodeName.toLowerCase());
		}

		el = el.parentNode as Element;
		if (!el.parentNode) {
			if (typeof (el as any).host !== 'undefined') {
				stack.unshift(':shadow');
				el = (el as any).host;
			} else {
				el = { parentNode: null } as Element;
			}
		}
	}

	return stack.slice(2, stack.length);
}

export function getPath(element: Element) {
	return getPathStack(element).join(' ');
}

export function getElementByPath(path: string, source: any = document.body) {
	const parts = path.split(':shadow');
	let parent = source;
	let result;

	for (let i = 0; i < parts.length; i++) {
		const fragment = parent.querySelector(parts[i]);

		if (i + 1 < parts.length) {
			parent = fragment.shadowRoot;
		} else {
			result = fragment;
		}
	}

	return result;
}