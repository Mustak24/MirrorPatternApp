import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import RootStackNavigator from '../StackNavigators/Root';
import { RootStackParamList } from '../StackNavigators/Root/types';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export default function AppNavigationContainer() {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStackNavigator />
    </NavigationContainer>
  );
}
