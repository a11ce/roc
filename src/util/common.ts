export function unreachable(_arg: never) {}

export const resolveAssetPath = (path: string, gameName: string): string => {
  return `${import.meta.env.BASE_URL}art/${gameName}/${path}`;
};
