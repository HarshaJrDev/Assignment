import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Perfomance from './Perfomance';
import HomeScreen from './HomeScreen';

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator initialRouteName='HomeScreen'>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false}}  />
      <Stack.Screen name="Perfomance" component={Perfomance}  options={{headerShown:false}}  />
    </Stack.Navigator>
  );
}
