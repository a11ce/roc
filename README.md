# roc

Roc is a game engine for adventure games.

## Setup

1. Clone this repo
2. Install [pnpm](https://pnpm.io)
3. `pnpm i`
4. `pnpm run dev`

## Defining a game

Games are defined in their own folders under gameData. Edit `gameData/load.tsx` to initialize your game. You can track your game code using either submodules or a symlink to another git repo.

Your initialize function must return a `GameCtx` or your own game's ctx object that extends `GameCtx`. (See `example/init.tsx`)

### Rooms

Rooms are defined using `createStaticRoom` or `createResetRoom` with a function that takes a ctx object and returns a room data object. The function is called with the ctx when the room is first entered (or each time for reset rooms). A static room persists its state, including objects and avatar position, when the player leaves and re-enters. A reset room does not. Room data objects have the following fields:

- `avatarPosition: { x: number, y: number }`. The initial position of the avatar when entering the room for the first time (or every time, if the room is a reset room.)
- `objects: GameObject[]`. The objects present in the room.
- `onEnter(ctx): void`. Called when the player enters the room. Optional.

### GameObjects

A GameObject is defined by a creator function that returns an object with certain methods. Objects can use variables in their creator functions to store internal state. Creator functions can take arguments to set the initial parameters of the object, most commonly its position. (See `example/objects/fox.tsx` and `example/objects/door.tsx`).

GameObjects can have the following methods. All methods are optional. Different avatars and views may rely on different methods.

- `getX(ctx): number`. Returns the x-coordinate of the object.
- `getY(ctx): number`. Returns the y-coordinate of the object.
- `getDisplayName(ctx): string`. Returns the name of the object.
- `getAssetPaths(): string[]`. Paths for all assets used by the object must be provided. WIP.
- `getSprite(ctx): Sprite`.
- `onEnterInteractRange(ctx): Promise<void>`. Called by the avatar when the player moves within interaction range.
- `onInteract(ctx): Promise<void>`. Called by the avatar when the player interacts with the object.
- `onEnterctx): void`. Called when the player enters the room containing the object.

The following GameObject types are provided:

- `createLatchText(x: number, text: string)` from `@roc/objects/latchText`. Writes the given text to the log when the player walks past it for the first time.

### Avatars

Avatars are special GameObjects that represent the player or player character. You will usually define your own avatars by modifying provided avatars. (See `example/avatars.tsx`)

The provided avatars are:
- `createAvatarSideview()` from `@roc/objects/avatarSideview`
- `createAvatarTopview()` from `@roc/objects/avatarTopview`

### Layouts and Components

Layouts define how UI components are arranged. Layout specifications are defined using the vertical and horizontal split functions (`vSplit/hSplit`). The first argument to a split function is the percentage of the height/width taken up by the first child component. The second and third arguments are the child components, which can also be splits. (See `example/layouts.tsx`)

The provided components are:
- `SideviewRoom` from `@roc/components/SideviewRoom`
- `TopviewRoom` from `@roc/components/TopviewRoom`
- `LogDisplay` from `@roc/components/LogDisplay`

Components are normal SolidJS components with empty props. (See `example/components/InventoryDisplay.tsx`) 

You can use `get<YourGame>Ctx` within components to get the GameCtx. This function should be defined as a cast of the provided `getGameCtx`. (See `example/game.tsx`)

## GameCtx

You will often have access to a ctx object. You should extend the provided `GameCtx` into your game's own ctx type to add functionality. (See `example/game.tsx`)

`GameCtx` has the following fields:

### `ctx.log`

Represents the global game log. Components can display this in different ways. Messages are currently strings, this will change soon.

- `write(text: string): void`
- `showButtons(...options: string[]): Promise<string>`. Shows mutually exclusive buttons to the player and returns the selected option.
- `clear(): void`
- `getMessages(): string[]`

### `ctx.room`

- `get(): RoomData`
- `goTo(room: Room): void`

### `ctx.avatar`

- `get(): Avatar`
- `set(avatar: Avatar): void`

### `ctx.input`

- `isKeyPressed(key: string): boolean`. Check if a key is currently pressed.
- `consumeKeyPress(key: string): boolean`. Check if a key was pressed since the last check. Each keypress can only be consumed once.
- `lock(): void`. Disable input.
- `unlock(): void`. Enable input.

### `ctx.layout`

- `set(layout: LayoutSpec): void`
- `get(): JSX.Element`
