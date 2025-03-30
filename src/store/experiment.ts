import { create } from 'zustand';

interface IExperimentStore {
  experimentId: string;
  chartData: Array<number>;
  actions: {
    setExperimentId: (experimentId: string) => void;
    appendChartData: (data: number) => void;
    clearChartData: () => void;
  };
}

export const useExperimentStore = create<IExperimentStore>()((set) => ({
  experimentId: '1',
  chartData: [],
  actions: {
    setExperimentId: (experimentId: string) => set(() => ({ experimentId })),
    appendChartData: (data: number) => set((state) => ({ chartData: [...state.chartData, data] })),
    clearChartData: () => set(() => ({ chartData: [] })),
  },
}));

export const useExperimentActions = () => useExperimentStore((state) => state.actions);

export const useExperiment = () => useExperimentStore((state) => state.experimentId);
