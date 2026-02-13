import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import HomeScreen from '@/Screens/Home';

const Stack = createNativeStackNavigator<RootStackParamList>();

const screens: Array<Parameters<typeof Stack.Screen>[0]> = [
    { name: 'Home', component: HomeScreen },
];

export default function RootStackNavigator() {
  return (
    <Stack.Navigator
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
