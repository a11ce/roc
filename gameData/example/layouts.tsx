import { vSplit, hSplit } from "@roc/core/layout";
import SideviewRoom from "@roc/components/SideviewRoom";
import TopviewRoom from "@roc/components/TopviewRoom";
import Debug from "@roc/components/Debug";
import LogDisplay from "@roc/components/LogDisplay";
import InventoryDisplay from "./components/InventoryDisplay";

export const sideviewBeforeInventory = vSplit(
  25,
  SideviewRoom,
  hSplit(25, Debug, LogDisplay),
);

export const sideview = vSplit(
  25,
  SideviewRoom,
  hSplit(25, vSplit(50, Debug, InventoryDisplay), LogDisplay),
);

export const topview = hSplit(
  60,
  TopviewRoom,
  vSplit(70, LogDisplay, InventoryDisplay),
);
