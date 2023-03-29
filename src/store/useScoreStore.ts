import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

const enabled = process.env.NODE_ENV !== "production";

interface ScoreStoreInterface {
  score: number;
  score2: number;
  getScore: () => number;
  increaseScore: (increaseNumber: number) => void;
  resetScore: () => void;
  scoreMap: Map<string, number>;
  setScore: (key: string, value: number) => void;
}

const SCORE_INIT_VALUE = 0;

const useScoreStore = create<ScoreStoreInterface>()(
  devtools(
    (set, get) => ({
      score: SCORE_INIT_VALUE,
      score2: 2,
      getScore: () => get().score,
      increaseScore: (increaseNumber: number) =>
        set(
          (state: ScoreStoreInterface) => {
            return {
              score: state.score + increaseNumber,
            };
          },
          false, // true: 기존 state를 대체, false: 기존 state에 병합
          "increaseScore", // action type
        ),
      resetScore: () => set(() => ({ score: SCORE_INIT_VALUE }), false, "resetScore"),
      scoreMap: new Map<string, number>(),
      setScore: (key: string, value: number) => {
        return set((prev) => {
          return {
            scoreMap: new Map(prev.scoreMap).set(key, value),
          };
        });
      },
    }),
    { enabled, name: "ScoreStore" },
  ),
);

export const useScoreStoreWithoutDevTools = create<ScoreStoreInterface>((set, get) => ({
  score: SCORE_INIT_VALUE,
  score2: 2,
  getScore: () => get().score,
  increaseScore: (increaseNumber: number) =>
    set(
      (state: ScoreStoreInterface) => {
        return {
          score: state.score + increaseNumber,
        };
      },
      false, // true: 기존 state를 대체, false: 기존 state에 병합
    ),
  resetScore: () => set(() => ({ score: SCORE_INIT_VALUE }), false),
  scoreMap: new Map<string, number>(),
  setScore: (key: string, value: number) => {
    return set((prev) => {
      return {
        scoreMap: new Map(prev.scoreMap).set(key, value),
      };
    });
  },
}));

// persist error on SSR
//   Error: Text content does not match server-rendered HTML.
// https://github.com/pmndrs/zustand/issues/1145#issuecomment-1202871214
export const useScorePersistStore = create<ScoreStoreInterface>()(
  persist(
    (set, get) => ({
      score: SCORE_INIT_VALUE,
      score2: 2,
      getScore: () => get().score,
      increaseScore: (increaseNumber: number) =>
        set(
          (state: ScoreStoreInterface) => {
            return {
              score: state.score + increaseNumber,
            };
          },
          false, // true: 기존 state를 대체, false: 기존 state에 병합
        ),
      resetScore: () => set(() => ({ score: SCORE_INIT_VALUE }), false),
      scoreMap: new Map<string, number>(),
      setScore: (key: string, value: number) => {
        return set((prev) => {
          return {
            scoreMap: new Map(prev.scoreMap).set(key, value),
          };
        });
      },
    }),
    {
      name: "scoreStorage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

const unsubscribe = useScoreStore.subscribe?.((state) => console.log(state));
if (!enabled && unsubscribe) {
  unsubscribe();
}

export default useScoreStore;
