import { TWindowRect } from '@/types/rect';
import { create } from 'zustand';

interface IWindowRectStore {
  windowRect: TWindowRect;
  actions: {
    setWindowRect: (rect: TWindowRect) => void;
  };
}

export const useWindowRectStore = create<IWindowRectStore>()((set) => ({
  windowRect: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  actions: {
    setWindowRect: (rect: TWindowRect) => set(() => ({ windowRect: rect })),
  },
}));

export const useWindowRectActions = () => useWindowRectStore((state) => state.actions);

export const useWindowRect = () => useWindowRectStore((state) => state.windowRect);
