/* @refresh reload */

import { render } from "solid-js/web";

import "./style/main.scss";
import Roc from "./Roc";

render(() => <Roc />, document.getElementById("root") as HTMLElement);
