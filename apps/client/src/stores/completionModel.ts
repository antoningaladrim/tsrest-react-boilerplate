import { create } from 'zustand';

interface CompletionModelStore {
  model: string | undefined;
  setModel: (model: string) => void;
}

export const useCompletionModel = create<CompletionModelStore>((set) => ({
  model: undefined,
  setModel: (model) => set({ model }),
}));
