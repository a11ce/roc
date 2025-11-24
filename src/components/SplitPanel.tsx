import type { Component, JSX } from "solid-js";

interface SplitPanelP {
  type: "v" | "h";
  percent: number;
  children: [JSX.Element, JSX.Element];
}

const SplitPanel: Component<SplitPanelP> = (props) => {
  const type = props.type;
  const firstSize = `${props.percent}%`;
  const secondSize = `${100 - props.percent}%`;

  return (
    <div class={`split-panel split-panel-${type}`}>
      <div class="split-panel-child" style={{ "--size": firstSize }}>
        {props.children[0]}
      </div>
      <div class="split-panel-child" style={{ "--size": secondSize }}>
        {props.children[1]}
      </div>
    </div>
  );
};

export default SplitPanel;
