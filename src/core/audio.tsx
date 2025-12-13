import { resolveAssetPath } from "@roc/util/common";
import type { GameCtx } from "./game";

export interface SoundLoop {
  stop(): void;
}

export interface AudioController {
  init(ctx: GameCtx): void;
  play(path: string, volume?: number): Promise<void>;
  startLoop(path: string, volume?: number): SoundLoop;
}

export const createAudioController = (): AudioController => {
  const audioContext = new AudioContext();
  const bufferCache = new Map<string, AudioBuffer>();
  let gameName: string | null = null;

  const init = (ctx: GameCtx) => {
    gameName = ctx.gameName;
  };

  const loadSound = async (path: string): Promise<AudioBuffer> => {
    if (bufferCache.has(path)) {
      return bufferCache.get(path)!;
    }

    if (!gameName) {
      throw new Error("AudioController not initialized");
    }

    const resolvedPath = resolveAssetPath(path, gameName);
    const response = await fetch(resolvedPath);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    bufferCache.set(path, audioBuffer);
    return audioBuffer;
  };

  const play = async (path: string, volume: number = 1.0): Promise<void> => {
    const buffer = await loadSound(path);

    const source = audioContext.createBufferSource();
    source.buffer = buffer;

    const gainNode = audioContext.createGain();
    gainNode.gain.value = Math.max(0, Math.min(1, volume));

    source.connect(gainNode);
    gainNode.connect(audioContext.destination);

    source.start(0);

    return new Promise((resolve) => {
      source.onended = () => resolve();
    });
  };

  const startLoop = (path: string, volume: number = 1.0): SoundLoop => {
    let source: AudioBufferSourceNode | null = null;
    let gainNode: GainNode | null = null;

    loadSound(path).then((buffer) => {
      source = audioContext.createBufferSource();
      gainNode = audioContext.createGain();

      source.buffer = buffer;
      source.loop = true;
      gainNode.gain.value = Math.max(0, Math.min(1, volume));

      source.connect(gainNode);
      gainNode.connect(audioContext.destination);

      source.start(0);
    });

    const stop = () => {
      if (source) {
        source.stop();
        source.disconnect();
      }
      if (gainNode) {
        gainNode.disconnect();
      }
    };

    return { stop };
  };

  return {
    init,
    play,
    startLoop,
  };
};
