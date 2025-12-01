import { type Sprite } from "./sprite";

export interface GameObject<TCtx> {
  getAssetPaths?(): string[];
  getX(ctx: TCtx): number;
  getY?(ctx: TCtx): number;
  getDisplayName(ctx: TCtx): string;
  getSprite?(ctx: TCtx): Sprite;
  onEnterInteractRange?(ctx: TCtx): Promise<void>;
  onInteract?(ctx: TCtx): Promise<void>;
  onEnterRoom?(ctx: TCtx): void;
}
