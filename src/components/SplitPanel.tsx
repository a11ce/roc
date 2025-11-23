import type { Component, JSX } from "solid-js";
import { children as resolveChildren } from "solid-js";

interface SplitPanelProps {
  type: "v" | "h";
  percent: number;
  children: JSX.Element;
}

const SplitPanel: Component<SplitPanelProps> = (props) => {
  const resolved = resolveChildren(() => props.children);
  const childArray = () => {
    const kids = resolved();
    return Array.isArray(kids) ? kids : [kids];
  };

  if (childArray().length !== 2) {
    throw new Error("SplitPanel requires exactly 2 children");
  }

  const type = props.type;
  const firstSize = `calc(${props.percent}% - 1px)`;
  const secondSize = `calc(${100 - props.percent}% - 1px)`;

  return (
    <div class={`split-panel split-panel-${type}`}>
      <div class="split-panel-child" style={{ "--size": firstSize }}>
        {childArray()[0]}
      </div>
      <div class="split-panel-child" style={{ "--size": secondSize }}>
        {childArray()[1]}
      </div>
    </div>
  );
};

export default SplitPanel;
