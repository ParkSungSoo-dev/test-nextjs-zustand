import { create } from "zustand";
import { devtools } from "zustand/middleware";

const enabled = process.env.NODE_ENV !== "production";

interface FunctionStoreInterface {
  func?: () => void;
  setFunction: (func: () => void) => void;
  clearFunction: () => void;
}

const useFunctionStore = create<FunctionStoreInterface>()(
  devtools(
    (set) => ({
      func: undefined,
      setFunction: (func: () => void) => set(() => ({ func }), false, "setFunction"),
      clearFunction: () => set(() => ({ func: undefined }), false, "clearFunction"),
    }),
    { enabled, name: "FunctionStore" },
  ),
);

useFunctionStore.subscribe((state) => console.log(state));
export default useFunctionStore;
