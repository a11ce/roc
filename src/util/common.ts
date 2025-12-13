export function unreachable(_arg: never) {}

export const resolveAssetPath = (path: string, gameName: string): string => {
  return `/art/${gameName}/${path}`;
};
