import { devtools, persist } from 'zustand/middleware';
import { create } from 'zustand';
interface State {
  currentUser: any | null;
}

interface Actions {
  setCurrentUser: (currentUser: State['currentUser']) => void;
}

export const useUserStore = create<State & Actions>()(
  devtools(
    persist(
      set => ({
        currentUser: null,
        setCurrentUser: (currentUser: State['currentUser']) =>
          set({ currentUser }),
      }),
      {
        name: 'globalUserStore',
      },
    ),
  ),
);
