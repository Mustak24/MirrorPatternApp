import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import HomeScreen from '@/Screens/HomeScreen';
import MirrorPatternScreen from '@/Screens/MirrorPatternScreen';
import CameraScreen from '@/Screens/CameraScreen';
import SettingScreen from '@/Screens/SettingScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const screens: Array<Parameters<typeof Stack.Screen>[0]> = [
  { name: 'Home', component: HomeScreen },
  { name: 'MirrorPattern', component: MirrorPatternScreen },
  { name: 'Camera', component: CameraScreen },
  { name: 'Setting', component: SettingScreen },
];

export default function RootStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      {screens.map((screen, index) => (
        <Stack.Screen key={index} {...screen} />
      ))}
    </Stack.Navigator>
  );
}
