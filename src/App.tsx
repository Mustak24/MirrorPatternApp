import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppNavigationContainer } from './Navigation';
import ThemeView from './Shared/Stores/Theme/Components/ThemeView';

export default function App() {
  return (
    <GestureHandlerRootView className='flex-1' >
      <SafeAreaProvider>
        <ThemeView className='flex-1 w-full h-full' >
          <AppNavigationContainer/>
        </ThemeView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
