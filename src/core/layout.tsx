import { createSignal, type JSX } from "solid-js";
import SplitPanel from "@roc/components/SplitPanel";

type LayoutSpec = (props: {}) => JSX.Element;

export interface Layout {
  set: (layout: LayoutSpec) => void;
  get: () => JSX.Element;
}

export const createLayout = (): Layout => {
  const [layout, setLayout] = createSignal<LayoutSpec | null>(null);

  const set = (newLayout: LayoutSpec) => {
    setLayout(() => newLayout);
  };

  const get = () => {
    const Current = layout();
    return Current ? <Current /> : null;
  };

  return {
    set,
    get,
  };
};

export const vSplit = (
  percent: number,
  First: LayoutSpec,
  Second: LayoutSpec,
): LayoutSpec => {
  return (_props) => (
    <SplitPanel type="v" percent={percent}>
      <First />
      <Second />
    </SplitPanel>
  );
};

export const hSplit = (
  percent: number,
  First: LayoutSpec,
  Second: LayoutSpec,
): LayoutSpec => {
  return (_props) => (
    <SplitPanel type="h" percent={percent}>
      <First />
      <Second />
    </SplitPanel>
  );
};
