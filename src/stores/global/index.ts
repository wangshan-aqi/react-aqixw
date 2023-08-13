import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
type State = {
  darkMode: boolean;
  collapsed: boolean;
  lang: string;
  access_token: string;
  refresh_token: string;
};

type Actions = {
  setDarkMode: (darkMode: boolean) => void;
  setCollapsed: (collapsed: boolean) => void;
  setLang: (lang: string) => void;
  setToken: (token: string) => void;
  setRefreshToken: (refreshToken: string) => void;
};

export const useGlobalStore = create<State & Actions>()(
  devtools(
    persist(
      set => {
        return {
          darkMode: false,
          collapsed: false,
          lang: 'zh',
          access_token: '',
          refresh_token: '',
          setDarkMode: (darkMode: State['darkMode']) => set({ darkMode }),
          setCollapsed: (collapsed: State['collapsed']) => set({ collapsed }),
          setLang: (lang: State['lang']) => set({ lang }),
          setToken: (access_token: State['access_token']) =>
            set({ access_token }),
          setRefreshToken: (refresh_token: State['refresh_token']) =>
            set({ refresh_token }),
        };
      },
      {
        name: ' globalStore',
        storage: createJSONStorage(() => localStorage),
      },
    ),
    {
      name: ' globalStore',
    },
  ),
);
