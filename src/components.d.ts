/**
* This is an autogenerated file created by the Stencil compiler.
* It contains typing information for all components that exist in this project.
*/
/* tslint:disable */

import '@stencil/core';




export namespace Components {

  interface LayoutSplitHorizontal {
    'onSizeChange': (size: number, delta: number) => void;
    'resizible': "top" | "bottom";
  }
  interface LayoutSplitHorizontalAttributes extends StencilHTMLAttributes {
    'onSizeChange'?: (size: number, delta: number) => void;
    'resizible'?: "top" | "bottom";
  }

  interface LayoutSplitVertical {
    'onSizeChange': (size: number, delta: number) => void;
    'resizible': "left" | "right";
  }
  interface LayoutSplitVerticalAttributes extends StencilHTMLAttributes {
    'onSizeChange'?: (size: number, delta: number) => void;
    'resizible'?: "left" | "right";
  }

  interface LayoutSplit {
    'direction': "vertical" | "horizontal";
  }
  interface LayoutSplitAttributes extends StencilHTMLAttributes {
    'direction'?: "vertical" | "horizontal";
  }

  interface LayoutTest {}
  interface LayoutTestAttributes extends StencilHTMLAttributes {}
}

declare global {
  interface StencilElementInterfaces {
    'LayoutSplitHorizontal': Components.LayoutSplitHorizontal;
    'LayoutSplitVertical': Components.LayoutSplitVertical;
    'LayoutSplit': Components.LayoutSplit;
    'LayoutTest': Components.LayoutTest;
  }

  interface StencilIntrinsicElements {
    'layout-split-horizontal': Components.LayoutSplitHorizontalAttributes;
    'layout-split-vertical': Components.LayoutSplitVerticalAttributes;
    'layout-split': Components.LayoutSplitAttributes;
    'layout-test': Components.LayoutTestAttributes;
  }


  interface HTMLLayoutSplitHorizontalElement extends Components.LayoutSplitHorizontal, HTMLStencilElement {}
  var HTMLLayoutSplitHorizontalElement: {
    prototype: HTMLLayoutSplitHorizontalElement;
    new (): HTMLLayoutSplitHorizontalElement;
  };

  interface HTMLLayoutSplitVerticalElement extends Components.LayoutSplitVertical, HTMLStencilElement {}
  var HTMLLayoutSplitVerticalElement: {
    prototype: HTMLLayoutSplitVerticalElement;
    new (): HTMLLayoutSplitVerticalElement;
  };

  interface HTMLLayoutSplitElement extends Components.LayoutSplit, HTMLStencilElement {}
  var HTMLLayoutSplitElement: {
    prototype: HTMLLayoutSplitElement;
    new (): HTMLLayoutSplitElement;
  };

  interface HTMLLayoutTestElement extends Components.LayoutTest, HTMLStencilElement {}
  var HTMLLayoutTestElement: {
    prototype: HTMLLayoutTestElement;
    new (): HTMLLayoutTestElement;
  };

  interface HTMLElementTagNameMap {
    'layout-split-horizontal': HTMLLayoutSplitHorizontalElement
    'layout-split-vertical': HTMLLayoutSplitVerticalElement
    'layout-split': HTMLLayoutSplitElement
    'layout-test': HTMLLayoutTestElement
  }

  interface ElementTagNameMap {
    'layout-split-horizontal': HTMLLayoutSplitHorizontalElement;
    'layout-split-vertical': HTMLLayoutSplitVerticalElement;
    'layout-split': HTMLLayoutSplitElement;
    'layout-test': HTMLLayoutTestElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
