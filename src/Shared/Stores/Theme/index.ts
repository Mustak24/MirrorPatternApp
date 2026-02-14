import { createMMKV } from 'react-native-mmkv';
import { _colors, _theme } from './constance';
import { createStore } from '@funtools/store';
import { Theme } from './types';

const storage = createMMKV({id: 'theme-store'})

const theme = storage.getString('theme') as Theme || _theme;

const { useStore, useHandlers } = createStore({
  states: {
    theme,
    colors: _colors[theme],
  },

  syncHandlers: {
    toggleTheme(state) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      state.colors = _colors[state.theme];
      storage.set('theme', state.theme);
    },
  },
});

export { useStore as useThemeStore, useHandlers as useThemeHandlers };
